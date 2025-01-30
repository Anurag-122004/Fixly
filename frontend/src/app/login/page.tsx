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
                <svg
                    width="70"
                    height="32"
                    viewBox="0 0 70 32"
                    className="mx-auto mb-4"
                    fill="#414141"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill="currentColor" fillRule="evenodd">
                    <path d="M.954 19.712v5.972h4.402v-5.971a3.314 3.314 0 0 1-4.402 0M21.272 14.883V9.381H14.92v3.424h1.856v2.078a3.395 3.395 0 0 1 4.496 0M18.935 4.617c1.29 0 2.337-1.034 2.337-2.309C21.272 1.034 20.226 0 18.935 0c-1.29 0-2.337 1.034-2.337 2.308 0 1.275 1.046 2.309 2.337 2.309M48.29 14.487V1.06h-6.18v3.251h1.685v10.175a3.394 3.394 0 0 1 4.496 0M57.246 26.014c-.358.746-.781 1.263-1.271 1.545-.533.307-1.188.46-1.965.46h-1.966V32h2.898c1.532 0 2.825-.395 3.88-1.184.922-.69 1.728-1.728 2.42-3.105-.316.096-.648.15-.99.15a3.35 3.35 0 0 1-3.006-1.847M69.396 9.401h-4.729l-3.666 8.212 2.3 5.511zM34.796 16.39l.218-.304 4.826-6.674h-5.025l-2.23 3.255-.158.216 2.002 2.803c.156.219.276.456.367.704M29.211 19.414l-.583-.9-.15-.21-5.379 7.38h5.026l3.536-4.927a3.168 3.168 0 0 1-2.45-1.343M33.572 20.196a3.142 3.142 0 0 1-1.793.569c-.03 0-.059-.005-.088-.006l3.523 4.925h5.026l-5.333-7.493a3.279 3.279 0 0 1-1.335 2.005M3.163 18.13a.85.85 0 0 1-.856-.845.85.85 0 0 1 .856-.845.85.85 0 0 1 .855.845.85.85 0 0 1-.855.845M.953 6.794v10.408c0 1.226.988 2.22 2.205 2.22a2.21 2.21 0 0 0 2.198-2.094c.003-.042.007-.084.007-.126v-4.397h5.108V9.4H5.363V7.227h-.007v-.433c0-1.35 1.109-2.445 2.476-2.445h5.175v-4.35H7.832C4.033 0 .954 3.043.954 6.795M19.024 18.142a.85.85 0 0 1-.855-.845.85.85 0 0 1 .855-.845.85.85 0 0 1 .856.845.85.85 0 0 1-.856.845m0-2.982c-1.241 0-2.247.994-2.247 2.22v8.304h4.495V17.38c0-1.226-1.006-2.22-2.248-2.22M46.043 16.078a.85.85 0 0 1 .855.845.85.85 0 0 1-.855.845.85.85 0 0 1-.856-.845.85.85 0 0 1 .856-.845zm2.247 2.206v-1.3c0-1.226-1.006-2.22-2.247-2.22-1.242 0-2.248.994-2.248 2.22V25.684h4.495v-7.4zM60.309 25.405a.85.85 0 0 1-.856-.845.85.85 0 0 1 .856-.845.85.85 0 0 1 .855.845.85.85 0 0 1-.855.845zm.055-6.363l-3.999-9.583v-.058h-5.851v3.404h2.474l4.89 11.806.315.76c.72 1.74 3.149 1.823 4.017.21.027-.05.053-.102.077-.156.019-.043.034-.087.05-.13a2.17 2.17 0 0 0-.03-1.596l-1.943-4.657zM31.665 18.375a.844.844 0 0 1-.849-.838c0-.463.38-.839.849-.839s.849.376.849.839c0 .463-.38.838-.849.838zm-2.096-.498l.576.89c.163.23.36.416.577.557a1.923 1.923 0 0 0 1.836.15c.123-.053.243-.12.36-.2.928-.642 1.23-2.021.58-2.939l-4.966-6.954h-5.056l6.093 8.496z" />
                    </g>
                </svg>
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



