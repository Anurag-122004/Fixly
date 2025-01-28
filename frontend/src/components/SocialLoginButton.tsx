import { Button } from "@/app/components/ui/button"
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa"

interface SocialLoginButtonProps {
provider: "google" | "apple" | "facebook"
}

export function SocialLoginButton({ provider }: SocialLoginButtonProps) {
const icons = {
google: FaGoogle,
apple: FaApple,
facebook: FaFacebookF,
}

const Icon = icons[provider]

return (
<Button variant="outline" className="w-full">
    <Icon className="mr-2 h-4 w-4" />
    {provider.charAt(0).toUpperCase() + provider.slice(1)}
</Button>
)
}

