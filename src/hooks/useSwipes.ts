import { useState, useEffect } from 'react'
import type { Course } from './useCourses'

export interface SwipeRecord {
  id: string
  course_id: string
  course_data: Course
  direction: 'left' | 'right'
  created_at: string
}

export const useSwipes = () => {
  const [swipes, setSwipes] = useState<SwipeRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSwipes()
  }, [])

  const fetchSwipes = () => {
    try {
      const savedSwipes = localStorage.getItem('courseswipe-swipes')
      if (savedSwipes) {
        setSwipes(JSON.parse(savedSwipes))
      }
    } catch (error) {
      console.error('Error fetching swipes from localStorage:', error)
    } finally {
      setLoading(false)
    }
  }

  const addSwipe = (course: Course, direction: 'left' | 'right') => {
    try {
      const newSwipe: SwipeRecord = {
        id: crypto.randomUUID(),
        course_id: course.id,
        course_data: course,
        direction,
        created_at: new Date().toISOString(),
      }
      
      const updatedSwipes = [newSwipe, ...swipes]
      setSwipes(updatedSwipes)
      localStorage.setItem('courseswipe-swipes', JSON.stringify(updatedSwipes))
      return newSwipe
    } catch (error) {
      console.error('Error adding swipe to localStorage:', error)
      throw error
    }
  }

  const getSavedCourses = () => {
    return swipes.filter(swipe => swipe.direction === 'right')
  }

  const getIgnoredCourses = () => {
    return swipes.filter(swipe => swipe.direction === 'left')
  }

  const isCourseSwiped = (courseId: string) => {
    return swipes.some(swipe => swipe.course_id === courseId)
  }

  return {
    swipes,
    loading,
    addSwipe,
    getSavedCourses,
    getIgnoredCourses,
    isCourseSwiped,
    refetch: fetchSwipes,
  }
}