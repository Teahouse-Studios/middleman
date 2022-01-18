<template>
  <v-container class="mt-8">
    <v-row class="text-center" align="center" v-if="dest">
      <v-col cols="12" md="8" class="mx-auto">
        <div class="mt-9">
          <v-progress-circular indeterminate size="100" color="indigo" v-if="loading" />
          <v-icon color="red-darken-2" size="100" v-else>mdi-alert</v-icon>
        </div>
        <h1 class="mt-3 text-h4" v-if="loading">正在重定向中</h1>
        <h1 class="mt-3 text-h4" v-else>当前页面非茶馆工作室所属</h1>
        <p class="mt-1 text-body-2" style="overflow-x: auto;"><a :href="dest" target="_blank" rel="noopener noreferrer" class="text-grey-darken-1" style="text-overflow: ellipsis;">{{ dest }}</a></p>
        <p class="mt-3 text-body-1">您正在访问一个非茶馆工作室所属的页面。茶馆工作室不对其安全性、合法性做任何保证。请注意您的网络信息安全，请勿输入有关账号和密码。</p>
        <v-btn class="mt-5 text-white" block flat disabled v-if="loading"><v-progress-circular indeterminate /></v-btn>
        <v-btn class="mt-5 text-white" block flat color="indigo-darken-1" @click="go()" v-if="!loading">访问此页面</v-btn>
        <p class="mt-3 text-caption" v-if="browserBlock">您目前的浏览器可能会拦截您的浏览。为了以防万一，我们另会复制网址至剪贴板中。</p>
        <p class="bottom text-body-2 text-grey-darken-1">© {{ new Date().getFullYear() }} <a href="https://teahou.se/">Teahouse Studios</a> | 来源：{{ names[source] }}
        <br><a :href="terms[source]">服务条款</a> | <a :href="privacy[source]">隐私政策</a></p>
      </v-col>
    </v-row>
    <p v-else>使用错误</p>
  </v-container>
</template>

<script setup lang="ts">
import allowlist from '../allowlist.json'

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
const dest = searchParams.get('dest') || decodeURI(rot13(searchParams.get('rot13')!))
let loading = $ref(false)
if (endsWithAny(allowlist, new URL(dest!).hostname)) {
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
  if (browserBlock) { window.navigator.clipboard.writeText(dest!) }
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
.bottom {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
}

a {
  color: #1565C0;
}
</style>
