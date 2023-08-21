'use client'

import { mdiAlert, mdiCancel } from '@mdi/js'
import Icon from '@mdi/react'
import rot13 from '@/app/rot13'
import { Button } from '@/app/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert'
import Balancer from 'react-wrap-balancer'
import { useEffect, useState } from 'react'

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const dest =
    searchParams.dest ?? typeof searchParams.rot13 === 'string'
      ? rot13(searchParams.rot13 as string)
      : 'https://google.com/'

  const [browserBlocked, setBrowserBlocked] = useState(false)

  const go = () => {
    if (browserBlocked) {
      window.navigator.clipboard.writeText(dest)
    }
  }

  useEffect(() => {
    const userAgentBlacklist = [/QQ\//]
    setBrowserBlocked(
      userAgentBlacklist.some((i) => i.exec(navigator.userAgent) !== null)
    )

    const allowlist = [
      // Teahouse
      'teahou.se',
      'wdf.ink',
      'wd-ljt.com',
      'wd-api.com',
      'teahouse.team',

      // Requested
      'bedev.cn',
    ]

    if (
      allowlist.some((i) => new URL(dest).hostname.endsWith(i)) ||
      searchParams.passThru === 'true'
    ) {
      go()
      location.href = dest
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Icon path={mdiAlert} className="w-[6em] mb-5 text-red-600" />
      <h1 className="font-extrabold text-3xl mb-2">
        <Balancer>当前页面非茶馆工作室所属</Balancer>
      </h1>
      <a href={dest} className="font-xs text-slate-500 mb-3">
        {dest}
      </a>
      <p className="mb-5">
        <Balancer ratio={0.1}>
          您正在访问一个非茶馆工作室所属的页面。茶馆工作室不对其安全性、合法性做任何保证。请注意您的网络信息安全。
        </Balancer>
      </p>

      {browserBlocked && (
        <Alert variant="destructive" className="text-left mb-4">
          <Icon path={mdiCancel} className="w-4 mb-5 text-red-600" />
          <AlertTitle>警告</AlertTitle>
          <AlertDescription>
            您使用的浏览器可能会拦截您的浏览。我们建议您在右上角选择使用系统浏览器打开此页面。
          </AlertDescription>
        </Alert>
      )}

      <Button
        size="lg"
        className={`${
          browserBlocked ? '' : 'bg-blue-600 hover:bg-blue-700'
        } w-full max-w-[60rem]`}
        variant={browserBlocked ? 'destructive' : undefined}
        onClick={go}
        asChild
      >
        <a href={dest}>访问此页面</a>
      </Button>
    </>
  )
}
