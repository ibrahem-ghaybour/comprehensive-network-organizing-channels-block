// @IsNotEmpty()
// @IsString()
// text: string;

// @IsNotEmpty()
// @IsString()
// blogId: string;

// @IsNotEmpty()
// @IsString()
// userId: string;

// @IsNotEmpty()
// @IsString()
// userName: string;

// @IsNotEmpty()
// @IsString()
// avatar?: string;
// }
export interface Comment {
  _id: string;
  text: string;
  userId: string;
  blogId: string;
  userName: string;
  avtar?: string;
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
export interface CommentlFilters {
  page?: number;
  pageSize?: number;
  text?: string;
  userName?: string;
}

// Create user request interface
export interface CreateCommentlRequest {
  text: string;
  userId: string;
  blogId: string;
  userName: string;
  avtar?: string;
}

// Update Commentl request interface
export interface UpdateCommentlRequest {
    text?: string;
    userName?: string;
}
