"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle2, MapPin, Phone, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

type WasteReport = {
  id: string
  createdAt: string
  location: string
  wasteType: string
  severity: "low" | "medium" | "high" | "critical"
  description: string
  contactName: string
  phone: string
  photos: string[] // store data URLs or uploaded URLs in future
}

const WASTE_TYPES = ["PET (1)", "HDPE (2)", "PVC (3)", "LDPE (4)", "PP (5)", "PS (6)", "Other (7)"]

const severityLabels: Record<WasteReport["severity"], string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
}

function validatePhone(value: string) {
  // E.164-like (basic) + common local formats
  const e164 = /^\+?[1-9]\d{7,14}$/
  const local = /^[0-9 ()-]{7,20}$/
  return e164.test(value) || local.test(value)
}

export default function ReportPlasticWastePage() {
  const [location, setLocation] = useState("")
  const [wasteType, setWasteType] = useState<string>("")
  const [severity, setSeverity] = useState<WasteReport["severity"]>("medium")
  const [description, setDescription] = useState("")
  const [contactName, setContactName] = useState("")
  const [phone, setPhone] = useState("")
  const [photos, setPhotos] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Form validity
  const isValid = useMemo(() => {
    const locOk = location.trim().length >= 5
    const typeOk = !!wasteType
    const descOk = description.trim().length >= 10 && description.trim().length <= 500
    const nameOk = contactName.trim().length >= 2
    const phoneOk = validatePhone(phone.trim())
    return locOk && typeOk && descOk && nameOk && phoneOk
  }, [location, wasteType, description, contactName, phone])

  // Load drafts from localStorage
  useEffect(() => {
    try {
      const draft = localStorage.getItem("report_draft")
      if (draft) {
        const d = JSON.parse(draft)
        setLocation(d.location ?? "")
        setWasteType(d.wasteType ?? "")
        setSeverity(d.severity ?? "medium")
        setDescription(d.description ?? "")
        setContactName(d.contactName ?? "")
        setPhone(d.phone ?? "")
      }
    } catch {
      // ignore
    }
  }, [])

  // Auto-save drafts
  useEffect(() => {
    const data = { location, wasteType, severity, description, contactName, phone }
    localStorage.setItem("report_draft", JSON.stringify(data))
  }, [location, wasteType, severity, description, contactName, phone])

  function handleFiles(files: FileList | null) {
    if (!files) return
    const readers = Array.from(files)
      .slice(0, 5)
      .map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onload = () => resolve((reader.result as string) || "")
            reader.readAsDataURL(file)
          }),
      )
    Promise.all(readers).then((arr) => setPhotos((p) => [...p, ...arr]))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    if (!isValid) {
      setErrorMsg("Please correct the highlighted fields before submitting.")
      return
    }

    setSubmitting(true)
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1200))

      const report: WasteReport = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        location: location.trim(),
        wasteType,
        severity,
        description: description.trim(),
        contactName: contactName.trim(),
        phone: phone.trim(),
        photos,
      }

      const key = "waste_reports"
      const arr: WasteReport[] = JSON.parse(localStorage.getItem(key) || "[]")
      arr.unshift(report)
      localStorage.setItem(key, JSON.stringify(arr))
      localStorage.removeItem("report_draft")

      setSuccessMsg("Report submitted successfully. Thank you for helping keep our community clean!")
      // Reset form
      setLocation("")
      setWasteType("")
      setSeverity("medium")
      setDescription("")
      setContactName("")
      setPhone("")
      setPhotos([])
    } catch {
      setErrorMsg("Something went wrong while submitting your report. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Report Plastic Waste</CardTitle>
          <CardDescription>
            Help us locate and remove plastic waste. Provide details below and we’ll route it to local volunteers and
            recyclers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {successMsg && (
            <Alert className="mb-4 border-green-200 text-green-800">
              <CheckCircle2 className="h-5 w-5" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{successMsg}</AlertDescription>
            </Alert>
          )}
          {errorMsg && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Fix issues to continue</AlertTitle>
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., Near City Park, 2nd Street, Hyderabad"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  aria-invalid={location.trim().length > 0 && location.trim().length < 5}
                  className={cn(location ? (location.trim().length >= 5 ? "border-green-300" : "border-red-300") : "")}
                />
                <p className="mt-1 text-sm text-muted-foreground">{"Minimum 5 characters"}</p>
              </div>

              <div>
                <Label>Waste Type</Label>
                <Select value={wasteType} onValueChange={setWasteType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a plastic type" />
                  </SelectTrigger>
                  <SelectContent>
                    {WASTE_TYPES.map((w) => (
                      <SelectItem key={w} value={w}>
                        {w}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Severity</Label>
                <Select value={severity} onValueChange={(v) => setSeverity(v as WasteReport["severity"])}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{severityLabels.low}</SelectItem>
                    <SelectItem value="medium">{severityLabels.medium}</SelectItem>
                    <SelectItem value="high">{severityLabels.high}</SelectItem>
                    <SelectItem value="critical">{severityLabels.critical}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the waste (quantity, items seen, any landmarks, access notes, etc.)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                aria-invalid={
                  description.trim().length > 0 && (description.trim().length < 10 || description.trim().length > 500)
                }
                className={cn(
                  description
                    ? description.trim().length >= 10 && description.trim().length <= 500
                      ? "border-green-300"
                      : "border-red-300"
                    : "",
                )}
              />
              <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
                <span>{"10–500 characters"}</span>
                <span>{description.length}/500</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  placeholder="Your name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  aria-invalid={contactName.trim().length > 0 && contactName.trim().length < 2}
                  className={cn(
                    contactName ? (contactName.trim().length >= 2 ? "border-green-300" : "border-red-300") : "",
                  )}
                />
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  aria-invalid={phone.trim().length > 0 && !validatePhone(phone)}
                  className={cn(phone ? (validatePhone(phone) ? "border-green-300" : "border-red-300") : "")}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="photos" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Photos (optional)
              </Label>
              <Input id="photos" type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} />
              {photos.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {photos.map((src, i) => (
                    <img
                      key={i}
                      src={src || "/placeholder.svg"}
                      alt={`Selected photo ${i + 1}`}
                      className="h-24 w-full rounded object-cover ring-1 ring-border"
                    />
                  ))}
                </div>
              )}
              <p className="mt-1 text-sm text-muted-foreground">{"Up to 5 images. Upload is local-only for now."}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Your report is auto-saved locally as a draft.</div>
              <Button type="submit" disabled={!isValid || submitting}>
                {submitting ? "Submitting…" : "Submit Report"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
