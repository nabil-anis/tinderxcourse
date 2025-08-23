import { useState, useEffect } from 'react'

export interface Course {
  id: string
  course_name: string
  description: string
  link: string
}

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Convert Google Sheets URL to CSV export URL
        const sheetId = '1WzPZQzqtdPMTPYj5Z7YDV1NA038-bZcoM6YiLra9Wa8'
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0`
        
        const response = await fetch(csvUrl)
        const csvText = await response.text()
        
        // Parse CSV
        const lines = csvText.split('\n').filter(line => line.trim())
        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim())
        
        const coursesData = lines.slice(1).map((line, index) => {
          const values = line.split(',').map(v => v.replace(/"/g, '').trim())
          return {
            id: `course-${index}`,
            course_name: values[0] || '',
            description: values[1] || '',
            link: values[2] || '',
            dateTime: values[3] || '',
          }
        }).filter(course => course.course_name) // Filter out empty rows
        
        // Sort by DateTime (newest first)
        coursesData.sort((a, b) => {
          const dateA = new Date(a.dateTime)
          const dateB = new Date(b.dateTime)
          return dateB.getTime() - dateA.getTime()
        })
        
        setCourses(coursesData)
      } catch (err) {
        setError('Failed to fetch courses')
        console.error('Error fetching courses:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return { courses, loading, error }
}