<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { MinecraftDocker } from '@/types/minecraftDocker.ts';
import { getAllMinecraftDocker } from '@/services/minecraftDockerService.ts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { handleAxiosError } from '@/utils/axiosUtils.ts';
import type { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import { Plus, Pen, Trash, Rocket, StopCircle } from 'lucide-vue-next';
import TableVerticalDivider from '@/components/ui/table/TableVerticalDivider.vue';

const minecraftDockers = ref<MinecraftDocker[] | undefined>(undefined);
const selectedMinecraftDockerId = ref<number>(-1);
const selectedMinecraftDocker = computed(
  () =>
    minecraftDockers.value &&
    minecraftDockers.value.find(
      (minecraftDocker) => minecraftDocker.id === selectedMinecraftDockerId.value,
    ),
);

onMounted(async () => {
  try {
    minecraftDockers.value = await getAllMinecraftDocker();
  } catch (error) {
    handleAxiosError(error as AxiosError);
  }

  if (minecraftDockers.value && minecraftDockers.value.length > 0)
    selectedMinecraftDockerId.value = minecraftDockers.value[0].id;
});
</script>

<template>
  <h2 class="mb-4 text-2xl">Minecraft Dockers</h2>

  <section v-if="minecraftDockers" class="space-y-4">
    <div class="flex gap-3">
      <Select v-model="selectedMinecraftDockerId">
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

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button><Plus /></Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create Minecraft Docker</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button :disabled="!selectedMinecraftDocker"><Pen /></Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit Selected Minecraft Docker</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="destructive" :disabled="!selectedMinecraftDocker"><Trash /></Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete Selected Minecraft Docker</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>

    <Table v-if="selectedMinecraftDocker" class="border">
      <TableCaption>Selected Minecraft Docker information.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableVerticalDivider />
          <TableCell>
            {{ selectedMinecraftDocker.name }}
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHead>Memory</TableHead>
          <TableVerticalDivider />
          <TableCell>{{ selectedMinecraftDocker.memory }} GB</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <p v-else>Please select a minecraft docker to display its information.</p>
  </section>

  <p v-if="minecraftDockers && minecraftDockers.length === 0">
    You don't seem to have a minecraft docker. Please create one to display its information.
  </p>
</template>

<style scoped></style>
