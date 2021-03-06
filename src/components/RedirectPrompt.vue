<template>
  <v-container class="redirect-container">
    <v-row
      v-if="dest"
      class="text-center"
    >
      <v-col
        cols="12"
        md="8"
        class="mx-auto"
      >
        <div class="mt-9">
          <v-progress-circular
            v-if="loading"
            indeterminate
            size="100"
            color="indigo"
          />
          <v-icon
            v-else
            color="red-darken-2"
            size="100"
          >
            mdi-alert
          </v-icon>
        </div>
        <h1
          v-if="loading"
          class="mt-3 text-h4"
        >
          正在重定向中
        </h1>
        <h1
          v-else
          class="mt-3 text-h4"
        >
          当前页面非茶馆工作室所属
        </h1>
        <p
          class="mt-1 text-body-2"
          style="overflow-x: auto;"
        >
          <a
            :href="dest"
            target="_blank"
            rel="noopener noreferrer"
            class="text-responsive-gray"
            style="text-overflow: ellipsis;"
          >{{ dest }}</a>
        </p>
        <p
          v-if="loading"
          class="mt-3 text-body-1"
        >
          正在跳转至您要访问的网站。请稍安勿躁。
        </p>
        <p
          v-else
          class="mt-3 text-body-1"
        >
          您正在访问一个非茶馆工作室所属的页面。茶馆工作室不对其安全性、合法性做任何保证。请注意您的网络信息安全，请勿输入有关账号和密码。
        </p>
        <v-btn
          v-if="loading"
          class="mt-5 text-white"
          block
          flat
          disabled
        >
          <v-progress-circular indeterminate />
        </v-btn>
        <v-alert
          v-if="browserBlock"
          class="mt-3 text-left"
          type="warning"
          icon="mdi-penguin"
        >
          <v-alert-title>警告</v-alert-title>
          您使用的浏览器可能会拦截您的浏览。我们建议您在右上角选择使用系统浏览器打开此页面。
        </v-alert>
        <v-btn
          v-if="!loading"
          class="mt-5 text-white"
          block
          flat
          :color="browserBlock ? 'error' : 'indigo-darken-1'"
          @click="go()"
        >
          访问此页面
        </v-btn>
      </v-col>
    </v-row>
    <p v-else>
      使用错误
    </p>
  </v-container>

  <div class="bottom text-body-2 text-responsive-gray line-list">
    <v-divider class="mb-2" />
    <ul>
      <li>来源：{{ names[source] || '位置' }}</li>
    </ul>
    <ul>
      <li>
        © {{ new Date().getFullYear() }} <a
          href="https://teahouse.team/"
          rel="noopener noreferer"
          target="_blank"
        >茶馆工作室</a>
      </li>
      <li>
        <a
          href="https://beian.miit.gov.cn/"
          rel="noopener noreferer"
          target="_blank"
        >蜀 ICP 备 2022011374 号-1</a>
      </li>
      <li>
        <a
          href="https://teahouse.team/terms"
          rel="noopener noreferer"
          target="_blank"
        >服务条款</a>
      </li>
      <li>
        <a
          href="https://teahouse.team/privacy"
          rel="noopener noreferer"
          target="_blank"
        >隐私政策</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const searchParams = new URLSearchParams(window.location.search)

const supportedSource = ['akaribot', 'default']

let browserBlock = false
const UABlacklist = [
  /QQ\//
]
if (matchAny(UABlacklist, window.navigator.userAgent)) {
  browserBlock = true
}

const rot13 = (message: string) => {
  const originalAlpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const cipher = "nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM"
  return message.replace(/[a-z]/gi, letter => cipher[originalAlpha.indexOf(letter)])
}

const rawDest = searchParams.get('dest') || 'https://example.com/'
const rot13Dest = searchParams.get('rot13')
const dest = rot13Dest ? rot13(rot13Dest) : rawDest
let loading = $ref(false)
const allowlist = [
  // Teahouse
  'teahou.se',
  'wdf.ink',
  'wd-ljt.com',
  'wd-api.com',
  'teahouse.team',
  // Requested
  'bedev.cn'
]
if (endsWithAny(allowlist, new URL(dest!).hostname) || searchParams.get('passThru')! === 'true') {
  loading = true
  window.location.href = dest!
}

let ogSource = searchParams.get('source')
if (ogSource && supportedSource.includes(ogSource)) {
  ogSource = ogSource
} else {
  ogSource = 'default'
}
const source = ogSource


const names = {
  akaribot: '小可',
  default: 'Teahouse Studios',
}
const privacy = {
  akaribot: 'https://bot.teahou.se/-/63',
  default: 'https://teahou.se/privacy',
}
const terms = {
  akaribot: 'https://bot.teahou.se/-/215',
  default: 'https://teahou.se/terms',
}

const go = () => {
  if (browserBlock) {
    window.navigator.clipboard.writeText(dest!)
  }
  loading = true
  window.location.href = dest!
}

// https://stackoverflow.com/a/53599074
function endsWithAny (suffixes: string[], string: string): boolean {
  for (let suffix of suffixes) {
    if (string.endsWith(suffix))
      return true
    }
  return false
}

function matchAny (regexes: RegExp[], string: string): boolean {
  for (let regex of regexes) {
    if (string.match(regex))
      return true
  }
  return false
}
</script>

<style lang="scss" scoped>
.redirect-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.bottom {
  position: fixed;
  bottom: 10px;
  text-align: center;
  width: 100%;
}

.line-list {
  ul {
    position: relative;
    box-sizing: border-box;
    padding: 0;
    overflow: hidden;
  }

  li {
    display: inline-block;
    margin-right: 10px;
  }

  li:not(:first-child):before {
    content: '\00a0|\00a0';
    display: inline-block;
    display: inline-block;
    width: 10px;
    margin-left: -10px;
  }
}
</style>
