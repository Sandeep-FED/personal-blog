import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { technologies, type Technologies, type Category } from '../../consts'
import { type IconType } from 'react-icons'
import { FaMicrosoft, FaQuestionCircle } from 'react-icons/fa'
import {
  SiHtml5,
  SiJavascript,
  SiCss3,
  SiAstro,
  SiTailwindcss,
  SiGit,
  SiReact,
} from 'react-icons/si'
import { RiSupabaseLine } from "react-icons/ri"
import { TbBrandTypescript } from 'react-icons/tb'
import { VscAzure, VscAzureDevops, VscGithub, VscVscode } from 'react-icons/vsc'
import { LucideAppWindow, Code, Globe, Blocks, Layout, Zap, Cloud, Brain, Wrench, Database, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: { [key: string]: IconType } = {
  'mdi:language-html5': SiHtml5,
  'mdi:language-javascript': SiJavascript,
  'mdi:language-typescript': TbBrandTypescript,
  'mdi:language-css3': SiCss3,
  'mdi:react': SiReact,
  'mdi:microsoft': FaMicrosoft,
  'simple-icons:astro': SiAstro,
  'mdi:tailwind': SiTailwindcss,
  'mdi:git': SiGit,
  'mdi:github': VscGithub,
  'mdi:microsoft-azure': VscAzure,
  'mdi:microsoft-azure-devops': VscAzureDevops,
  'mdi:visual-studio-code': VscVscode,
  'mdi:windows': LucideAppWindow,
  'mdi:visual-studio': Code,
  'mdi:supabase': RiSupabaseLine,
}

type CardConfig = {
  icon: React.ElementType
  bg: string
  text: string
  pillBg: string
  rotate: string
  span: string
}

const cardStyles: Record<string, CardConfig> = {
  'Web Development': {
    icon: Globe,
    bg: 'bg-violet-500 dark:bg-violet-600',
    text: 'text-white',
    pillBg: 'bg-white/25',
    rotate: '-rotate-3',
    span: 'md:col-span-2 md:row-span-2',
  },
  'Microsoft 365 & SharePoint': {
    icon: Blocks,
    bg: 'bg-indigo-400 dark:bg-indigo-500',
    text: 'text-white',
    pillBg: 'bg-white/25',
    rotate: 'rotate-2',
    span: 'md:col-span-2',
  },
  'Frontend Frameworks & Libraries': {
    icon: Layout,
    bg: 'bg-teal-400 dark:bg-teal-500',
    text: 'text-white',
    pillBg: 'bg-white/25',
    rotate: '-rotate-1',
    span: '',
  },
  'Power Platform': {
    icon: Zap,
    bg: 'bg-purple-400 dark:bg-purple-500',
    text: 'text-white',
    pillBg: 'bg-white/25',
    rotate: 'rotate-3',
    span: '',
  },
  'Cloud & Azure Services': {
    icon: Cloud,
    bg: 'bg-cyan-500 dark:bg-cyan-600',
    text: 'text-white',
    pillBg: 'bg-white/25',
    rotate: 'rotate-1',
    span: 'md:row-span-2',
  },
  'Azure AI Services': {
    icon: Brain,
    bg: 'bg-fuchsia-500 dark:bg-fuchsia-600',
    text: 'text-white',
    pillBg: 'bg-white/25',
    rotate: '-rotate-2',
    span: 'md:col-span-2',
  },
  'Development Tools': {
    icon: Wrench,
    bg: 'bg-slate-500 dark:bg-slate-600',
    text: 'text-white',
    pillBg: 'bg-white/25',
    rotate: 'rotate-2',
    span: '',
  },
  'Databases': {
    icon: Database,
    bg: 'bg-indigo-500 dark:bg-indigo-600',
    text: 'text-white',
    pillBg: 'bg-white/25',
    rotate: '-rotate-3',
    span: '',
  },
}

const categories = Object.keys(technologies) as (keyof Technologies)[]

const SkillCard = ({ category }: { category: keyof Technologies }) => {
  const [expanded, setExpanded] = useState(false)
  const style = cardStyles[category]
  if (!style) return null
  const CategoryIcon = style.icon
  const items = technologies[category]

  return (
    <>
      {/* Card */}
      <motion.div
        layout
        onClick={() => setExpanded(true)}
        className={cn(
          "relative overflow-hidden rounded-3xl p-5 md:p-6 flex flex-col justify-between",
          "transition-all duration-300 hover:scale-105 hover:rotate-0 cursor-pointer",
          "shadow-lg hover:shadow-xl",
          style.bg,
          style.text,
          style.rotate,
          style.span,
        )}
      >
        <CategoryIcon
          className="absolute -right-3 -bottom-3 opacity-15"
          size={120}
          strokeWidth={1}
        />

        <div className="relative z-10">
          <CategoryIcon size={28} strokeWidth={1.5} />
        </div>
        <div className="relative z-10">
          <p className="font-custom text-base md:text-lg font-bold leading-tight">
            {category}
          </p>
          <p className="text-xs opacity-80 mt-1 font-medium">
            {items.length} {items.length === 1 ? 'tool' : 'tools'} — tap to explore
          </p>
        </div>
      </motion.div>

      {/* Expanded overlay - portal to body to escape transform containment */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {expanded && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setExpanded(false)
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                className={cn(
                  "fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                  "w-[90vw] max-w-md rounded-3xl p-6 md:p-8 shadow-2xl",
                  "overflow-hidden",
                  style.bg,
                  style.text,
                )}
              >
                {/* Background icon */}
                <CategoryIcon
                  className="absolute -right-6 -bottom-6 opacity-10"
                  size={180}
                  strokeWidth={1}
                />

                {/* Close button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpanded(false)
                  }}
                  className="absolute top-4 right-4 z-20 rounded-full bg-white/25 p-2 hover:bg-white/40 active:bg-white/50 transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Header */}
                <div className="relative z-10 mb-6">
                  <CategoryIcon size={32} strokeWidth={1.5} className="mb-3" />
                  <h3 className="font-custom text-2xl font-bold leading-tight text-inherit">
                    {category}
                  </h3>
                </div>

                {/* Tools grid */}
                <div className="relative z-10 flex flex-wrap gap-2">
                  {items.map((tech: Category, index: number) => {
                    const TechIcon = iconMap[tech.logo] || FaQuestionCircle
                    return (
                      <motion.div
                        key={tech.text}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          "flex items-center gap-2 rounded-full px-3.5 py-2",
                          style.pillBg,
                        )}
                      >
                        <TechIcon className="text-sm shrink-0" />
                        <span className="text-sm font-medium whitespace-nowrap">
                          {tech.text}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

const Skills: React.FC = () => {
  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] gap-3 md:gap-4">
      {categories.map((category) => (
        <SkillCard key={category} category={category} />
      ))}
    </div>
  )
}

export default Skills
