import axios, { AxiosError } from 'axios';
import { toast } from 'vue-sonner';

class NestJsError {
  message: string;
  statusCode: number;
  error: string;
}

const apiClient = axios.create({
  baseURL: 'http://localhost:3057',
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleAxiosError = (error: any) => {
  let nestJsError;
  if (error instanceof AxiosError) {
    nestJsError = error.response?.data as NestJsError;
  } else if (error instanceof NestJsError) {
    nestJsError = error as NestJsError;
  } else {
    console.error(`Unexpected error type: ${error}`);
    return;
  }

  console.error(
    `Status: ${nestJsError.statusCode}\nMessage: ${nestJsError.message}\nError: ${nestJsError.error}`,
  );
  toast.error(Array.isArray(nestJsError.message) ? nestJsError.error : nestJsError.message);
};

export { apiClient, handleAxiosError };
