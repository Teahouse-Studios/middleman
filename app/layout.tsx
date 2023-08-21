import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Separator } from '@/app/components/ui/separator'
import { Provider } from 'react-wrap-balancer'
import { ThemeProvider } from './components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '非官方页面 - 茶馆工作室 Teahouse Studio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-black`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Provider>
            <main className="flex min-h-screen flex-col items-center p-12 pt-14 text-center">
              {children}
              <footer className="fixed bottom-1 w-full">
                <Separator />
                <ul className="my-2 flex gap-2 justify-center text-slate-600 dark:text-slate-400 text-sm">
                  <li className="after:content-['/'] after:ml-2">
                    © {new Date().getFullYear()}{' '}
                    <a
                      href="https://teahouse.team/"
                      rel="noopener noreferer"
                      target="_blank"
                    >
                      茶馆工作室
                    </a>
                  </li>
                  <li className="after:content-['/'] after:ml-2">
                    <a
                      href="https://beian.miit.gov.cn/"
                      rel="noopener noreferer"
                      target="_blank"
                    >
                      蜀 ICP 备 2022011374 号-1
                    </a>
                  </li>
                  <li className="after:content-['/'] after:ml-2">
                    <a
                      href="https://teahouse.team/terms"
                      rel="noopener noreferer"
                      target="_blank"
                    >
                      服务条款
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://teahouse.team/privacy"
                      rel="noopener noreferer"
                      target="_blank"
                    >
                      隐私政策
                    </a>
                  </li>
                </ul>
              </footer>
            </main>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
