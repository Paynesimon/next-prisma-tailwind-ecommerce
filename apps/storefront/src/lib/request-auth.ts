import { verifyJWT } from '@/lib/jwt'

export async function getOptionalUserId(req: Request): Promise<string | null> {
   const cookieHeader = req.headers.get('cookie') || ''
   const match = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/)
   if (!match?.[1]) return null

   try {
      const payload = await verifyJWT<{ sub: string }>(match[1])
      return payload?.sub || null
   } catch {
      return null
   }
}
