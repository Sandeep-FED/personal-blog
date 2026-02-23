import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from './link'
import ThemeToggle from './theme-toggle'
import { NAV_LINKS, SOCIAL_LINKS, SITE } from '../../consts'
import { cn } from '@/lib/utils'
import debounce from 'lodash.debounce'
import Logo from '../ui/logo'
import { Button } from '@/components/ui/button'
import { Menu, X, Github, Mail, Phone, Rss, ChevronRight, Home } from 'lucide-react'

const SOCIAL_ICON_MAP: Record<string, React.ElementType> = {
  GitHub: Github,
  Email: Mail,
  Phone: Phone,
  RSS: Rss,
}

// Breadcrumb helper
const getBreadcrumbs = (path: string) => {
  if (path === '/') return []

  const segments = path.split('/').filter(Boolean)
  const breadcrumbs: { label: string; href: string }[] = []

  segments.forEach((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const label = segment.replace(/-/g, ' ')
    breadcrumbs.push({ label, href })
  })

  return breadcrumbs
}

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activePath, setActivePath] = useState("/")
  const [breadcrumbs, setBreadcrumbs] = useState<{ label: string; href: string }[]>([])

  useEffect(() => {
    setActivePath(window.location.pathname)
    setBreadcrumbs(getBreadcrumbs(window.location.pathname))

    const handleRouteChange = () => {
      setActivePath(window.location.pathname)
      setBreadcrumbs(getBreadcrumbs(window.location.pathname))
    }

    window.addEventListener('popstate', handleRouteChange)
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  useEffect(() => {
    const handleResize = debounce(() => {
      const isMobileView = window.matchMedia('(max-width: 768px)').matches
      setIsMobile(isMobileView)
      if (!isMobileView && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }, 100)

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        aria-label="Navigation"
        role="banner"
        className={cn(
          'fixed left-1/2 z-30 -translate-x-1/2',
          'top-3 lg:top-5',
          isMobile && 'top-0 w-full',
        )}
      >
        <div
          className={cn(
            'flex items-center gap-1 px-2 py-2 md:px-4 md:py-2.5',
            'backdrop-blur-xl',
            'bg-white/10 dark:bg-white/[0.06]',
            'border border-white/20 dark:border-white/10',
            'shadow-lg shadow-black/5 dark:shadow-black/20',
            'transition-all duration-300 ease-in-out',
            !isMobile && 'rounded-full',
            isMobile && 'rounded-none w-full',
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-custom flex shrink-0 items-center gap-2 text-lg font-bold px-2"
            aria-label="Home"
            title="Home"
          >
            <Logo className="h-7 w-7" />
            <span className="hidden sm:inline transition-opacity duration-200 ease-in-out text-foreground/90 dark:text-white">
              {SITE.title}
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/"
                  ? activePath === "/"
                  : activePath.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium capitalize transition-colors duration-200",
                    "rounded-full px-3.5 py-1.5",
                    "hover:bg-white/15 dark:hover:bg-white/10 hover:text-foreground",
                    isActive
                      ? "bg-white/20 dark:bg-white/10 text-foreground dark:text-white"
                      : "text-foreground/70 dark:text-white/60"
                  )}
                  onClick={() => setActivePath(item.href)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Separator */}
          <div className="hidden md:block h-5 w-px bg-foreground/15 dark:bg-white/15 mx-1" />

          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-0.5">
            {SOCIAL_LINKS.filter(l => l.label !== 'RSS').map(({ href, label }) => {
              const IconComponent = SOCIAL_ICON_MAP[label]
              if (!IconComponent) return null
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full p-2",
                    "text-foreground/60 dark:text-white/50",
                    "hover:text-foreground dark:hover:text-white hover:bg-white/15 dark:hover:bg-white/10",
                    "transition-colors duration-200"
                  )}
                >
                  <IconComponent className="size-4" />
                </a>
              )
            })}
          </div>

          {/* Separator */}
          <div className="hidden md:block h-5 w-px bg-foreground/15 dark:bg-white/15 mx-1" />

          {/* Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-1 ml-auto md:ml-0">
            <ThemeToggle />

            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                className="h-9 w-9 rounded-full p-0 transition-colors duration-200 ease-in-out"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu - Right side panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Side panel */}
            <motion.div
              key="mobile-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 z-25 w-[60%] max-w-[300px] bg-background/95 dark:bg-background/98 backdrop-blur-xl border-l border-foreground/10 dark:border-white/10 shadow-2xl"
            >
              {/* Close button */}
              <div className="flex justify-end p-4 pt-5">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="h-9 w-9 rounded-full p-0"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Nav links - right aligned */}
              <nav className="flex flex-col items-end gap-2 px-6 pt-2">
                {NAV_LINKS.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? activePath === "/"
                      : activePath.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "text-lg font-medium font-custom capitalize transition-colors py-2",
                        isActive
                          ? "text-primary dark:text-primary"
                          : "text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>

              {/* Mobile Social Icons */}
              <div className="flex items-center justify-end gap-3 px-6 pb-8 pt-8 border-t border-foreground/10 dark:border-white/10 mx-6 mt-8">
                {SOCIAL_LINKS.map(({ href, label }) => {
                  const IconComponent = SOCIAL_ICON_MAP[label]
                  if (!IconComponent) return null
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="inline-flex items-center justify-center rounded-full p-2 text-foreground/50 dark:text-white/40 hover:text-foreground dark:hover:text-white transition-colors"
                    >
                      <IconComponent className="size-5" />
                    </a>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar