<script setup lang="ts">
import MinecraftDockerDashboard from '@/components/minecraftDocker/MinecraftDockerDashboard.vue';
import SuspenseSkeleton from '@/components/SuspenseSkeleton.vue';
</script>

<template>
  <h1 class="mb-4 text-2xl">Minedock</h1>

  <Suspense>
    <MinecraftDockerDashboard />

    <template #fallback>
      <SuspenseSkeleton />
    </template>
  </Suspense>
</template>
