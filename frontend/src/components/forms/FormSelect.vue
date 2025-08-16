<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
  inputName: string;
  label: string;
  placeholder?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <FormField v-slot="{ componentField }" :name="props.inputName">
    <FormItem>
      <FormLabel>{{ props.label }}</FormLabel>
      <Select v-bind="componentField">
        <FormControl>
          <SelectTrigger class="w-full">
            <SelectValue :placeholder="props.placeholder" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <slot name="select-items"></slot>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
