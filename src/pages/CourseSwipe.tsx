import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SwipeInterface } from '@/components/course/SwipeInterface'
import { HistoryPage } from '@/components/history/HistoryPage'
import { Button } from '@/components/ui/button'
import { History, Home } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

export const CourseSwipe = () => {
  const [currentView, setCurrentView] = useState<'swipe' | 'history'>('swipe')
  const { colorPalette } = useTheme()

  return (
    <div className="min-h-screen bg-background transition-all duration-500 ease-elegant">
      <Header />
      
      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center gap-2 mb-8">
          <Button
            variant={currentView === 'swipe' ? 'default' : 'outline'}
            onClick={() => setCurrentView('swipe')}
            className="gap-2"
          >
            <Home size={16} />
            Discover
          </Button>
          <Button
            variant={currentView === 'history' ? 'default' : 'outline'}
            onClick={() => setCurrentView('history')}
            className="gap-2"
          >
            <History size={16} />
            History
          </Button>
        </div>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto">
          {currentView === 'swipe' ? (
            <div className="flex flex-col items-center">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-serif font-bold mb-2">
                  Discover Your Perfect Course
                </h2>
                <p className="text-muted-foreground">
                  Swipe right to save courses you love, left to skip
                </p>
              </div>
              <SwipeInterface />
            </div>
          ) : (
            <HistoryPage />
          )}
        </main>
      </div>

      <Footer />
    </div>
  )
}