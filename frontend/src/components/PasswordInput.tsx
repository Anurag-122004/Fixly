"use client"

import { useState } from "react"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
const [showPassword, setShowPassword] = useState(false)

return (
<div className="relative">
    <Input type={showPassword ? "text" : "password"} {...props} className="pr-10" />
    <Button
    type="button"
    variant="ghost"
    size="sm"
    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
    onClick={() => setShowPassword(!showPassword)}
    >
    {showPassword ? (
        <EyeOffIcon className="h-4 w-4 text-gray-500" />
    ) : (
        <EyeIcon className="h-4 w-4 text-gray-500" />
    )}
    </Button>
</div>
)
}

