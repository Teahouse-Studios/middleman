<template>
  <v-app>
    <teahouse-header />
    <v-main>
      <redirect-prompt />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import TeahouseHeader from './components/TeahouseHeader.vue'
import RedirectPrompt from './components/RedirectPrompt.vue'
</script>
