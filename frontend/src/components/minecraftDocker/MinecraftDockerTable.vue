<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import TableVerticalDivider from '@/components/ui/table/TableVerticalDivider.vue';
import type { MinecraftDocker } from '@/types/minecraftDocker.ts';

interface Props {
  selectedMinecraftDocker: MinecraftDocker | undefined;
}

const props = defineProps<Props>();
</script>

<template>
  <Table v-if="props.selectedMinecraftDocker" class="border">
    <TableCaption>Selected Minecraft Docker information.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableVerticalDivider />
        <TableCell>
          {{ props.selectedMinecraftDocker.name }}
        </TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableHead>Memory</TableHead>
        <TableVerticalDivider />
        <TableCell>{{ props.selectedMinecraftDocker.memory }} GB</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
