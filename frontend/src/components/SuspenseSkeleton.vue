<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton';
</script>

<template>
  <div class="space-y-2">
    <Skeleton class="h-4 w-[50%]" />
    <Skeleton class="h-4 w-[40%]" />
    <Skeleton class="h-50 w-[80%]" />
    <Skeleton class="h-4 w-[50%]" />
    <Skeleton class="h-4 w-[70%]" />
  </div>
</template>
