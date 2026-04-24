"use client"

import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, CheckCircle2, Clock, TrendingUp } from "lucide-react"

interface Stat {
  label: string
  value: number
  icon: React.ElementType
  description: string
  color: string
}

const stats: Stat[] = [
  {
    label: "Documents Analyzed",
    value: 12,
    icon: FileText,
    description: "Total analyses",
    color: "text-primary",
  },
  {
    label: "Procedures Tracked",
    value: 3,
    icon: Clock,
    description: "In progress",
    color: "text-amber-500",
  },
  {
    label: "Completed",
    value: 5,
    icon: CheckCircle2,
    description: "All time",
    color: "text-accent",
  },
  {
    label: "Time Saved",
    value: 8,
    icon: TrendingUp,
    description: "Hours estimated",
    color: "text-green-500",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] },
  },
}

export function StatsOverview() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={itemVariants}>
          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-3xl font-bold mt-1"
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className={`h-10 w-10 rounded-lg bg-secondary flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
            {/* Decorative gradient */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20 ${stat.color}`} />
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
