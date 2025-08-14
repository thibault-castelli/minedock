<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';
import 'vue-sonner/style.css';
</script>

<template>
  <Toaster rich-colors close-button />

  <main class="container mx-auto p-4 max-w-[1200px]">
    <RouterView />
  </main>
</template>
