import Link from "next/link"
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon as LinkedInIcon } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Fixly</h3>
            <p className="text-sm text-gray-400">Empowering communities to solve urban problems and earn rewards.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-gray-400 hover:text-white">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white" title="Facebook">
                <FacebookIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" title="Twitter">
                <TwitterIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" title="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" title="LinkedIn">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Fixly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

