/** Corporate theme — professional B2B-oriented shell */
export function CorporateThemeShell({ children }: { children: React.ReactNode }) {
   return (
      <div className="theme-corporate min-h-full [&_h1]:tracking-tight [&_h2]:tracking-tight">
         {children}
      </div>
   )
}
