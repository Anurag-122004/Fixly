import { useState, useEffect } from "react"

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token")
      setIsLoggedIn(!!token)
    }

    // Check initial login status
    checkLoginStatus()

    // Set up event listeners
    window.addEventListener("user-login", checkLoginStatus)
    window.addEventListener("user-logout", checkLoginStatus)

    // Clean up event listeners
    return () => {
      window.removeEventListener("user-login", checkLoginStatus)
      window.removeEventListener("user-logout", checkLoginStatus)
    }
  }, [])

  const login = () => {
    // This function will be called after successful login
    localStorage.setItem("token", "some-token-value")
    window.dispatchEvent(new Event("user-login"))
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("rememberUser")
    window.dispatchEvent(new Event("user-logout"))
  }

  return { isLoggedIn, login, logout }
}

