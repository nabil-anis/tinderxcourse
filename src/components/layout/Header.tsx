import { useTheme } from '@/hooks/useTheme'
import { Switch } from '@/components/ui/switch'
import { Moon, Sun } from 'lucide-react'

export const Header = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-serif font-bold text-foreground">
              CourseSwipe <span className="text-primary">by NBL</span>
            </h1>
            <p className="text-sm text-muted-foreground font-light">
              Because learning should feel like a perfect match.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <div className="flex items-center gap-2">
              <Sun size={16} className="text-muted-foreground" />
              <Switch
                checked={isDark}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-primary"
              />
              <Moon size={16} className="text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      
    </header>
  )
}