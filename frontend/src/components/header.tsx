"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { ModeToggle } from "./ModeToggle"
import { useAuth } from "@/hooks/useAuth"
import { ChevronDown } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { isLoggedIn, logout } = useAuth()
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/") // Redirect to landing page
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Fixly
            </Link>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="#how-it-works"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <Button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2">
                  <span>Account</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </Button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/email-verification"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Email Verification
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button onClick={() => router.push("/login")}>Log In</Button>
            )}
          </div>
          <div className="md:hidden">
            <button
              title="Toggle menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#how-it-works"
              className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              How It Works
            </Link>
            <Link
              href="#features"
              className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              FAQ
            </Link>
            <Link
              href="#contact"
              className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Contact
            </Link>
            <div className="mt-4 space-y-2">
              <ModeToggle />
              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="block w-full">
                    <Button variant="outline" className="w-full justify-start">
                      Profile
                    </Button>
                  </Link>
                  <Link href="/email-verification" className="block w-full">
                    <Button variant="outline" className="w-full justify-start">
                      Email Verification
                    </Button>
                  </Link>
                  <Button onClick={handleLogout} className="w-full">
                    Logout
                  </Button>
                </>
              ) : (
                <Button onClick={() => router.push("/login")} className="w-full">
                  Log In
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header;

