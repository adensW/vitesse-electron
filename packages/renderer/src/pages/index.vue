<script lang="ts" setup>
import ReactiveCounter from '~/components/ReactiveCounter.vue'
import ReactiveHash from '~/components/ReactiveHash.vue'
import ElectronVersions from '~/components/ElectronVersions.vue'
import { useUserStore } from '~/stores/user'

const user = useUserStore()
const name = $ref(user.savedName)

const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
}

const { t } = useI18n()
</script>

<template>
  <div>
    <div text-4xl>
      <div
        i-carbon-campsite
        inline-block
      />
    </div>

    <p>
      <em
        text-sm
        opacity-75
      >{{ t('intro.desc') }}</em>
    </p>

    <div py-4 />

    <input
      id="input"
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      :aria-label="t('intro.whats-your-name')"
      type="text"
      autocomplete="false"
      p="x4 y2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >
    <label
      class="hidden"
      for="input"
    >{{ t('intro.whats-your-name') }}</label>

    <div>
      <button
        btn
        m-3
        text-sm
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>
  </div>
  <img
    alt="Vue logo"
    src="../../assets/logo.svg"
    width="150"
  >

  <p>
    For a guide and recipes on how to configure / customize this project,<br>
    check out the
    <a
      href="https://github.com/cawa-93/vite-electron-builder"
      target="_blank"
    >vite-electron-builder documentation</a>.
  </p>

  <fieldset>
    <legend>Test Vue Reactivity</legend>
    <reactive-counter />
  </fieldset>

  <fieldset>
    <legend>Test Node.js API</legend>
    <reactive-hash />
  </fieldset>

  <fieldset>
    <legend>Environment</legend>
    <electron-versions />
  </fieldset>

  <p>
    Edit
    <code>packages/renderer/src/App.vue</code> to test hot module replacement.
  </p>
</template>
<route lang="yaml">
meta:
  layout: home
</route>
