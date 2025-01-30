import SignupForm from "@/./components/SignupForm"
import Logo from "@/./components/Logo"

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4">
        <div className="w-full max-w-md">
            <Logo className="mx-auto mb-8" />
            <SignupForm />
        </div>
        </div>
    )
}