import { getTheme } from '@/lib/theme'
import {
   themeHeadingClass,
   themeTitleClass,
} from '@/themes/shared/theme-styles'

interface HeadingProps {
   title: string
   description: string
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
   const theme = getTheme()

   return (
      <div className={themeHeadingClass(theme)}>
         <h2 className={themeTitleClass(theme)}>{title}</h2>
         <p className="mt-1 text-sm text-muted-foreground md:text-base">
            {description}
         </p>
      </div>
   )
}
