import { useState, useEffect } from 'react'

export type ColorPalette = 'blue' | 'red' | 'green'

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false)
  const [colorPalette, setColorPalette] = useState<ColorPalette>('blue')

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme')
    const savedPalette = localStorage.getItem('colorPalette') as ColorPalette
    
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }

    // Set random palette if none saved, or use saved one
    if (savedPalette) {
      setColorPalette(savedPalette)
    } else {
      const palettes: ColorPalette[] = ['blue', 'red', 'green']
      const randomPalette = palettes[Math.floor(Math.random() * palettes.length)]
      setColorPalette(randomPalette)
      localStorage.setItem('colorPalette', randomPalette)
    }
  }, [])

  useEffect(() => {
    // Apply palette classes to document
    document.documentElement.className = document.documentElement.className
      .replace(/palette-\w+/, '')
    document.documentElement.classList.add(`palette-${colorPalette}`)
  }, [colorPalette])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  const changePalette = (palette: ColorPalette) => {
    setColorPalette(palette)
    localStorage.setItem('colorPalette', palette)
  }

  return {
    isDark,
    colorPalette,
    toggleTheme,
    changePalette,
  }
}