import axios from 'axios';
import type { MinecraftDocker } from '@/types/minecraftDocker.ts';

const baseApiUrl = 'http://localhost:3057/minecraft-dockers';

const getAllMinecraftDocker = async () => {
  const allMinecraftDockers = await axios.get<MinecraftDocker[]>(baseApiUrl);
  return allMinecraftDockers.data;
};

export { getAllMinecraftDocker };
