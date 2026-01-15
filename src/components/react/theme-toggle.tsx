import { Button } from '@/components/ui/button'
import { SunIcon, MoonIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggleClick = () => {
    const element = document.documentElement

    // Disable ALL transitions during theme change
    element.classList.add('disable-transitions')

    // Toggle theme
    element.classList.toggle('dark')

    // Force reflow to apply the disable-transitions class
    void element.offsetHeight

    // Save to localStorage
    const isDark = element.classList.contains('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')

    // Re-enable transitions after a brief delay
    setTimeout(() => {
      element.classList.remove('disable-transitions')
    }, 0)
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="secondary"
        size="icon"
        title="Toggle theme"
        disabled
      >
        <SunIcon className="size-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      id="theme-toggle"
      variant="secondary"
      size="icon"
      title="Toggle theme"
      onClick={handleToggleClick}
    >
      <SunIcon className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeToggle