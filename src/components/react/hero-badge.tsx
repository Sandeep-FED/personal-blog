import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'
import mvpBadge from '../../assets/MVP_Badge_Horizontal_Preferred_Blue3005_RGB.png'
import PFP from '../../assets/pfp.png'

interface HeroBadgeProps {
  name: string
  role: string
}

const HeroBadge = ({ name, role }: HeroBadgeProps) => {
  const controls = useAnimationControls()

  useEffect(() => {
    const animate = async () => {
      await controls.start({
        rotate: [15, -8, 4, -2, 0],
        opacity: 1,
        y: 0,
        transition: {
          rotate: { duration: 2.5, ease: [0.25, 0.1, 0.25, 1] },
          opacity: { duration: 0.5 },
          y: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
      })
      controls.start({
        rotate: [0, 1.5, -1.5, 1, -1, 0],
        transition: {
          duration: 8,
          ease: 'easeInOut',
          repeat: Infinity,
        },
      })
    }
    animate()
  }, [controls])

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="flex flex-col items-center"
        style={{ transformOrigin: 'top center' }}
        initial={{ rotate: 15, opacity: 0, y: -20 }}
        animate={controls}
      >
        {/* Lanyard strap */}
        <div className="w-5 sm:w-6 h-16 sm:h-24 bg-gradient-to-b from-primary/40 via-primary/60 to-primary/80 rounded-b-sm relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-px bg-white/40 absolute left-[30%]" />
            <div className="h-full w-px bg-white/40 absolute right-[30%]" />
          </div>
        </div>

        {/* Metal clip */}
        <div className="relative mx-auto w-12 h-7 -mt-px">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[18px] bg-gradient-to-b from-zinc-300 to-zinc-400 dark:from-zinc-500 dark:to-zinc-600 rounded-b-[3px] shadow-sm" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[18px] h-[18px] rounded-full border-2 border-zinc-400 dark:border-zinc-500" />
        </div>

        {/* Badge card */}
        <motion.div
          className="relative -mt-px w-[250px] sm:w-[280px] bg-card rounded-2xl border border-border/70 shadow-xl dark:shadow-black/40 overflow-hidden"
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/5 pointer-events-none" />

          {/* MVP badge - top right corner */}
          <motion.img
            src={mvpBadge.src}
            alt="Microsoft MVP"
            className="absolute top-3 right-3 h-8 sm:h-10 w-auto z-10"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: 'spring', bounce: 0.3 }}
          />

          {/* Punch hole */}
          <div className="mx-auto mt-3 w-6 h-3 rounded-full bg-background border border-border/50" />

          <div className="px-5 pt-4 pb-6">
            {/* Portrait */}
            <motion.div
              className="mx-auto w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-muted/20 border border-border/30"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: 'spring', bounce: 0.2 }}
            >
              <img src={PFP.src} className="w-full h-full object-cover" />
            </motion.div>

            {/* Name */}
            <motion.h1
              className="font-custom text-center text-xl sm:text-2xl font-bold text-foreground mt-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.4 }}
            >
              {name}
            </motion.h1>

            {/* Role */}
            <motion.p
              className="text-center text-xs sm:text-sm text-muted-foreground mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.3 }}
            >
              {role}
            </motion.p>

            {/* Available for work */}
            <motion.div
              className="flex justify-center mt-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, type: 'spring', bounce: 0.4 }}
            >
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400 border border-emerald-500/20 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Available for work
              </span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroBadge
