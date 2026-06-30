import { JsonLd } from '@/components/native/JsonLd'
import { BlogComments } from '@/components/feedback/BlogComments'
import { isFeatureEnabled } from '@/lib/features'
import prisma from '@/lib/prisma'
import { getTheme } from '@/lib/theme'
import { BlogArticleLayout } from '@/themes/blog/BlogArticleLayout'
import { serialize } from 'next-mdx-remote/serialize'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
   params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const blog = await prisma.blog.findUnique({
      where: { slug: params.slug },
      include: { author: true },
   })

   if (!blog) {
      return { title: 'Blog Post Not Found' }
   }

   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

   return {
      title: blog.title,
      description: blog.description,
      keywords: blog.keywords,
      openGraph: {
         title: blog.title,
         description: blog.description,
         type: 'article',
         images: blog.image ? [blog.image] : [],
         url: `${siteUrl}/blog/${blog.slug}`,
      },
   }
}

export default async function BlogPostPage({ params }: Props) {
   const blog = await prisma.blog.findUnique({
      where: { slug: params.slug },
      include: { author: true },
   })

   if (!blog) notFound()

   const recommendations = await prisma.blog.findMany({
      where: { slug: { not: params.slug } },
      include: { author: true },
      take: 3,
      orderBy: { createdAt: 'desc' },
   })

   const mdx = await serialize(blog.content || '')
   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
   const theme = getTheme()

   const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.description,
      image: blog.image ? [blog.image] : undefined,
      datePublished: blog.createdAt.toISOString(),
      dateModified: blog.updatedAt.toISOString(),
      author: {
         '@type': 'Person',
         name: blog.author?.name || 'Editor',
      },
      publisher: {
         '@type': 'Organization',
         name: siteUrl ? new URL(siteUrl).hostname : 'Store',
      },
      mainEntityOfPage: {
         '@type': 'WebPage',
         '@id': `${siteUrl}/blog/${blog.slug}`,
      },
      keywords: blog.keywords?.join(', '),
   }

   return (
      <>
         <JsonLd data={jsonLd} />
         <BlogArticleLayout
            blog={blog}
            mdx={mdx}
            recommendations={recommendations}
         />
         {isFeatureEnabled('blogComments') ? (
            <BlogComments slug={blog.slug} theme={theme} />
         ) : null}
      </>
   )
}
