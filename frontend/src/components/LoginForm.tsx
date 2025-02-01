"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Label } from "@/app/components/ui/label"
import { useAuth } from "@/hooks/useAuth"
import { SocialLoginButton } from "./SocialLoginButton"
import Link from "next/link"

interface LoginFormData {
    email: string
    password: string
    remember: boolean
    }

    export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const { login } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>()

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true)
        setError(null)

        try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            email: data.email,
            password: data.password,
            }),
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.message || "Login failed")
        }

        console.log("Login successful", result)
        if (data.remember) {
            localStorage.setItem("rememberUser", "true")
        }

        // Use the login function from useAuth hook
        login()

        router.push("/dashboard")
        } catch (err) {
        console.error("Login error:", err)
        setError(err instanceof Error ? err.message : "An unexpected error occurred")
        } finally {
        setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
            </div>
        )}

        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
            })}
            className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
            <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                })}
                className="pr-10 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between">
            <div className="flex items-center">
            <Checkbox id="remember" {...register("remember")} />
            <Label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Remember me
            </Label>
            </div>
            <Link href="/reset-password" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
            Forgot password?
            </Link>
        </div>

        <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105"
            disabled={isLoading}
        >
            {isLoading ? "Signing In..." : "Sign In"}
        </Button>

        <div className="relative">
            <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
                        <SocialLoginButton provider="google" />
                        <SocialLoginButton provider="apple" />
                        <SocialLoginButton provider="facebook" />
                    </div>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
            By signing in, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                Privacy Policy
            </a>
            .
            </p>
            <p className="mt-2">Your data is secure with us.</p>
        </div>
        </form>
    )
}