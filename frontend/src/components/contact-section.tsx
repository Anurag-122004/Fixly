import { Button } from "@/./app/components/ui/button"
import { Input } from "@/./app/components/ui/input"
import { Textarea } from "@/./app/components/ui/textarea"

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
        <div className="max-w-md mx-auto">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input type="text" id="name" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input type="email" id="email" placeholder="Your email" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <Textarea id="message" placeholder="Your message" />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-600">Or reach us at:</p>
            <p className="font-semibold">support@fixly.com</p>
            <p className="font-semibold">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

