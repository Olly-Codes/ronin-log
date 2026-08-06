import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRedirect?: boolean;
  }
}

export interface Review {
  review_id: number;
  title: string;
  score: number;
  cover_img_url: string;
  published: boolean;
  created_at: string;
  demographic: string;
  media_type: string;
  genres: string[];
}

export interface ReviewsResponse {
  count: number;
  reviews: Review[];
}