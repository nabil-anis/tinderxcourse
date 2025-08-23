import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import type { Course } from '@/hooks/useCourses'

interface CourseCardProps {
  course: Course
  showInstructions?: boolean
  onSwipe?: (direction: 'left' | 'right') => void
}

export const CourseCard = ({ course, showInstructions, onSwipe }: CourseCardProps) => {
  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto h-96 rounded-2xl bg-card border border-border shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={(_, { offset, velocity }) => {
        if (Math.abs(offset.x) > 100 || Math.abs(velocity.x) > 500) {
          onSwipe?.(offset.x > 0 ? 'right' : 'left')
        }
      }}
      whileDrag={{ scale: 1.05 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ 
        scale: 0, 
        opacity: 0, 
        x: typeof window !== 'undefined' ? window.innerWidth : 300 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Instruction Overlay */}
      {showInstructions && (
        <motion.div
          className="absolute inset-0 bg-black/70 z-10 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center text-white">
            <p className="text-lg font-medium mb-2">
              Swipe right to save this course
            </p>
            <p className="text-sm opacity-80">
              Swipe left to ignore
            </p>
          </div>
        </motion.div>
      )}

      {/* Card Content */}
      <div className="h-full flex flex-col p-6">
        <h3 className="font-serif text-xl font-bold mb-4 text-foreground line-clamp-2">
          {course.course_name}
        </h3>
        
        <div className="flex-1 overflow-hidden">
          <p className="text-muted-foreground text-base leading-relaxed h-full overflow-y-auto">
            {course.description}
          </p>
        </div>
        
        {course.link && (
          <div className="mt-4 pt-4 border-t border-border">
            <a
              href={course.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} />
              View Course
            </a>
          </div>
        )}
      </div>
    </motion.div>
  )
}