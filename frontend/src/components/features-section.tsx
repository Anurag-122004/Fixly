import { Card, CardContent, CardHeader, CardTitle } from "@/./app/components/ui/card"
import { ReportingIcon, NotificationIcon, RewardIcon, BiddingIcon } from "./icons"

const features = [
  {
    title: "Ease of Reporting",
    description: "Simple reporting process through app or website.",
    icon: ReportingIcon,
  },
  {
    title: "Real-time Notifications",
    description: "Stay updated on your reported issues and bids.",
    icon: NotificationIcon,
  },
  {
    title: "Reward System",
    description: "Earn rewards when your issues are solved or reported successfully.",
    icon: RewardIcon,
  },
  {
    title: "Seamless Bidding Process",
    description: "Local businesses and authorities can easily bid on issues.",
    icon: BiddingIcon,
  },
]

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features of Fixly</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

