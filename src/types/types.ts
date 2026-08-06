import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRedirect?: boolean;
  }
}

export interface Comment {
  comment_id: number;
  content: string;
  created_at: string;
  username: string;
}

export interface Review {
  review_id: number;
  title: string;
  score: number;
  cover_image_url: string;
  published: boolean;
  created_at: string;
  demographic: string;
  media_type: string;
  genres: string[];
}

export interface ReviewDetail extends Review {
  body: string;
  updated_at: string;
}

export interface ReviewsResponse {
  count: number;
  reviews: Review[];
}

export interface ReviewDetailResponse {
  review: ReviewDetail;
  comments: Comment[];
}