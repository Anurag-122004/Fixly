import { Card } from "@/app/components/ui/card"

export default function DashboardPage() {
    return (
        <div className="container mx-auto p-4">
        <Card className="p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
            <p className="text-gray-600">You have successfully logged in!</p>
        </Card>
        </div>
    )
}

