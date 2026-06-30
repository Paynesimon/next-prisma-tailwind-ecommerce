import { Separator } from '@/components/native/separator'
import MDXComponents from '@/components/native/mdx/MDXComponents'
import { getTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'
import Link from 'next/link'

import { blogProseClass } from './blog-prose'
import { getBlogNavCopy } from './nav-copy'

type BlogPost = {
   slug: string
   title: string
   description: string
   image: string
   content?: string | null
   createdAt: Date
   updatedAt: Date
   keywords?: string[]
   categories?: string[]
   author?: { name?: string | null; avatar?: string | null }
}

export function BlogArticleLayout({
   blog,
   mdx,
   recommendations,
}: {
   blog: BlogPost
   mdx: Awaited<ReturnType<typeof import('next-mdx-remote/serialize').serialize>>
   recommendations: BlogPost[]
}) {
   const theme = getTheme()
   const copy = getBlogNavCopy()
   const isBlogTheme = theme === 'blog'

   return (
      <article
         className={cn(
            isBlogTheme ? 'max-w-6xl mx-auto' : 'grid grid-cols-1 gap-8 lg:grid-cols-4'
         )}
      >
         <div className={cn(!isBlogTheme && 'lg:col-span-3', 'space-y-8')}>
            <header className="space-y-4 border-b pb-8">
               {blog.categories?.length ? (
                  <div className="flex flex-wrap gap-2">
                     {blog.categories.map((cat) => (
                        <span
                           key={cat}
                           className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                           {cat}
                        </span>
                     ))}
                  </div>
               ) : null}
               <h1
                  className={cn(
                     'font-bold leading-tight tracking-tight',
                     isBlogTheme
                        ? 'font-serif text-3xl md:text-5xl'
                        : 'text-3xl md:text-4xl'
                  )}
               >
                  {blog.title}
               </h1>
               {blog.description ? (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                     {blog.description}
                  </p>
               ) : null}
               <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  {blog.author?.name ? <span>{blog.author.name}</span> : null}
                  <span>·</span>
                  <time dateTime={blog.createdAt.toISOString()}>
                     {format(blog.createdAt, 'PPP')}
                  </time>
               </div>
            </header>

            {blog.image ? (
               <div className="relative aspect-[2/1] overflow-hidden rounded-xl bg-muted">
                  <Image
                     src={blog.image}
                     alt={blog.title}
                     fill
                     className="object-cover"
                     sizes="(min-width: 1024px) 900px, 100vw"
                     priority
                  />
               </div>
            ) : null}

            <div className={blogProseClass(theme)}>
               <MDXRemote lazy {...mdx} components={MDXComponents} />
            </div>

            <Separator />
            <p className="text-xs text-muted-foreground">
               Updated {format(blog.updatedAt, 'PPP')}
            </p>
         </div>

         {recommendations.length ? (
            <aside
               className={cn(
                  'space-y-4',
                  isBlogTheme ? 'mt-12 border-t pt-10' : 'lg:col-span-1'
               )}
            >
               <h2
                  className={cn(
                     'text-lg font-semibold',
                     isBlogTheme && 'font-serif text-xl'
                  )}
               >
                  {copy.latestPosts}
               </h2>
               <div
                  className={cn(
                     'grid gap-4',
                     isBlogTheme ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
                  )}
               >
                  {recommendations.map((rec) => (
                     <Link
                        key={rec.slug}
                        href={`/blog/${rec.slug}`}
                        className="group overflow-hidden rounded-lg border bg-card transition hover:shadow-md"
                     >
                        {rec.image ? (
                           <div className="relative aspect-[16/10] bg-muted">
                              <Image
                                 src={rec.image}
                                 alt={rec.title}
                                 fill
                                 className="object-cover transition group-hover:scale-105"
                                 sizes="300px"
                              />
                           </div>
                        ) : null}
                        <div className="p-4">
                           <p className="line-clamp-2 text-sm font-medium group-hover:text-primary">
                              {rec.title}
                           </p>
                           {rec.author?.name ? (
                              <p className="mt-1 text-xs text-muted-foreground">
                                 {rec.author.name}
                              </p>
                           ) : null}
                        </div>
                     </Link>
                  ))}
               </div>
            </aside>
         ) : null}
      </article>
   )
}
