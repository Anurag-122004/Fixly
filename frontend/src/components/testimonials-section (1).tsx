"use client"

import Image from "next/image"
import Marquee from "react-fast-marquee"
import { Card, CardContent, CardHeader } from "@/./app/components/ui/card"

const testimonials = [
  {
    name: "John Doe",
    role: "Local Resident",
    content:
      "Fixly made it so easy to report a broken streetlight in my neighborhood. I earned rewards for helping solve the problem!",
    image: "/john-doe.jpg",
  },
  {
    name: "Jane Smith",
    role: "City Official",
    content: "Fixly has revolutionized how we handle urban issues. It's made our job easier and our city better.",
    image: "/jane-smith.jpg",
  },
  {
    name: "Mike Johnson",
    role: "Business Owner",
    content: "As a local business owner, I love how Fixly allows me to bid on projects and contribute to my community.",
    image: "/mike-johnson.jpg",
  },
  {
    name: "Sarah Lee",
    role: "Community Organizer",
    content: "Fixly has brought our community together. We're solving problems faster than ever before!",
    image: "/sarah-lee.jpg",
  },
  {
    name: "Tom Wilson",
    role: "Local Contractor",
    content: "Thanks to Fixly, I've been able to grow my business while helping improve our city.",
    image: "/tom-wilson.jpg",
  },
]

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <Card className="w-[300px] mx-4 my-6 flex-shrink-0">
    <CardHeader>
      <div className="flex items-center">
        <Image
          src={testimonial.image || "/placeholder.svg"}
          alt={testimonial.name}
          width={50}
          height={50}
          className="rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold">{testimonial.name}</h3>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <p className="italic">{testimonial.content}</p>
    </CardContent>
  </Card>
)

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">What Users Are Saying</h2>
        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={true}
          pauseOnClick={true}
          delay={0}
          play={true}
          direction="left"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}

export default TestimonialsSection

