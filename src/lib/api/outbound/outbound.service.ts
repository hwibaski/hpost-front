import type { ApiResponse } from '@/lib/api/types';
import { apiClient } from '../fetchClient';

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
  price: number;
  weight: number;
  etc: string;
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
  number: string;
  createdAt: string;
  channel: string;
}

export interface PaginationResult<T> {
  items: T[];
  totalCount: number;
  totalPages: number;
  page: number;
}

export interface QuickOrderListResponse {
  result: PlaceQuickOutboundBundleResponse[];
  totalCount: number;
  totalPages: number;
  page: number;
}

export interface QuickOrderDetailResponse {
  readonly id: string;
  readonly channel: string;
  readonly number: string;
  readonly createdAt: Date;
  readonly quickOutboundPackages: {
    id: string;
    number: string;
    origin: {
      name: string;
      phoneNumber: string;
    };
    destination: {
      name: string;
      phoneNumber: string;
    };
  }[];
}

class OutboundService {
  async createQuickOrder(
    data: PlaceQuickOutboundBundleRequest
  ): Promise<ApiResponse<PlaceQuickOutboundBundleResponse>> {
    return apiClient.post('/outbound-bundles', data);
  }

  async getQuickOrderList(
    limit: number = 10,
    offset: number = 0
  ): Promise<ApiResponse<QuickOrderListResponse>> {
    return apiClient.get(
      `/outbound-bundles?limit=${limit}&offset=${offset}&sortKey=createdAt&sort=DESC`
    );
  }

  async getQuickOrderDetail(id: string): Promise<ApiResponse<QuickOrderDetailResponse>> {
    return apiClient.get(`/outbound-bundles/${id}`);
  }
}

export const outboundService = new OutboundService();
