import { Badge } from '@/components/ui/badge'
import { Hash, ArrowRight, Calendar } from 'lucide-react'
import type { CollectionEntry } from 'astro:content'

const BlogCardJSX = ({ entry }: { entry: CollectionEntry<'blog'> }) => {
  const date = entry.data.date
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <a
      href={`/${entry.collection}/${entry.id}`}
      className="group relative block rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-5 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md hover:border-primary/50 hover:-translate-y-0.5 dark:bg-white/[0.04] dark:border-white/10 dark:hover:border-primary/60 dark:hover:bg-white/[0.07]"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
            {entry.data.title}
          </h3>
          <ArrowRight
            size={16}
            className="shrink-0 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary"
          />
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {entry.data.description}
        </p>

        <div className="flex items-center justify-between gap-4 pt-1">
          {entry.data.tags && (
            <div className="flex flex-wrap gap-1.5">
              {entry.data.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-x-1 text-xs"
                >
                  <Hash size={10} />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {formattedDate && (
            <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground/70">
              <Calendar size={12} />
              {formattedDate}
            </span>
          )}
        </div>
      </div>
    </a>
  )
}

export default BlogCardJSX
