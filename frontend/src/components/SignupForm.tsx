"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Label } from "@/app/components/ui/label"
import { Checkbox } from "@/app/components/ui/checkbox"
import { PasswordInput } from "@/components/PasswordInput"
import { SocialLoginButton } from "@/components/SocialLoginButton"
import { motion } from "framer-motion"

interface FormData {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    role: string
    }

    export default function SignupForm() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Citizen",
    })
    const [passwordStrength, setPasswordStrength] = useState("weak")
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        if (name === "password") {
        handlePasswordStrength(value)
        }
    }

    const handlePasswordStrength = (password: string) => {
        if (password.length > 12 && /[A-Z]/.test(password) && /[!@#$%^&*]/.test(password)) {
        setPasswordStrength("strong")
        } else if (password.length > 8) {
        setPasswordStrength("medium")
        } else {
        setPasswordStrength("weak")
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        setIsLoading(false)
        return
        }

        try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password,
            role: formData.role,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong")
        }

        // Handle successful registration
        console.log("Registration successful", data)
        // You might want to store the token in localStorage or a secure cookie here
        localStorage.setItem("token", data.token)
        router.push("/login") // Redirect to dashboard or home page
        } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred")
        } finally {
        setIsLoading(false)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="p-6 shadow-lg dark:bg-gray-800">
            <h1 className="text-2xl font-bold text-center mb-2">Create Your Account</h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Get access to exclusive features and personalized recommendations
            </p>
            {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
            </div>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                    placeholder="John"
                    required
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    required
                />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" name="password" value={formData.password} onChange={handleInputChange} />
                <div className="text-sm text-gray-600 dark:text-gray-400">
                Password strength:{" "}
                <span
                    className={`font-semibold ${passwordStrength === "strong" ? "text-green-500" : passwordStrength === "medium" ? "text-yellow-500" : "text-red-500"}`}
                >
                    {passwordStrength}
                </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                At least 8 characters, one uppercase letter, and one symbol
                </p>
            </div>
            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                title="Role"
                required
                >
                <option value="Citizen">Citizen</option>
                <option value="Solver">Solver</option>
                </select>
            </div>
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                    </a>
                </label>
                </div>
            </div>
            <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                disabled={isLoading}
            >
                {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
            </form>
            <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
                <SocialLoginButton provider="google" />
                <SocialLoginButton provider="apple" />
                <SocialLoginButton provider="facebook" />
            </div>
            </div>
            <div className="mt-6 text-center text-sm">
            <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                Sign in
                </a>
            </p>
            </div>
            <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
            We value your privacy and data security
            </div>
        </Card>
        </motion.div>
    )
}
