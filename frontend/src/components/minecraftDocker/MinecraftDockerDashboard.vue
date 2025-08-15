<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Pen, Plus, Rocket } from 'lucide-vue-next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ConfirmDeleteDialog from '@/components/dialogs/ConfirmDeleteDialog.vue';
import { Button } from '@/components/ui/button';
import FormDialog from '@/components/dialogs/FormDialog.vue';
import MinecraftDockerTable from '@/components/minecraftDocker/MinecraftDockerTable.vue';
import CreateEditMinecraftDockerForm from '@/components/minecraftDocker/CreateEditMinecraftDockerForm.vue';
import { computed, onMounted, ref } from 'vue';
import type { MinecraftDocker } from '@/types/minecraftDocker.ts';
import { deleteMinecraftDocker, getAllMinecraftDocker } from '@/services/minecraftDockerService.ts';
import { handleAxiosError } from '@/utils/axiosUtils.ts';
import { toast } from 'vue-sonner';

const minecraftDockers = ref<MinecraftDocker[] | undefined>(undefined);
const selectedMinecraftDockerId = ref<number>(-1);
const selectedMinecraftDocker = computed(
  () =>
    minecraftDockers.value &&
    minecraftDockers.value.find(
      (minecraftDocker) => minecraftDocker.id === selectedMinecraftDockerId.value,
    ),
);

const minecraftDockerSelectKey = ref<number>(0);
const createDialog = ref<typeof FormDialog | null>(null);
const editDialog = ref<typeof FormDialog | null>(null);

try {
  minecraftDockers.value = await getAllMinecraftDocker();
} catch (error) {
  handleAxiosError(error);
}

onMounted(async () => {
  const atLeastOneMinecraftDocker = minecraftDockers.value && minecraftDockers.value.length > 0;
  if (atLeastOneMinecraftDocker) selectedMinecraftDockerId.value = minecraftDockers.value![0].id;
});

const onMinecraftDockerCreate = (newMinecraftDocker: MinecraftDocker) => {
  minecraftDockers.value
    ? minecraftDockers.value.push(newMinecraftDocker)
    : (minecraftDockers.value = [newMinecraftDocker]);

  createDialog.value!.open = false;
  toast.success('Minecraft Docker created with success');
};

const onMinecraftDockerUpdate = (
  updatedMinecraftDockerIndex: number,
  updatedMinecraftDocker: MinecraftDocker,
) => {
  minecraftDockers.value![updatedMinecraftDockerIndex] = updatedMinecraftDocker;

  editDialog.value!.open = false;
  minecraftDockerSelectKey.value++;
  toast.success('Minecraft Docker updated with success');
};

const onMinecraftDockerCreateOrUpdate = (minecraftDocker: MinecraftDocker) => {
  const updatedMinecraftDockerIndex = minecraftDockers.value?.findIndex(
    (md) => md.id === minecraftDocker.id,
  );
  const isUpdating =
    updatedMinecraftDockerIndex !== undefined && updatedMinecraftDockerIndex !== -1;

  if (isUpdating) {
    onMinecraftDockerUpdate(updatedMinecraftDockerIndex, minecraftDocker);
  } else {
    onMinecraftDockerCreate(minecraftDocker);
  }

  selectedMinecraftDockerId.value = minecraftDocker.id;
};

const deleteSelectedMinecraftDocker = async () => {
  if (!minecraftDockers.value || !selectedMinecraftDockerId.value) return;

  try {
    await deleteMinecraftDocker(selectedMinecraftDockerId.value);

    minecraftDockers.value = minecraftDockers.value.filter(
      (minecraftDocker) => minecraftDocker.id !== selectedMinecraftDockerId.value,
    );
    selectedMinecraftDockerId.value =
      minecraftDockers.value.length > 0 ? minecraftDockers.value[0].id : -1;

    toast.success('Minecraft Docker deleted with success');
  } catch (error) {
    handleAxiosError(error);
  }
};
</script>

<template>
  <section v-if="minecraftDockers" class="space-y-4">
    <div class="flex gap-3">
      <Select
        v-model="selectedMinecraftDockerId"
        :disabled="!minecraftDockers || minecraftDockers.length === 0"
        :key="minecraftDockerSelectKey"
      >
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Select a minecraft docker" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="minecraftDocker in minecraftDockers" :value="minecraftDocker.id">{{
            minecraftDocker.name
          }}</SelectItem>
        </SelectContent>
      </Select>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" :disabled="!selectedMinecraftDocker"><Rocket /></Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Start Minecraft Docker</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

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
        :description="`Are you sure you want to delete ${selectedMinecraftDocker?.name} Minecraft Docker?`"
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

  <p v-else>An unexpected error happened, please try again later.</p>
</template>
