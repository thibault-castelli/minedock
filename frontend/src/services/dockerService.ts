import { apiClient } from '@/utils/axiosUtils.ts';

const dockerEndpoint = '/docker';

const isDockerRunning = async () => {
  const response = await apiClient.get<{ isRunning: boolean }>(dockerEndpoint + '/status');
  return response.data.isRunning;
};

export { isDockerRunning };
