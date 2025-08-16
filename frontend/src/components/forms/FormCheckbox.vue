<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface Props {
  inputName: string;
  label: string;
  description?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <FormField v-slot="{ value, handleChange }" type="checkbox" :name="props.inputName">
    <FormItem class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4 shadow">
      <FormControl>
        <Checkbox :model-value="value" @update:model-value="handleChange" />
      </FormControl>
      <div class="space-y-1 leading-none">
        <FormLabel>{{ props.label }}</FormLabel>
        <FormDescription>{{ props.description }}</FormDescription>
        <FormMessage />
      </div>
    </FormItem>
  </FormField>
</template>
