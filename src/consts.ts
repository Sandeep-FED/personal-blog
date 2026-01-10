import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'Sandeep P S',
  description:
    "Microsoft MVP (M365, SharePoint)🏅 | Senior Software Engineer @ EY | Blogger | Building M365 + AI-powered experiences that make collaboration frictionless 🚀",
  href: 'https://www.sandeepps.me',
  author: 'Sandeep P S',
  locale: 'en-US',
  location: 'India',
  email: 'Sandeep.ps0124@outlook.com'
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/',
    label: 'home',
  },
  {
    href: '/projects',
    label: 'projects',
  },
  {
    href: '/blog',
    label: 'blog',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/Sandeep-FED?ref=personal-website',
    label: 'GitHub',
  },
  {
    href: 'mailto:sandeep.ps0124@outlook.com',
    label: 'Email',
  },
  {
    href: 'tel:+918848080012',
    label: 'Phone',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  Phone: 'lucide:phone',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}

export interface Category {
  text: string
  logo: string
}

export type Technologies = {
  'Web Development': Category[]
  'Microsoft 365 & SharePoint': Category[]
  'Frontend Frameworks & Libraries': Category[]
  'Power Platform': Category[]
  'Cloud & Azure Services': Category[]
  'Azure AI Services': Category[]
  'Development Tools': Category[]
  'Databases': Category[]
}

export const technologies: Technologies = {
  'Web Development': [
    { text: 'HTML5', logo: 'mdi:language-html5' },
    { text: 'CSS3', logo: 'mdi:language-css3' },
    { text: 'JavaScript', logo: 'mdi:language-javascript' },
    { text: 'TypeScript', logo: 'mdi:language-typescript' },
  ],

  'Microsoft 365 & SharePoint': [
    { text: 'SharePoint Online', logo: 'mdi:microsoft' },
    { text: 'SPFx (SharePoint Framework)', logo: 'mdi:microsoft' },
    { text: 'Microsoft Graph API', logo: 'mdi:microsoft' },
    { text: 'PnP JS', logo: 'mdi:microsoft' },
  ],

  'Frontend Frameworks & Libraries': [
    { text: 'React', logo: 'mdi:react' },
    { text: 'Fluent UI', logo: 'mdi:microsoft' },
    { text: 'Tailwind CSS', logo: 'mdi:tailwind' },
  ],

  'Power Platform': [
    { text: 'Power Apps', logo: 'mdi:microsoft' },
    { text: 'Power Automate', logo: 'mdi:microsoft' },
  ],

  'Cloud & Azure Services': [
  { text: 'Microsoft Azure', logo: 'mdi:microsoft-azure' },
  { text: 'Azure Functions', logo: 'mdi:microsoft-azure' },
  { text: 'Azure Logic Apps', logo: 'mdi:microsoft-azure' },
  { text: 'Azure App Services', logo: 'mdi:microsoft-azure' },
],

'Azure AI Services': [
  { text: 'Azure AI Document Intelligence', logo: 'mdi:microsoft-azure' },
  { text: 'Azure AI Search', logo: 'mdi:microsoft-azure' },
  { text: 'Azure OpenAI Service', logo: 'mdi:microsoft-azure' },
  { text: 'Azure Cognitive Services', logo: 'mdi:microsoft-azure' },
],

'Development Tools': [
  { text: 'Visual Studio Code', logo: 'mdi:visual-studio-code' },
  { text: 'Visual Studio', logo: 'mdi:visual-studio' },
  { text: 'Git', logo: 'mdi:git' },
  { text: 'GitHub', logo: 'mdi:github' },
  { text: 'Azure DevOps', logo: 'mdi:microsoft-azure-devops' },
],

Databases: [
  { text: 'SharePoint', logo: 'mdi:microsoft' },
  { text: 'Azure Cosmos DB', logo: 'mdi:microsoft-azure' },
  { text: 'Supabase', logo: 'mdi:supabase' },
],
}