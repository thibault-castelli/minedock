<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface Props {
  inputName: string;
  inputType: 'text' | 'number' | 'email' | 'password';
  label: string;
  placeholder?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <FormField v-slot="{ componentField }" :name="props.inputName">
    <FormItem>
      <FormLabel>{{ props.label }}</FormLabel>
      <FormControl>
        <Input :type="props.inputType" :placeholder="props.placeholder" v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
