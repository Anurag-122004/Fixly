import { Button } from "@/./app/components/ui/button"

const CtaSection = () => {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-xl mb-8">Join Fixly today and start improving your community!</p>
        <Button size="lg" variant="secondary">
          Join Fixly Now
        </Button>
      </div>
    </section>
  )
}

export default CtaSection

