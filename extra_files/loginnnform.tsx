"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data: any) => {
        console.log(data)
        // Handle login logic here
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
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
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message as string}</p>}
        </div>

        <div className="flex items-center justify-between">
            <div className="flex items-center">
            <Checkbox id="remember" {...register("remember")} />
            <Label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Remember me
            </Label>
            </div>
            <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
            >
            Forgot password?
            </a>
        </div>

        <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105"
        >
            Sign In
        </Button>

        <div className="relative">
            <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
            {["Google", "Apple", "Facebook"].map((provider) => (
            <Button key={provider} variant="outline" className="w-full">
                <img src={`/${provider.toLowerCase()}-logo.svg`} alt={`${provider} logo`} className="h-5 w-5 mr-2" />
                {provider}
            </Button>
            ))}
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

