<script setup lang="ts">
import { Pen, Plus } from 'lucide-vue-next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ConfirmDeleteDialog from '@/components/dialogs/ConfirmDeleteDialog.vue';
import FormDialog from '@/components/dialogs/FormDialog.vue';
import MinecraftDockerTable from '@/components/minecraftDocker/MinecraftDockerTable.vue';
import CreateEditMinecraftDockerForm from '@/components/minecraftDocker/CreateEditMinecraftDockerForm.vue';
import { computed, onMounted, ref } from 'vue';
import type { MinecraftDocker } from '@/types/minecraftDocker.ts';
import { deleteMinecraftDocker, getAllMinecraftDocker } from '@/services/minecraftDockerService.ts';
import { toast } from 'vue-sonner';
import StartStopMinecraftDockerButton from '@/components/minecraftDocker/StartStopMinecraftDockerButton.vue';

const minecraftDockers = ref<MinecraftDocker[]>([]);
const selectedMinecraftDockerId = ref<number>(-1);
const selectedMinecraftDocker = computed(() =>
  minecraftDockers.value.find(
    (minecraftDocker) => minecraftDocker.id === selectedMinecraftDockerId.value,
  ),
);

const minecraftDockerSelectKey = ref<number>(0);
const createDialog = ref<typeof FormDialog | null>(null);
const editDialog = ref<typeof FormDialog | null>(null);

minecraftDockers.value = await getAllMinecraftDocker();

onMounted(async () => {
  if (minecraftDockers.value.length > 0)
    selectedMinecraftDockerId.value = minecraftDockers.value![0].id;
});

const refreshMinecraftDockers = async () => {
  minecraftDockers.value = await getAllMinecraftDocker();
};

const onMinecraftDockerCreateOrUpdate = async (
  minecraftDocker: MinecraftDocker,
  isCreated: boolean,
) => {
  minecraftDockers.value = await getAllMinecraftDocker();
  selectedMinecraftDockerId.value = minecraftDocker.id;

  if (isCreated) {
    createDialog.value!.open = false;
    toast.success('Minecraft Docker created with success');
  } else {
    editDialog.value!.open = false;
    minecraftDockerSelectKey.value++;
    toast.success('Minecraft Docker updated with success');
  }
};

const deleteSelectedMinecraftDocker = async () => {
  if (selectedMinecraftDockerId.value <= 0) return;

  const deleteSuccess = await deleteMinecraftDocker(selectedMinecraftDockerId.value);
  if (!deleteSuccess) return;

  minecraftDockers.value = await getAllMinecraftDocker();
  selectedMinecraftDockerId.value =
    minecraftDockers.value.length > 0 ? minecraftDockers.value[0].id : -1;

  toast.success('Minecraft Docker deleted with success');
};
</script>

<template>
  <section class="space-y-4">
    <div class="flex gap-3">
      <Select
        v-model="selectedMinecraftDockerId"
        :disabled="minecraftDockers.length === 0"
        :key="minecraftDockerSelectKey"
      >
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Select a minecraft docker" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="minecraftDocker in minecraftDockers"
            :value="minecraftDocker.id"
            :key="minecraftDocker.id"
            >{{ minecraftDocker.name }}
          </SelectItem>
        </SelectContent>
      </Select>

      <StartStopMinecraftDockerButton
        :minecraft-docker-id="selectedMinecraftDockerId"
        :is-minecraft-docker-running="selectedMinecraftDocker?.isRunning"
        :minecraft-dockers="minecraftDockers"
        @on-minecraft-docker-start-or-stop="refreshMinecraftDockers"
      />

      <FormDialog
        title="Create Minecraft Docker"
        description="Create your Minecraft Docker to fit your needs"
        tooltip="Create Minecraft Docker"
        ref="createDialog"
      >
        <template v-slot:button-icon><Plus /></template>
        <template v-slot:form>
          <CreateEditMinecraftDockerForm
            :minecraft-docker="undefined"
            @on-submit-success="onMinecraftDockerCreateOrUpdate"
          />
        </template>
      </FormDialog>

      <FormDialog
        title="Edit Minecraft Docker"
        description="Edit your Minecraft Docker to fit your needs"
        tooltip="Edit Minecraft Docker"
        ref="editDialog"
        :disabled="!selectedMinecraftDocker || minecraftDockers.length < 1"
      >
        <template #button-icon><Pen /></template>
        <template #form>
          <CreateEditMinecraftDockerForm
            :minecraft-docker="selectedMinecraftDocker"
            @on-submit-success="onMinecraftDockerCreateOrUpdate"
          />
        </template>
      </FormDialog>

      <ConfirmDeleteDialog
        title="Delete Minecraft Docker"
        :description="`Are you sure you want to delete '${selectedMinecraftDocker?.name}' Minecraft Docker?`"
        tooltip="Delete Selected Minecraft Docker"
        :is-button-disabled="!selectedMinecraftDocker || minecraftDockers.length < 1"
        @on-delete="deleteSelectedMinecraftDocker"
      />
    </div>

    <MinecraftDockerTable :selected-minecraft-docker="selectedMinecraftDocker" />

    <p v-if="minecraftDockers.length === 0" class="mt-3 italic">
      You don't seem to have a minecraft docker. Please create one to display its information.
    </p>
  </section>
</template>
