// "_id": "67d9db6bd67da4072fa5bc67",
// "title": "java",
// "htmlText": "<h1>nest</h2>",
// "groupId": "67d01499a51ce6aae2ec3d2b",
// "userId": "67d15b7e3522cf20c9305622",
// "created_at": "2025-03-18T20:45:31.935Z",
// "updated_at": "2025-03-18T20:45:31.935Z"

// Sort direction type


// Role interface

// Blogs interface
export interface Blog {
  _id: string;
  title: string;
  htmlText: string;
  groupId: string;
  userId: string;
  avtar: string;
  userName: string;
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
  pagination: Pagination;
}

// Blogs filters interface
export interface BlogFilters {
  page?: number;
  pageSize?: number;
  title?: string;
  htmlText?: string;
}

// Create user request interface
export interface CreateBlogRequest {
  title: string;
  htmlText: string;
  groupId: string;
  userId: string;
  avtar?: string;
  userName: string;
}

// Update Blogs request interface
export interface UpdateBlogRequest {
  title?: string;
  htmlText?: string;
  avtar?: string;
}
