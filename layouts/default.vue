<template>
    <AppHeader />
    <AppVideoModal  v-if="appStore.isVideoActive" />
    <slot />
</template>

<script setup>
    const appStore = useAppStore()
    const { enabled, state } = usePreviewMode()
</script>

<style lang="scss">
</style>
