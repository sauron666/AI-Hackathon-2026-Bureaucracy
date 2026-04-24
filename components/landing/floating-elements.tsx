"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { FileText, Stamp, CheckSquare, Pen, ClipboardList } from "lucide-react"

const floatingItems = [
  { Icon: FileText, delay: 0, x: "10%", y: "20%", rotate: -15, size: 32 },
  { Icon: Stamp, delay: 0.5, x: "85%", y: "25%", rotate: 12, size: 28 },
  { Icon: CheckSquare, delay: 1, x: "15%", y: "70%", rotate: 8, size: 24 },
  { Icon: Pen, delay: 1.5, x: "80%", y: "65%", rotate: -20, size: 26 },
  { Icon: ClipboardList, delay: 2, x: "50%", y: "85%", rotate: 5, size: 30 },
]

export function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingItems.map(({ Icon, delay, x, y, rotate, size }, index) => (
        <FloatingItem 
          key={index}
          Icon={Icon}
          delay={delay}
          initialX={x}
          initialY={y}
          rotate={rotate}
          size={size}
          scrollProgress={scrollYProgress}
          index={index}
        />
      ))}
    </div>
  )
}

interface FloatingItemProps {
  Icon: typeof FileText
  delay: number
  initialX: string
  initialY: string
  rotate: number
  size: number
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"]
  index: number
}

function FloatingItem({ Icon, delay, initialX, initialY, rotate, size, scrollProgress, index }: FloatingItemProps) {
  const y = useTransform(scrollProgress, [0, 1], [0, 100 + index * 30])
  const opacity = useTransform(scrollProgress, [0, 0.5], [0.6, 0])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: rotate - 20 }}
      animate={{ 
        opacity: 0.6, 
        scale: 1, 
        rotate,
        y: [0, -15, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.8 },
        scale: { delay, duration: 0.8, type: "spring" },
        rotate: { delay, duration: 0.8 },
        y: { 
          delay: delay + 0.8,
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      style={{ 
        left: initialX, 
        top: initialY,
        y,
        opacity,
      }}
      className="absolute"
    >
      <div className="p-3 rounded-xl bg-card/80 border border-border/50 shadow-lg backdrop-blur-sm">
        <Icon 
          size={size} 
          className="text-primary/70"
          strokeWidth={1.5}
        />
      </div>
    </motion.div>
  )
}
