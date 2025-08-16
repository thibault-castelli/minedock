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
import { booleanToString, capitalizeFirstLetter } from '@/utils/stringUtils.ts';

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

      <TableRow>
        <TableHead>Difficulty</TableHead>
        <TableVerticalDivider />
        <TableCell>{{ capitalizeFirstLetter(props.selectedMinecraftDocker.difficulty) }}</TableCell>
      </TableRow>

      <TableRow>
        <TableHead>Mode</TableHead>
        <TableVerticalDivider />
        <TableCell>{{ capitalizeFirstLetter(props.selectedMinecraftDocker.mode) }}</TableCell>
      </TableRow>

      <TableRow>
        <TableHead>Maximum Players</TableHead>
        <TableVerticalDivider />
        <TableCell>{{ props.selectedMinecraftDocker.maxPlayers }}</TableCell>
      </TableRow>

      <TableRow>
        <TableHead>Hardcore</TableHead>
        <TableVerticalDivider />
        <TableCell>{{ booleanToString(props.selectedMinecraftDocker.hardcore) }}</TableCell>
      </TableRow>

      <TableRow>
        <TableHead>Spawn Animals</TableHead>
        <TableVerticalDivider />
        <TableCell>{{ booleanToString(props.selectedMinecraftDocker.spawnAnimals) }}</TableCell>
      </TableRow>

      <TableRow>
        <TableHead>Spawn Monsters</TableHead>
        <TableVerticalDivider />
        <TableCell>{{ booleanToString(props.selectedMinecraftDocker.spawnMonsters) }}</TableCell>
      </TableRow>

      <TableRow>
        <TableHead>Spawn NPCs</TableHead>
        <TableVerticalDivider />
        <TableCell>{{ booleanToString(props.selectedMinecraftDocker.spawnNpcs) }}</TableCell>
      </TableRow>

      <TableRow>
        <TableHead>PvP</TableHead>
        <TableVerticalDivider />
        <TableCell>{{ booleanToString(props.selectedMinecraftDocker.pvp) }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
