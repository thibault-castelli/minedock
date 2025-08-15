<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { MinecraftDocker } from '@/types/minecraftDocker.ts';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createMinecraftDocker, updateMinecraftDocker } from '@/services/minecraftDockerService.ts';

interface Props {
  minecraftDocker: MinecraftDocker | undefined;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onSubmitSuccess: [minecraftDocker: MinecraftDocker, isCreated: boolean];
}>();

const isCreationMode = props.minecraftDocker === undefined;

const createDefaultMinecraftDocker = (): MinecraftDocker => {
  return {
    id: 0,
    name: 'Default Minecraft Docker',
    isRunning: false,
    memory: 4,
  };
};

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(3).max(255),
    memory: z.number().int().min(1).max(16),
  }),
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: isCreationMode ? createDefaultMinecraftDocker() : { ...props.minecraftDocker },
});

const onSubmit = form.handleSubmit(async (values) => {
  if (isCreationMode) {
    const createdMinecraftDocker = await createMinecraftDocker(values as MinecraftDocker);
    if (!createdMinecraftDocker) return;

    emit('onSubmitSuccess', createdMinecraftDocker, isCreationMode);
  } else {
    const updatedMinecraftDocker = await updateMinecraftDocker(
      props.minecraftDocker.id,
      values as MinecraftDocker,
    );
    if (!updatedMinecraftDocker) return;

    emit('onSubmitSuccess', updatedMinecraftDocker, isCreationMode);
  }
});
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="My Minecraft Docker" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="memory">
      <FormItem>
        <FormLabel>Memory (GB)</FormLabel>
        <FormControl>
          <Input type="number" placeholder="4" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit"> Submit </Button>
  </form>
</template>
