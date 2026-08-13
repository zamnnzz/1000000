import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'خربانة',
  description: 'لعبة جماعية: اكتب، ارسم، وخمّن'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
