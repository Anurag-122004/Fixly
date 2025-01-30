"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import type React from "react" // Added import for React

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoggedIn) {
        router.push("/login")
        }
    }, [isLoggedIn, router])

    if (!isLoggedIn) {
        return null
    }

    return <>{children}</>
}

