"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { login, logout, register, isAuthenticated } from "@/utils/api"

interface User {
    id: string
    name: string
    email: string
    role: string
    }

    interface AuthContextType {
    user: User | null
    isLoggedIn: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    register: (userData: { name: string; email: string; password: string; role: string }) => Promise<void>
    }

    const AuthContext = createContext<AuthContextType | undefined>(undefined)

    export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const initAuth = async () => {
        try {
            const userData = await isAuthenticated()
            if (userData) {
            setUser(userData)
            setIsLoggedIn(true)
            }
        } catch (error) {
            console.error("Auth initialization error:", error)
        }
        }

        initAuth()
    }, [])

    const loginHandler = async (email: string, password: string) => {
        const userData = await login(email, password)
        setUser(userData)
        setIsLoggedIn(true)
    }

    const logoutHandler = async () => {
        await logout()
        setUser(null)
        setIsLoggedIn(false)
    }

    const registerHandler = async (userData: { name: string; email: string; password: string; role: string }) => {
        const { name, email, password} = userData
        await register(name, email, password)
    }

    return (
        <AuthContext.Provider
        value={{ user, isLoggedIn, login: loginHandler, logout: logoutHandler, register: registerHandler }}
        >
        {children}
        </AuthContext.Provider>
    )
    }

    export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

