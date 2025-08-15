<script setup lang="ts">
import MinecraftDockerDashboard from '@/components/minecraftDocker/MinecraftDockerDashboard.vue';
import SuspenseSkeleton from '@/components/SuspenseSkeleton.vue';
</script>

<template>
  <h2 class="mb-4 text-2xl">Minecraft Dockers</h2>

  <Suspense>
    <MinecraftDockerDashboard />

    <template #fallback>
      <SuspenseSkeleton />
    </template>
  </Suspense>
</template>
