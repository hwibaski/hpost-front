import type { ApiResponse } from '@/lib/api/types';
import { apiClient } from './client';

export interface Location {
  name: string;
  detailAddress: string;
  phoneNumber: string;
  roadAddress: string;
  jibunAddress: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

export interface Item {
  document: number;
  smallBox: number;
  bigBox: number;
  etc?: string;
  price: number;
  weight: number;
}

export interface PlaceQuickOutboundPackageRequestDto {
  origin: Location;
  destination: Location;
  item: Item;
  vehicleOption: string;
  clientRequestComment: string;
}

export interface PlaceQuickOutboundBundleRequest {
  packagesToOrder: PlaceQuickOutboundPackageRequestDto[];
}

export interface PlaceQuickOutboundBundleResponse {
  id: string;
}

export interface PaginationResult<T> {
  totalPages: number;
  totalCount: number;
  result: T[];
  page: number;
}

export interface QuickOrderListResponse {
  id: string;
  status: string;
  createdAt: string;
  channel: string;
  number: string;
}

class OutboundService {
  private readonly BASE_URL = '/api/v1/outbound-bundles';

  async createQuickOrder(data: PlaceQuickOutboundBundleRequest) {
    const response = await apiClient.post<
      PlaceQuickOutboundBundleRequest,
      ApiResponse<PlaceQuickOutboundBundleResponse>
    >(`${this.BASE_URL}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response.data;
  }

  async getQuickOrderList(limit: number = 10, offset: number = 0) {
    const response = await apiClient.get<ApiResponse<PaginationResult<QuickOrderListResponse>>>(
      `${this.BASE_URL}?limit=${limit}&offset=${offset}&sortKey=createdAt&sort=DESC`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    return response.data;
  }
}

export const outboundService = new OutboundService();
