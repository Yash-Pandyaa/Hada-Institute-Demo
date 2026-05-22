import { useEffect, useRef } from 'react'
import { Award, BookOpen, GraduationCap, Users } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import CountUp from '../components/animations/CountUp.jsx'
import StaggerReveal from '../components/animations/StaggerReveal.jsx'
import { gsap } from '../lib/gsap.js'

const timeline = [
  ['2018', 'Started as a classroom notes initiative for board students in Indore.'],
  ['2021', 'Expanded into JEE and NEET revision material with faculty-reviewed PDFs.'],
  ['2024', 'Added UPSC foundation notes and exam strategy workshops.'],
  ['2026', 'Moved toward a digital notes marketplace model for faster access.'],
]

export default function AboutPage() {
  const timelineRef = useRef(null)

  useEffect(() => {
    document.title = 'About | Hada Institute'
    const tween = gsap.from('.timeline-card', {
      xPercent: 20,
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top 70%',
        end: 'bottom 45%',
        scrub: true,
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <SectionHeader title="About Hada Institute" subtitle="A digital-first study notes marketplace shaped by real classroom needs" />
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <h2 className="text-3xl">Our Story</h2>
          <p className="mt-4 leading-8 text-[var(--text-2)]">Hada Institute began with a simple observation: students do not need more scattered material, they need reliable notes that can be revised quickly. This frontend demo carries that same idea into a complete digital marketplace experience.</p>
        </Card>
        <Card>
          <h2 className="text-3xl">Mission and Vision</h2>
          <p className="mt-4 leading-8 text-[var(--text-2)]">Our mission is to make high-quality study notes affordable and searchable. Our vision is a library where every student can find the exact chapter support they need before an exam.</p>
        </Card>
      </div>
      <section ref={timelineRef} className="mt-16 grid gap-5 md:grid-cols-4">
        {timeline.map(([year, text]) => <Card key={year} className="timeline-card"><p className="text-3xl font-bold text-[var(--gold-light)]">{year}</p><p className="mt-3 text-sm leading-6 text-[var(--text-2)]">{text}</p></Card>)}
      </section>
      <section className="mt-16 grid gap-5 md:grid-cols-4">
        {[[Users, 10000, 'Students'], [BookOpen, 500, 'Notes'], [GraduationCap, 50, 'Subjects'], [Award, 4.8, 'Average Rating']].map(([Icon, end, label]) => (
          <Card key={label} className="text-center">
            <Icon className="mx-auto text-[var(--gold-light)]" />
            <p className="mt-3 text-4xl font-bold"><CountUp end={end} decimals={label === 'Average Rating' ? 1 : 0} /></p>
            <p className="text-[var(--text-2)]">{label}</p>
          </Card>
        ))}
      </section>
      <section className="mt-16">
        <SectionHeader title="Faculty Mentors" subtitle="Seed team for the demo institute" />
        <StaggerReveal className="grid gap-5 md:grid-cols-4">
          {['Raghav Hada - Physics', 'Dr. Meera Joshi - Biology', 'Aditi Sharma - History', 'Kunal Mehta - Mathematics'].map((member) => (
            <Card key={member} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gold)] font-bold text-[#12100a]">{member.slice(0, 1)}</div>
              <h3 className="mt-4 text-xl">{member}</h3>
            </Card>
          ))}
        </StaggerReveal>
      </section>
    </div>
  )
}
