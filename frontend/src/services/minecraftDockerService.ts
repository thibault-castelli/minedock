import type { MinecraftDocker } from '@/types/minecraftDocker.ts';
import { apiClient } from '@/utils/axiosUtils.ts';

const minecraftDockerEndpoint = '/minecraft-dockers';

const getAllMinecraftDocker = async () => {
  const allMinecraftDockers = await apiClient.get<MinecraftDocker[]>(minecraftDockerEndpoint);
  return allMinecraftDockers.data;
};

const createMinecraftDocker = async (body: MinecraftDocker) => {
  const createdMinecraftDocker = await apiClient.post<MinecraftDocker>(
    minecraftDockerEndpoint,
    body,
  );
  return createdMinecraftDocker.data;
};

const updateMinecraftDocker = async (id: number, body: MinecraftDocker) => {
  const updatedMinecraftDocker = await apiClient.put<MinecraftDocker>(
    minecraftDockerEndpoint + '/' + id.toString(),
    body,
  );
  return updatedMinecraftDocker.data;
};

const deleteMinecraftDocker = async (id: number) => {
  await apiClient.delete(minecraftDockerEndpoint + '/' + id.toString());
};

export {
  getAllMinecraftDocker,
  createMinecraftDocker,
  updateMinecraftDocker,
  deleteMinecraftDocker,
};
