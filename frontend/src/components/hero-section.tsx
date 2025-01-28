"use client"
import { Button } from "@/./app/components/ui/button"
import { useRouter } from "next/navigation"

const HeroSection = () => {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push('/signup');
  };
  return (
    <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Fixly: Solve Urban Problems, Earn Rewards</h1>
          <p className="text-xl mb-8">
            Empowering communities to identify, report, and solve urban issues like potholes, streetlight repairs, and
            more.
          </p>
          <Button onClick={handleGetStartedClick} size="lg" className="bg-white text-blue-500 hover:bg-blue-100">
            Start Reporting Issues
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection;

