import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/./app/components/ui/accordion"

const faqs = [
  {
    question: "How do I report an issue?",
    answer:
      "To report an issue, simply open the Fixly app or website, click on 'Report an Issue', fill in the details about the problem you've noticed, and submit. It's that easy!",
  },
  {
    question: "How are rewards distributed?",
    answer:
      "Rewards are distributed based on the successful resolution of reported issues. When an issue you've reported is solved, you'll receive points or credits that can be redeemed for various rewards within the Fixly ecosystem.",
  },
  {
    question: "What kinds of urban problems can be reported?",
    answer:
      "Fixly allows you to report a wide range of urban issues, including but not limited to potholes, broken streetlights, graffiti, illegal dumping, damaged sidewalks, and malfunctioning traffic signals.",
  },
]

const FaqSection = () => {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FaqSection

