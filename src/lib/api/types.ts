// src/lib/api/types.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  code: string;
  errors: string[];
  status: number;
}
