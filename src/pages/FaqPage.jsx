import { useEffect } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import StaggerReveal from '../components/animations/StaggerReveal.jsx'
import { useFaqsStore } from '../stores/useFaqsStore.js'

export default function FaqPage() {
  const faqs = useFaqsStore((state) => state.items)
  useEffect(() => {
    document.title = 'FAQ | Hada Institute'
  }, [])

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <SectionHeader title="Frequently Asked Questions" subtitle="Everything about digital notes, payments, downloads, and the demo flow" />
      <StaggerReveal>
        <Accordion.Root type="single" collapsible className="grid gap-3">
          {faqs.map((faq) => (
            <Accordion.Item key={faq.id} value={faq.id} className="rounded-lg border border-[var(--border)] bg-[var(--surface)]">
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full justify-between px-5 py-4 text-left font-semibold">{faq.question}<span>+</span></Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-5 pb-5 leading-7 text-[var(--text-2)]">{faq.answer}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </StaggerReveal>
    </div>
  )
}
