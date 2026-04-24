"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { FileSearch, ListChecks, Globe2, Clock, Shield, MessageSquareText } from "lucide-react"

const features = [
  {
    icon: FileSearch,
    title: "Document Analysis",
    description: "Upload any document and get instant insights. Our AI understands forms, applications, and official letters.",
  },
  {
    icon: ListChecks,
    title: "Step-by-Step Guidance",
    description: "Get clear, numbered steps for any procedure. Know exactly what to do next and never miss a requirement.",
  },
  {
    icon: Globe2,
    title: "Multi-Country Support",
    description: "Whether you are abroad or at home, get localized guidance for procedures across different countries.",
  },
  {
    icon: Clock,
    title: "Time Estimates",
    description: "Know how long each step takes. Plan your time and avoid unnecessary trips or delays.",
  },
  {
    icon: Shield,
    title: "Document Checklist",
    description: "Interactive checklists ensure you have everything ready. Track your progress and tick off completed items.",
  },
  {
    icon: MessageSquareText,
    title: "Ask Anything",
    description: "Have a specific question? Just ask. Get instant, accurate answers about any bureaucratic process.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
}

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need to conquer paperwork
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make bureaucratic processes simple and stress-free.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
