<template>
  <v-container class="mt-8">
    <v-row class="text-center" align="center">
      <v-col cols="12" md="8" class="mx-auto">
        <img :src="image[source]" height="200" :alt="names[source]" />
        <h1 class="mt-9 text-h4"><v-icon color="red-darken-2">mdi-alert</v-icon> 当前网页非官方页面</h1>
        <p class="mt-1 text-body-2"><a :href="dest" target="_blank" rel="noopener noreferrer" class="text-grey-darken-1">{{ dest }}</a></p>
        <p class="mt-3 text-body-1">您正在访问一个非官方页面。茶馆工作室不对其安全性、合法性做任何保证。请注意您的网络信息安全，请勿输入有关账号和密码。</p>
        <v-btn class="mt-5 text-white" block flat color="indigo-darken-1" :href="dest">访问此页面</v-btn>
        <p class="bottom text-body-2 text-grey-darken-1">© {{ new Date().getFullYear() }} <a href="https://teahou.se/">Teahouse Studios</a> | 来源：{{ names[source] }}
        <br><a :href="terms[source]">服务条款</a> | <a :href="privacy[source]">隐私政策</a></p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const searchParams = new URLSearchParams(window.location.search)

const supportedSource = ['akaribot', 'default']

let ogSource = searchParams.get('source')
if (ogSource && supportedSource.includes(ogSource)) {
  ogSource = ogSource
} else {
  ogSource = 'default'
}

const source = ogSource
const dest = searchParams.get('dest')

const image = {
  akaribot: '/src/assets/sources/akaribot.jpg',
  default: '/src/assets/sources/teahouse.png',
}
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
