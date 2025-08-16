<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { ref } from 'vue';

interface Props {
  title: string;
  description: string;
  tooltip: string;
  disabled?: boolean;
}

const props = defineProps<Props>();

const open = ref<boolean>(false);

defineExpose({ open });
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Dialog v-model:open="open">
          <DialogTrigger as-child>
            <Button :disabled="props.disabled"><slot name="button-icon"></slot></Button>
          </DialogTrigger>
          <DialogContent class="grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
            <DialogHeader class="p-6 pb-0">
              <DialogTitle>{{ props.title }}</DialogTitle>
              <DialogDescription>{{ props.description }}</DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4 overflow-y-auto px-6">
              <div class="flex flex-col justify-between">
                <slot name="form"></slot>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ props.tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
