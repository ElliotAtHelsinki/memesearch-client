import { Providers } from '@/Providers'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Meme Search Client'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
