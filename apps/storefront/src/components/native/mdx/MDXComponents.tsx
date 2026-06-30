import ConsCard from '@/components/native/mdx/ConsCard'
import ProsCard from '@/components/native/mdx/ProsCard'
import Step from '@/components/native/mdx/Step'
import Image from 'next/image'
import Link from 'next/link'

function MDXImage({ alt, src }: { alt?: string; src?: string }) {
   if (!src) return null
   return (
      <div className="relative my-6 aspect-video w-full overflow-hidden rounded-lg">
         <Image
            alt={alt || ''}
            className="object-cover"
            src={src}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
         />
      </div>
   )
}

function Callout(props) {
   return (
      <div className="my-8 flex rounded-lg bg-neutral-200 p-4 dark:bg-neutral-800">
         <div className="mr-4 flex w-4 items-center">{props.emoji}</div>
         <div className="callout w-full">{props.children}</div>
      </div>
   )
}

function Header({ title }) {
   return <>HEY</>
}

const MDXComponents = {
   MDXImage,
   Callout,
   ConsCard,
   ProsCard,
   Step,
   Header,
}

export default MDXComponents
