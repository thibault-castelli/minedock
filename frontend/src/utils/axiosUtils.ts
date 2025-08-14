import type { AxiosError } from 'axios';
import { toast } from 'vue-sonner';

interface NestJsError {
  message: string;
  statusCode: number;
}

const handleAxiosError = (error: AxiosError) => {
  const nestJsError = error.response?.data as NestJsError;
  if (!nestJsError) {
    // Should never happen, but just in case
    console.error(`Status: ${error.status}\nMessage: ${error.message}`);
    toast.error(error.message);
  } else {
    console.error(`Status: ${nestJsError.statusCode}\nMessage: ${nestJsError.message}`);
    toast.error(nestJsError.message);
  }
};

export { handleAxiosError };
