import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { CourseCard } from './CourseCard'
import { useCourses } from '@/hooks/useCourses'
import { useSwipes } from '@/hooks/useSwipes'
import { Button } from '@/components/ui/button'
import { RotateCcw, Heart, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export const SwipeInterface = () => {
  const { courses, loading } = useCourses()
  const { addSwipe, isCourseSwiped } = useSwipes()
  const { toast } = useToast()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showInstructions, setShowInstructions] = useState(true)

  // Filter out already swiped courses
  const availableCourses = courses.filter(course => !isCourseSwiped(course.id))

  useEffect(() => {
    // Reset index when courses change
    setCurrentIndex(0)
  }, [availableCourses])

  const handleSwipe = (direction: 'left' | 'right') => {
    setShowInstructions(false)
    
    const currentCourse = availableCourses[currentIndex]
    if (currentCourse) {
      try {
        addSwipe(currentCourse, direction)
        
        if (direction === 'right') {
          toast({
            title: 'Course saved!',
            description: 'Added to your saved courses',
          })
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to save swipe',
          variant: 'destructive',
        })
      }
    }
    
    setCurrentIndex(prev => prev + 1)
  }

  const handleManualSwipe = (direction: 'left' | 'right') => {
    handleSwipe(direction)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (currentIndex >= availableCourses.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-serif font-bold mb-4">No more courses!</h3>
        <p className="text-muted-foreground mb-6">
          You've seen all available courses. Check back later for new ones.
        </p>
        <Button 
          onClick={() => setCurrentIndex(0)}
          variant="outline"
          className="gap-2"
        >
          <RotateCcw size={16} />
          Start Over
        </Button>
      </div>
    )
  }

  const currentCourse = availableCourses[currentIndex]

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Card Stack */}
      <div className="relative h-96 w-full max-w-sm">
        <AnimatePresence mode="wait">
          {currentCourse && (
            <CourseCard
              key={currentCourse.id}
              course={currentCourse}
              showInstructions={showInstructions}
              onSwipe={handleSwipe}
            />
          )}
        </AnimatePresence>
        
        {/* Preview next card */}
        {availableCourses[currentIndex + 1] && (
          <div className="absolute inset-0 -z-10 scale-95 opacity-50">
            <CourseCard course={availableCourses[currentIndex + 1]} />
          </div>
        )}
      </div>

      {/* Manual Swipe Buttons */}
      <div className="flex gap-4">
        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-14 h-14 p-0 border-red-200 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:hover:bg-red-950"
          onClick={() => handleManualSwipe('left')}
        >
          <X size={24} className="text-red-500" />
        </Button>
        
        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-14 h-14 p-0 border-green-200 hover:bg-green-50 hover:border-green-300 dark:border-green-800 dark:hover:bg-green-950"
          onClick={() => handleManualSwipe('right')}
        >
          <Heart size={24} className="text-green-500" />
        </Button>
      </div>

      {/* Progress */}
      <div className="text-sm text-muted-foreground">
        {currentIndex + 1} of {availableCourses.length} courses
      </div>
    </div>
  )
}