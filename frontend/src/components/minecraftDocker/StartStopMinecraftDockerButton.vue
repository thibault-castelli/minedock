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

interface Props {
  minecraftDockerId: number;
  isMinecraftDockerRunning: boolean | undefined;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  onMinecraftDockerStartOrStop: [];
}>();

const buildAndRunSelectedMinecraftDocker = async () => {
  if (props.minecraftDockerId <= 0) {
    toast.warning('Please select a Minecraft Docker');
    return;
  }

  toast.info('Starting Minecraft Docker...');

  const canStartMinecraftDocker = await isDockerRunning();
  if (!canStartMinecraftDocker) {
    toast.warning('Please start Docker before starting your Minecraft Docker');
    return;
  }

  const buildSuccess = await buildAndRunMinecraftDocker(props.minecraftDockerId);
  if (buildSuccess) {
    emit('onMinecraftDockerStartOrStop');
    toast.success('Minecraft Docker started successfully');
  }
};

const stopSelectedMinecraftDocker = async () => {
  if (props.minecraftDockerId <= 0) {
    toast.warning('Please select a Minecraft Docker');
    return;
  }

  toast.info('Stopping Minecraft Docker...');

  const stopSuccess = await stopMinecraftDocker(props.minecraftDockerId);
  if (stopSuccess) {
    emit('onMinecraftDockerStartOrStop');
    toast.success('Minecraft Docker stopped successfully');
  }
};
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant="outline"
          :disabled="props.minecraftDockerId <= 0"
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
