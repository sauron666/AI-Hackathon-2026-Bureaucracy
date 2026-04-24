"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowRight, 
  Clock, 
  MapPin, 
  Home, 
  Briefcase, 
  Receipt,
  GraduationCap,
  Car,
  HeartPulse,
  type LucideIcon
} from "lucide-react"
import Link from "next/link"

type ProcessType = "residency" | "business" | "tax" | "education" | "driving" | "healthcare"

interface Process {
  id: string
  name: string
  type: ProcessType
  status: "in-progress" | "waiting" | "completed"
  progress: number
  nextStep: string
  dueDate?: string
  location?: string
}

const processTypeConfig: Record<ProcessType, { icon: LucideIcon; color: string; bg: string }> = {
  residency: { icon: Home, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
  business: { icon: Briefcase, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
  tax: { icon: Receipt, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  education: { icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
  driving: { icon: Car, color: "text-rose-600", bg: "bg-rose-100 dark:bg-rose-900/30" },
  healthcare: { icon: HeartPulse, color: "text-cyan-600", bg: "bg-cyan-100 dark:bg-cyan-900/30" },
}

const processes: Process[] = [
  {
    id: "1",
    name: "Residence Permit Application",
    type: "residency",
    status: "in-progress",
    progress: 65,
    nextStep: "Submit biometric data",
    dueDate: "Dec 15, 2024",
    location: "Migration Office",
  },
  {
    id: "2",
    name: "Business Registration",
    type: "business",
    status: "waiting",
    progress: 40,
    nextStep: "Waiting for document approval",
    dueDate: "Dec 20, 2024",
  },
  {
    id: "3",
    name: "Tax ID Application",
    type: "tax",
    status: "in-progress",
    progress: 85,
    nextStep: "Collect final document",
    location: "Tax Office",
  },
]

const statusConfig = {
  "in-progress": { label: "In Progress", className: "bg-primary/10 text-primary border-primary/20" },
  "waiting": { label: "Waiting", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800" },
  "completed": { label: "Completed", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800" },
}

export function OngoingProcesses() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Ongoing Processes</CardTitle>
        <Button variant="ghost" size="sm" asChild className="gap-1">
          <Link href="/history">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {processes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No ongoing processes</p>
            <Button asChild className="mt-4">
              <Link href="/ask">Start a new inquiry</Link>
            </Button>
          </div>
        ) : (
          processes.map((process, index) => {
            const typeConfig = processTypeConfig[process.type]
            const TypeIcon = typeConfig.icon
            
            return (
            <motion.div
              key={process.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              className="p-4 rounded-lg border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex gap-3 flex-1">
                  {/* Process Type Icon */}
                  <div className={`shrink-0 h-10 w-10 rounded-lg ${typeConfig.bg} flex items-center justify-center`}>
                    <TypeIcon className={`h-5 w-5 ${typeConfig.color}`} />
                  </div>
                  
                  <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-medium">{process.name}</h4>
                    <Badge 
                      variant="outline" 
                      className={statusConfig[process.status].className}
                    >
                      {statusConfig[process.status].label}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {process.dueDate && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {process.dueDate}
                      </span>
                    )}
                    {process.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {process.location}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm">
                    <span className="text-muted-foreground">Next: </span>
                    <span className="font-medium">{process.nextStep}</span>
                  </p>
                </div>
                
                <div className="sm:w-32 space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{process.progress}%</span>
                  </div>
                  <Progress value={process.progress} className="h-2" />
                </div>
                </div>
              </div>
            </motion.div>
          )})
        )}
      </CardContent>
    </Card>
  )
}
