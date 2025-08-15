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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{{ props.title }}</DialogTitle>
              <DialogDescription>{{ props.description }}</DialogDescription>
            </DialogHeader>
            <slot name="form"></slot>
          </DialogContent>
        </Dialog>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ props.tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
