import { BlogPostCard } from '@/components/native/BlogCard'
import { Heading } from '@/components/native/heading'
import { getMessages } from '@/i18n'
import { getTheme } from '@/lib/theme'
import prisma from '@/lib/prisma'
import { BlogListPage } from '@/themes/blog/BlogListPage'

export default async function BlogIndex() {
   const blogs = await prisma.blog.findMany({
      include: { author: true },
      orderBy: { createdAt: 'desc' },
   })

   if (getTheme() === 'blog') {
      return <BlogListPage blogs={blogs} />
   }

   const pages = getMessages().pages

   return (
      <div className="flex flex-col">
         <Heading title={pages.blogTitle} description={pages.blogDesc} />
         <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {blogs.map((post) => (
               <BlogPostCard key={post.slug} post={post} />
            ))}
         </div>
      </div>
   )
}
