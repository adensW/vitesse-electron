<script lang="ts" setup>
import { versions } from '#preload'
</script>

<template>
  <ul aria-labelledby="versions">
    <li
      v-for="(version, lib) in versions"
      :key="lib"
    >
      <strong>{{ lib }}</strong>: v{{ version }}
    </li>
  </ul>
  <code>packages/renderer/src/components/ElectronVersions.vue</code>
</template>

<style scoped>
ul {
  list-style: none;
}
</style>
