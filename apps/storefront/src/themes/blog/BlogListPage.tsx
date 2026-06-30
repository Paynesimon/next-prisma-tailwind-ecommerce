import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { config } from '@/lib/config'

import { getBlogNavCopy } from './nav-copy'

type BlogPost = {
   slug: string
   title: string
   description: string
   image: string
   createdAt: Date
   categories?: string[]
   author?: { name?: string | null }
}

export function BlogListPage({ blogs }: { blogs: BlogPost[] }) {
   const copy = getBlogNavCopy()
   const [featured, ...rest] = blogs

   return (
      <div className="mx-auto max-w-6xl space-y-12 pb-8">
         <header className="space-y-3 border-b pb-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
               {config.store.name}
            </p>
            <h1 className="font-serif text-3xl font-bold tracking-tight md:text-5xl">
               {copy.latestPosts}
            </h1>
            <p className="max-w-2xl text-muted-foreground md:text-lg">
               {config.store.tagline || config.store.description}
            </p>
         </header>

         {featured ? (
            <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
               <Link
                  href={`/blog/${featured.slug}`}
                  className="group relative aspect-[16/10] overflow-hidden rounded-xl bg-muted"
               >
                  {featured.image ? (
                     <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        priority
                     />
                  ) : null}
               </Link>
               <div className="space-y-4">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                     {copy.featured}
                  </p>
                  <h2 className="font-serif text-2xl font-bold leading-snug md:text-4xl">
                     <Link
                        href={`/blog/${featured.slug}`}
                        className="hover:underline"
                     >
                        {featured.title}
                     </Link>
                  </h2>
                  <p className="line-clamp-4 text-muted-foreground leading-relaxed">
                     {featured.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                     {featured.author?.name ? <span>{featured.author.name}</span> : null}
                     <span>·</span>
                     <time dateTime={featured.createdAt.toISOString()}>
                        {format(featured.createdAt, 'PPP')}
                     </time>
                  </div>
                  <Link
                     href={`/blog/${featured.slug}`}
                     className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                  >
                     {copy.readMore}
                     <ArrowRight className="h-4 w-4" />
                  </Link>
               </div>
            </section>
         ) : null}

         {rest.length ? (
            <section className="space-y-6">
               <h2 className="font-serif text-xl font-semibold md:text-2xl">
                  {copy.viewAllPosts}
               </h2>
               <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                     <BlogListCard key={post.slug} post={post} />
                  ))}
               </div>
            </section>
         ) : null}

         {!blogs.length ? (
            <p className="text-center text-muted-foreground py-12">
               No posts yet.
            </p>
         ) : null}
      </div>
   )
}

function BlogListCard({ post }: { post: BlogPost }) {
   const copy = getBlogNavCopy()

   return (
      <article className="group flex h-full flex-col">
         <Link
            href={`/blog/${post.slug}`}
            className="relative mb-4 aspect-[16/10] overflow-hidden rounded-lg bg-muted"
         >
            {post.image ? (
               <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 50vw"
               />
            ) : null}
         </Link>
         <div className="flex flex-1 flex-col space-y-2">
            <time
               className="text-xs text-muted-foreground"
               dateTime={post.createdAt.toISOString()}
            >
               {format(post.createdAt, 'PPP')}
            </time>
            <h3 className="font-serif text-lg font-semibold leading-snug">
               <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
               </Link>
            </h3>
            <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">
               {post.description}
            </p>
            <Link
               href={`/blog/${post.slug}`}
               className="text-sm font-medium text-muted-foreground group-hover:text-foreground"
            >
               {copy.readMore} →
            </Link>
         </div>
      </article>
   )
}
