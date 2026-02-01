"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Recycle, Search, Users, TrendingUp, MapPin, Leaf, FileText, User } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Recycle },
  { name: "Find Recyclers", href: "/recyclers", icon: MapPin },
  { name: "Alternatives", href: "/alternatives", icon: Leaf },
  { name: "Smart Search", href: "/search", icon: Search },
  { name: "Community", href: "/community", icon: Users },
  { name: "Track Impact", href: "/impact", icon: TrendingUp },
  { name: "Report Waste", href: "/report", icon: FileText },
  { name: "About", href: "/about", icon: User },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
              <Recycle className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              SwapThePlastic
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center space-x-2 ${
                      isActive
                        ? "bg-gradient-to-r from-green-600 to-blue-600 text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          isActive ? "bg-gradient-to-r from-green-600 to-blue-600 text-white" : "text-gray-600"
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {item.name}
                      </Button>
                    </Link>
                  )
                })}
                <div className="pt-4 border-t space-y-2">
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white">Sign Up</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
