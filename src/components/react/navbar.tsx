import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from './link'
import ThemeToggle from './theme-toggle'
import { NAV_LINKS, SOCIAL_LINKS, SITE } from '../../consts'
import { cn } from '@/lib/utils'
import debounce from 'lodash.debounce'
import Logo from '../ui/logo'
import { Button } from '@/components/ui/button'
import { Github, Mail, Phone, Rss, Menu, X } from 'lucide-react'

const SOCIAL_ICON_MAP: Record<string, React.ElementType> = {
  GitHub: Github,
  Email: Mail,
  Phone: Phone,
  RSS: Rss,
}

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activePath, setActivePath] = useState("/")
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)

  useEffect(() => {
    setActivePath(window.location.pathname)

    const handleRouteChange = () => {
      setActivePath(window.location.pathname)
      setMobileMenuOpen(false)
    }

    window.addEventListener('popstate', handleRouteChange)
    document.addEventListener('astro:after-swap', handleRouteChange)
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
      document.removeEventListener('astro:after-swap', handleRouteChange)
    }
  }, [])

  useEffect(() => {
    const handleResize = debounce(() => {
      const mobile = window.matchMedia('(max-width: 768px)').matches
      setIsMobile(mobile)
      if (!mobile) setMobileMenuOpen(false)
    }, 100)

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        aria-label="Navigation"
        role="banner"
        className={cn(
          'fixed left-1/2 z-30 -translate-x-1/2',
          'top-3 lg:top-5',
        )}
      >
        <div
          className={cn(
            'flex items-center gap-1 px-2 py-2 md:px-4 md:py-2.5',
            'backdrop-blur-xl backdrop-saturate-150',
            'bg-background/60 dark:bg-background/50',
            'border border-border/50 dark:border-white/[0.08]',
            'shadow-lg shadow-black/[0.03] dark:shadow-black/20',
            'transition-all duration-300 ease-in-out',
            'rounded-full',
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

          {/* Desktop: Nav Links */}
          {!isMobile && (
            <nav
              className="flex items-center gap-0.5"
              aria-label="Main navigation"
              onMouseLeave={() => setHoveredPath(null)}
            >
              {NAV_LINKS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? activePath === "/"
                    : activePath.startsWith(item.href);
                const isHovered = hoveredPath === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative text-sm font-medium capitalize px-3.5 py-1.5 rounded-full",
                      "transition-colors duration-200",
                      isActive
                        ? "text-foreground dark:text-white"
                        : "text-foreground/60 dark:text-white/50 hover:text-foreground dark:hover:text-white"
                    )}
                    onClick={() => setActivePath(item.href)}
                    onMouseEnter={() => setHoveredPath(item.href)}
                  >
                    {isHovered && (
                      <motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0 rounded-full bg-black/10 dark:bg-white/10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-3 rounded-full bg-primary"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Separator */}
          <div className="hidden md:block h-5 w-px bg-foreground/15 dark:bg-white/15 mx-1" />

          {/* Social Icons */}
          <div className="flex items-center gap-0.5 ml-auto md:ml-0">
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
                    "text-foreground/50 dark:text-white/40",
                    "hover:text-foreground dark:hover:text-white",
                    "hover:bg-black/[0.06] dark:hover:bg-white/10",
                    "hover:scale-110 active:scale-95",
                    "transition-all duration-200"
                  )}
                >
                  <IconComponent className="size-4" />
                </a>
              )
            })}
          </div>

          {/* Separator */}
          <div className="h-5 w-px bg-foreground/15 dark:bg-white/15 mx-1" />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="h-9 w-9 rounded-full p-0"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
      </header>

      {/* Mobile Side Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              key="mobile-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[65%] max-w-[280px] bg-background/95 dark:bg-background/98 backdrop-blur-xl border-l border-border/50 dark:border-white/10 shadow-2xl"
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

              {/* Nav links */}
              <nav className="flex flex-col items-end gap-1 px-6 pt-2">
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
                        "text-lg font-medium font-custom capitalize py-2.5 px-3 rounded-xl transition-colors duration-200",
                        isActive
                          ? "text-primary dark:text-primary"
                          : "text-foreground/70 dark:text-white/70 hover:text-foreground dark:hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>

              {/* Social Icons */}
              <div className="flex items-center justify-end gap-3 px-6 pb-8 pt-8 border-t border-border/30 dark:border-white/10 mx-6 mt-8">
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