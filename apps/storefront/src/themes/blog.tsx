/** Blog-first layout shell */
export function BlogThemeShell({ children }: { children: React.ReactNode }) {
   return (
      <div className="theme-blog min-h-full font-sans [&_.font-serif]:font-serif">
         {children}
      </div>
   )
}
