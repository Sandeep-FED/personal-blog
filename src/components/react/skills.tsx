import { useEffect } from 'react'
import { technologies, type Technologies, type Category } from '../../consts'
import { InfiniteScroll } from '../ui/infinite-scroll'
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
import { FiDatabase } from "react-icons/fi";
import { RiSupabaseLine } from "react-icons/ri";
import { TbBrandTypescript } from 'react-icons/tb'
import {VscAzure, VscAzureDevops, VscGithub, VscVscode} from 'react-icons/vsc'
import {  LucideAppWindow, Code } from 'lucide-react'

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

const categories = Object.keys(technologies)
const groupSize = Math.ceil(categories.length / 3)
const categoryGroups = [
  categories.slice(0, groupSize),
  categories.slice(groupSize, groupSize * 2),
  categories.slice(groupSize * 2),
]

const Skills: React.FC = () => {
  useEffect(() => {
    document.querySelectorAll('.tech-badge').forEach((badge) => {
      badge.classList.add('tech-badge-visible')
    })
  }, [])

  return (
    <div className="z-30 mt-12 flex w-full flex-col max-w-[calc(100vw-5rem)] mx-auto lg:max-w-full">
      <div className="space-y-2">
        {categoryGroups.map((group, groupIndex) => (
          <InfiniteScroll
            key={groupIndex}
            duration={50000}
            direction={groupIndex % 2 === 0 ? 'normal' : 'reverse'}
            showFade={true}
            className="flex flex-row justify-center"
          >
            {group.flatMap((category) =>
              technologies[category as keyof Technologies].map(
                (tech: Category, techIndex: number) => {
                  const IconComponent = iconMap[tech.logo] || FaQuestionCircle
                  return (
                    <div
                      key={`${category}-${techIndex}`}
                      className="tech-badge repo-card border-border bg-card text-muted-foreground mr-5 flex items-center gap-3 rounded-full border p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md"
                      data-tech-name={`${category}-${techIndex}`}
                    >
                      <span className="bg-muted flex h-10 w-10 items-center justify-center rounded-full p-2 text-lg shadow-inner">
                        <IconComponent className="tech-icon text-primary" />
                      </span>
                      <span className="text-foreground font-medium">
                        {tech.text}
                      </span>
                    </div>
                  )
                },
              ),
            )}
          </InfiniteScroll>
        ))}
      </div>
    </div>
  )
}

export default Skills
