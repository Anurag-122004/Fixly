import Image from "next/image"

const partners = [
  { name: "City of Metropolis", logo: "/metropolis-logo.svg" },
  { name: "UrbanFix Co.", logo: "/urbanfix-logo.svg" },
  { name: "SmartCity Solutions", logo: "/smartcity-logo.svg" },
  { name: "GreenTech Innovations", logo: "/greentech-logo.svg" },
]

const TrustIndicatorsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Trusted by Local Authorities & Organizations</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((partner) => (
            <div key={partner.name} className="w-40 h-20 relative">
              <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} layout="fill" objectFit="contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustIndicatorsSection

