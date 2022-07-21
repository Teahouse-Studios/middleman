<template>
  <v-app :theme="theme">
    <v-main>
      <RedirectPrompt />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const theme = usePreferredColorScheme()
</script>
<style lang="scss">
body {
  position: fixed;
  width: 100%;
  height: 100%;
}
.v-theme--light .text-responsive-gray {
  color: #757575 !important;
  caret-color: #757575 !important;
}

.v-theme--dark .text-responsive-gray {
  color: #bdbdbd !important;
  caret-color: #bdbdbd !important;
}

.v-theme--light a {
  color: #1565C0;
}

.v-theme--dark a {
  color: #2196f3;
}</style>
