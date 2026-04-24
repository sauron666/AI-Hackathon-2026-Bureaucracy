"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useAuth } from "@/lib/auth/context"
import { StatsOverview } from "@/components/dashboard/stats-overview"
import { OngoingProcesses } from "@/components/dashboard/ongoing-processes"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles, X } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()
  const [showWelcomeCard, setShowWelcomeCard] = useState(false)
  const [isFirstVisit, setIsFirstVisit] = useState(true)

  useEffect(() => {
    const hasVisited = localStorage.getItem("papira-dashboard-visited")
    if (!hasVisited) {
      setShowWelcomeCard(true)
      setIsFirstVisit(true)
    } else {
      setIsFirstVisit(false)
    }
  }, [])

  const dismissWelcomeCard = () => {
    setShowWelcomeCard(false)
    localStorage.setItem("papira-dashboard-visited", "true")
  }

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {greeting()}, {user?.name?.split(" ")[0]}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s an overview of your bureaucratic journey.
          </p>
        </div>
        <Button asChild className="gap-2 w-fit group">
          <Link href="/ask">
            <Sparkles className="h-4 w-4" />
            New Question
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>

      {/* Stats Overview */}
      <StatsOverview />

      {/* First Visit Welcome Card */}
      <AnimatePresence>
        {showWelcomeCard && isFirstVisit && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-transparent border-primary/20">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 h-8 w-8 rounded-full"
                onClick={dismissWelcomeCard}
              >
                <X className="h-4 w-4" />
              </Button>
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 pr-12">
                <div className="space-y-1">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    Need help with a new procedure?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Ask our AI assistant about any bureaucratic process and get step-by-step guidance.
                  </p>
                </div>
                <Button asChild className="gap-2 shrink-0 group">
                  <Link href="/ask">
                    Ask Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <OngoingProcesses />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <RecentActivity />
        </motion.div>
      </div>
    </div>
  )
}
