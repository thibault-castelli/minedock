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

const buildAndRunMinecraftDocker = async (id: number) => {
  const response = await apiClient.post<{ success: boolean }>(
    minecraftDockerEndpoint + '/build-and-run/' + id.toString(),
  );
  return response.data.success;
};

const stopMinecraftDocker = async (id: number) => {
  const response = await apiClient.post<{ success: boolean }>(
    minecraftDockerEndpoint + '/stop/' + id.toString(),
  );
  return response.data.success;
};

export {
  getAllMinecraftDocker,
  createMinecraftDocker,
  updateMinecraftDocker,
  deleteMinecraftDocker,
  buildAndRunMinecraftDocker,
  stopMinecraftDocker,
};
