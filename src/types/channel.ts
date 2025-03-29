// _id
// 67d01499a51ce6aae2ec3d2b
// name
// "ghaybour"
// description
// "ibrhim"
// icon
// "67cb03bc9ad08caa81934b9a"
// created_at
// 2025-03-11T10:46:49.733+00:00
// updated_at
// 2025-03-11T10:46:49.733+00:00
// Channel status types
// Sort direction type

// Role interface

// Channel interface
export interface Channel {
  _id: string;
  name: string;
  description: string;
  icon?: string;
  userId: string;
  created_at: string;
  updated_at: string;
}

// Pagination interface
export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// Paginated response interface
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// channel filters interface
export interface ChannelFilters {
  page?: number;
  pageSize?: number;
  name?: string;
  description?: string;
}

// Create user request interface
export interface CreateChannelRequest {
  name: string;
  description: string;
  icon?: string;
  idUser: string;
}

// Update channel request interface
export interface UpdateChannelRequest {
  name?: string;
  description?: string;
  icon?: string;
}
