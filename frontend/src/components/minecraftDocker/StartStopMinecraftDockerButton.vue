<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Rocket, Square } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { isDockerRunning } from '@/services/dockerService.ts';
import {
  buildAndRunMinecraftDocker,
  stopMinecraftDocker,
} from '@/services/minecraftDockerService.ts';
import { handleAxiosError } from '@/utils/axiosUtils.ts';

interface Props {
  minecraftDockerId: number | undefined;
  isMinecraftDockerRunning: boolean | undefined;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  updateMinecraftDockerRunningStatus: [isRunning: boolean];
}>();

const buildAndRunSelectedMinecraftDocker = async () => {
  if (!props.minecraftDockerId) {
    toast.warning('Please select a Minecraft Docker');
    return;
  }

  toast.info('Starting Minecraft Docker...');

  try {
    const canStartMinecraftDocker = await isDockerRunning();
    if (!canStartMinecraftDocker) {
      toast.warning('Please start Docker before starting your Minecraft Docker');
      return;
    }
    const success = await buildAndRunMinecraftDocker(props.minecraftDockerId);
    if (success) {
      emit('updateMinecraftDockerRunningStatus', true);
      toast.success('Minecraft Docker started successfully');
    }
  } catch (error) {
    handleAxiosError(error);
  }
};

const stopSelectedMinecraftDocker = async () => {
  if (!props.minecraftDockerId) {
    toast.warning('Please select a Minecraft Docker');
    return;
  }

  toast.info('Stopping Minecraft Docker...');

  try {
    const success = await stopMinecraftDocker(props.minecraftDockerId);
    if (success) {
      emit('updateMinecraftDockerRunningStatus', false);
      toast.success('Minecraft Docker stopped successfully');
    }
  } catch (error) {
    handleAxiosError(error);
  }
};
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant="outline"
          :disabled="!props.minecraftDockerId"
          @click="
            () =>
              props.isMinecraftDockerRunning
                ? stopSelectedMinecraftDocker()
                : buildAndRunSelectedMinecraftDocker()
          "
        >
          <Square v-if="props.isMinecraftDockerRunning" />
          <Rocket v-else />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p v-if="props.isMinecraftDockerRunning">Stop Minecraft Docker</p>
        <p v-else>Start Minecraft Docker</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
