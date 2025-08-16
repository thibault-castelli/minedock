<script setup lang="ts">
import type { MinecraftDocker } from '@/types/minecraftDocker.ts';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { createMinecraftDocker, updateMinecraftDocker } from '@/services/minecraftDockerService.ts';
import { SelectItem } from '@/components/ui/select';
import { capitalizeFirstLetter } from '@/utils/stringUtils.ts';
import FormInput from '@/components/forms/FormInput.vue';
import FormCheckbox from '@/components/forms/FormCheckbox.vue';
import FormSelect from '@/components/forms/FormSelect.vue';

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
    difficulty: 'normal',
    mode: 'survival',
    maxPlayers: 20,
    hardcore: false,
    spawnAnimals: true,
    spawnMonsters: true,
    spawnNpcs: true,
    pvp: true,
  };
};

const difficultyTypes = ['peaceful', 'easy', 'normal', 'hard'] as const;
const modeTypes = ['survival', 'creative'] as const;
const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(3).max(255),
    memory: z.number().int().min(1).max(16),
    difficulty: z.enum(difficultyTypes),
    mode: z.enum(modeTypes),
    maxPlayers: z.number().int().min(1).max(40),
    hardcore: z.boolean(),
    spawnAnimals: z.boolean(),
    spawnMonsters: z.boolean(),
    spawnNpcs: z.boolean(),
    pvp: z.boolean(),
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
    <FormInput input-name="name" input-type="text" label="Name" placeholder="My Minecraft Docker" />

    <FormInput input-name="memory" input-type="number" label="Memory (GB)" placeholder="4" />

    <FormSelect input-name="difficulty" label="Difficulty" placeholder="Select a difficulty">
      <template #select-items>
        <SelectItem v-for="difficulty in difficultyTypes" :value="difficulty" :key="difficulty"
          >{{ capitalizeFirstLetter(difficulty) }}
        </SelectItem>
      </template>
    </FormSelect>

    <FormSelect input-name="mode" label="Mode" placeholder="Select a mode">
      <template #select-items>
        <SelectItem v-for="mode in modeTypes" :value="mode" :key="mode"
          >{{ capitalizeFirstLetter(mode) }}
        </SelectItem>
      </template>
    </FormSelect>

    <FormInput
      input-name="maxPlayers"
      input-type="number"
      label="Maximum Players"
      placeholder="20"
    />

    <FormCheckbox
      input-name="hardcore"
      label="Hardcore"
      description="If set to true, players will be set to spectator mode if they die."
    />

    <FormCheckbox input-name="spawnAnimals" label="Spawn Animals" />

    <FormCheckbox input-name="spawnMonsters" label="Spawn Monsters" />

    <FormCheckbox input-name="spawnNpcs" label="Spawn NPCs" />

    <FormCheckbox input-name="pvp" label="PvP" description="Player-vs-Player" />

    <Button type="submit" class="w-full"> Submit </Button>
  </form>
</template>
