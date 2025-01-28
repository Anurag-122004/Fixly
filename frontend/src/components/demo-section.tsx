import { Button } from "@/./app/components/ui/button"
import { Input } from "@/./app/components/ui/input"
import { Textarea } from "@/./app/components/ui/textarea"

const DemoSection = () => {
  return (
    <section id="demo" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Try Fixly for Yourself</h2>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Report an Issue</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="issue-type" className="block text-sm font-medium text-gray-700">
                Issue Type
              </label>
              <select
                id="issue-type"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>Pothole</option>
                <option>Broken Streetlight</option>
                <option>Graffiti</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <Input type="text" id="location" placeholder="Enter address or coordinates" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea id="description" placeholder="Describe the issue..." />
            </div>
            <Button type="submit" className="w-full">
              Submit Report
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default DemoSection

