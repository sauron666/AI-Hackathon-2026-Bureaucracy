"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare, FileText, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface Activity {
  id: string
  type: "question" | "document" | "completed"
  title: string
  timestamp: string
  preview?: string
}

const activities: Activity[] = [
  {
    id: "1",
    type: "question",
    title: "Asked about residence permit renewal",
    timestamp: "2 hours ago",
    preview: "How do I renew my residence permit before it expires?",
  },
  {
    id: "2",
    type: "document",
    title: "Uploaded passport scan",
    timestamp: "Yesterday",
  },
  {
    id: "3",
    type: "completed",
    title: "Completed address registration",
    timestamp: "3 days ago",
  },
  {
    id: "4",
    type: "question",
    title: "Asked about work permit requirements",
    timestamp: "1 week ago",
    preview: "What documents do I need to apply for a work permit?",
  },
]

const activityConfig = {
  question: {
    icon: MessageSquare,
    color: "bg-primary/10 text-primary",
  },
  document: {
    icon: FileText,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
  completed: {
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  },
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Button variant="ghost" size="sm" asChild className="gap-1">
          <Link href="/history">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-6">
            {activities.map((activity, index) => {
              const config = activityConfig[activity.type]
              const Icon = config.icon
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex gap-4 pl-12"
                >
                  {/* Activity icon */}
                  <div className={`absolute left-0 flex h-10 w-10 items-center justify-center rounded-full ${config.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{activity.title}</p>
                    {activity.preview && (
                      <p className="text-sm text-muted-foreground mt-0.5 truncate">
                        {activity.preview}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
