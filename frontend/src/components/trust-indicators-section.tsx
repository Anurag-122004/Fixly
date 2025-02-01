"use client"
import { Building2, BuildingIcon as Buildings, Factory, Landmark } from "lucide-react"

const partners = [
  {
    name: "Smart City Solutions",
    icon: Building2,
    color: "text-blue-600",
  },
  {
    name: "Urban Infrastructure",
    icon: Buildings,
    color: "text-green-600",
  },
  {
    name: "GreenTech Innovations",
    icon: Factory,
    color: "text-teal-600",
  },
  {
    name: "City Development Partners",
    icon: Landmark,
    color: "text-indigo-600",
  },
]

const TrustIndicatorsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
          Trusted by Local Authorities & Organizations
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Working together with leading institutions to transform urban spaces and improve community life
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="w-full h-24 relative flex flex-col items-center justify-center group p-4 rounded-lg hover:bg-gray-50 transition-all duration-300"
            >
              <partner.icon
                className={`w-12 h-12 ${partner.color} mb-2 group-hover:scale-110 transition-transform duration-300`}
              />
              <span className="text-sm text-gray-600 text-center font-medium">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustIndicatorsSection

