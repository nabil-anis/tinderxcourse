import { useState } from 'react'
import { useSwipes } from '@/hooks/useSwipes'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, Heart, X } from 'lucide-react'
import { motion } from 'framer-motion'

export const HistoryPage = () => {
  const { getSavedCourses, getIgnoredCourses, loading } = useSwipes()
  const [activeTab, setActiveTab] = useState('saved')

  const savedCourses = getSavedCourses()
  const ignoredCourses = getIgnoredCourses()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-8 text-center">
          Your Course History
        </h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="saved" className="gap-2">
              <Heart size={16} />
              Saved ({savedCourses.length})
            </TabsTrigger>
            <TabsTrigger value="ignored" className="gap-2">
              <X size={16} />
              Ignored ({ignoredCourses.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="mt-6">
            {savedCourses.length === 0 ? (
              <div className="text-center py-12">
                <Heart size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-medium mb-2">No saved courses yet</h3>
                <p className="text-muted-foreground">
                  Start swiping to find courses you love!
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {savedCourses.map((swipe, index) => (
                  <motion.div
                    key={swipe.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="font-serif text-lg line-clamp-2">
                          {swipe.course_data.course_name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {swipe.course_data.description}
                        </p>
                        {swipe.course_data.link && (
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="gap-2"
                          >
                            <a
                              href={swipe.course_data.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink size={16} />
                              View Course
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="ignored" className="mt-6">
            {ignoredCourses.length === 0 ? (
              <div className="text-center py-12">
                <X size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-medium mb-2">No ignored courses</h3>
                <p className="text-muted-foreground">
                  Courses you swipe left on will appear here
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {ignoredCourses.map((swipe, index) => (
                  <motion.div
                    key={swipe.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full opacity-75">
                      <CardHeader>
                        <CardTitle className="font-serif text-lg line-clamp-2">
                          {swipe.course_data.course_name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {swipe.course_data.description}
                        </p>
                        {swipe.course_data.link && (
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="gap-2"
                          >
                            <a
                              href={swipe.course_data.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink size={16} />
                              View Course
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}