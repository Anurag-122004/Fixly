import LoginForm from "@/components/LoginForm"
import { ModeToggle } from "@/components/ModeToggle"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="absolute top-4 right-4">
            <ModeToggle />
        </div>
        <div className="w-full max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105">
            <div className="p-8">
                <div className="text-center mb-8">
                <img src="/fixly-logo.svg" alt="Fixly Logo" className="mx-auto h-12 w-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign In to Your Account</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Access your dashboard and manage your preferences
                </p>
                </div>
                <LoginForm />
            </div>
            </div>
        </div>
        </div>
    )
}

