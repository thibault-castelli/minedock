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
import { Trash } from 'lucide-vue-next';
import { ref } from 'vue';

interface Props {
  title: string;
  description: string;
  tooltip: string;
  isButtonDisabled: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onDelete: [];
}>();

const open = ref<boolean>(false);

const onDelete = () => {
  open.value = false;
  emit('onDelete');
};
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Dialog v-model:open="open">
          <DialogTrigger as-child>
            <Button variant="destructive" :disabled="props.isButtonDisabled"><Trash /></Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{{ props.title }}</DialogTitle>
              <DialogDescription>{{ props.description }}</DialogDescription>
            </DialogHeader>
            <form>
              <Button variant="destructive" type="submit" @click.prevent="onDelete">Delete</Button>
            </form>
          </DialogContent>
        </Dialog>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ props.tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
