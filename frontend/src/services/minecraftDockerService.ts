import type { MinecraftDocker } from '@/types/minecraftDocker.ts';
import { apiClient, handleAxiosError } from '@/utils/axiosUtils.ts';

const minecraftDockerEndpoint = '/minecraft-dockers';

const getAllMinecraftDocker = async (): Promise<MinecraftDocker[]> => {
  try {
    const allMinecraftDockers = await apiClient.get<MinecraftDocker[]>(minecraftDockerEndpoint);
    return allMinecraftDockers.data;
  } catch (error) {
    handleAxiosError(error);
    return [];
  }
};

const createMinecraftDocker = async (
  body: MinecraftDocker,
): Promise<MinecraftDocker | undefined> => {
  try {
    const createdMinecraftDocker = await apiClient.post<MinecraftDocker>(
      minecraftDockerEndpoint,
      body,
    );
    return createdMinecraftDocker.data;
  } catch (error) {
    handleAxiosError(error);
    return undefined;
  }
};

const updateMinecraftDocker = async (
  id: number,
  body: MinecraftDocker,
): Promise<MinecraftDocker | undefined> => {
  try {
    const updatedMinecraftDocker = await apiClient.put<MinecraftDocker>(
      minecraftDockerEndpoint + '/' + id.toString(),
      body,
    );
    return updatedMinecraftDocker.data;
  } catch (error) {
    handleAxiosError(error);
    return undefined;
  }
};

const deleteMinecraftDocker = async (id: number): Promise<boolean> => {
  try {
    await apiClient.delete(minecraftDockerEndpoint + '/' + id.toString());
    return true;
  } catch (error) {
    handleAxiosError(error);
    return false;
  }
};

const buildAndRunMinecraftDocker = async (id: number): Promise<boolean> => {
  try {
    await apiClient.post<{ success: boolean }>(
      minecraftDockerEndpoint + '/build-and-run/' + id.toString(),
    );
    return true;
  } catch (error) {
    handleAxiosError(error);
    return false;
  }
};

const stopMinecraftDocker = async (id: number): Promise<boolean> => {
  try {
    const response = await apiClient.post<{ success: boolean }>(
      minecraftDockerEndpoint + '/stop/' + id.toString(),
    );
    return response.data.success;
  } catch (error) {
    handleAxiosError(error);
    return false;
  }
};

export {
  getAllMinecraftDocker,
  createMinecraftDocker,
  updateMinecraftDocker,
  deleteMinecraftDocker,
  buildAndRunMinecraftDocker,
  stopMinecraftDocker,
};
