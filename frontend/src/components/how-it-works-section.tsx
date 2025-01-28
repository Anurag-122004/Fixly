import { Card, CardContent, CardHeader, CardTitle } from "@/./app/components/ui/card"
import { ReportIcon, BidIcon, RewardIcon } from "./icons"

const steps = [
  {
    title: "Report an Issue",
    description: "Users report urban problems via the platform.",
    icon: ReportIcon,
  },
  {
    title: "Local Authorities & Companies Bid",
    description: "Local authorities or private companies bid to resolve the issues.",
    icon: BidIcon,
  },
  {
    title: "Earn Rewards",
    description: "Get rewarded for reporting and solving problems.",
    icon: RewardIcon,
  },
]

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">How Fixly Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-blue-500" />
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection

