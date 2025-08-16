<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';
import 'vue-sonner/style.css';
import { Github } from 'lucide-vue-next';
</script>

<template>
  <Toaster rich-colors close-button />

  <main class="container mx-auto p-4 max-w-[1200px] min-h-[90vh]">
    <RouterView />
  </main>

  <footer class="flex items-center justify-end gap-3 border-t py-3 px-6">
    <p>
      Made by
      <a href="https://www.linkedin.com/in/thibault-castelli/" target="_blank" class="underline"
        >Thibault Castelli</a
      >
      (codeintheshell)
    </p>
    <a href="https://github.com/thibault-castelli/minedock" target="_blank" class="cursor-pointer"
      ><Github
    /></a>
  </footer>
</template>
