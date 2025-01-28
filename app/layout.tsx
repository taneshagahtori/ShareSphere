import { Inter } from "next/font/google"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { UserProvider } from "@/contexts/user-context"
import { NotificationProvider } from "@/contexts/notification-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <UserProvider>
              <NotificationProvider>
                <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900">
                  <header className="border-b bg-card/80 backdrop-blur-sm">
                    <div className="container flex h-16 items-center justify-between">
                      <MainNav />
                      <UserNav />
                    </div>
                  </header>
                  <main className="flex-1 container py-6">{children}</main>
                  <Footer />
                </div>
              </NotificationProvider>
            </UserProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

