import type { ReviewsResponse } from "../types/types";
import apiClient from "./apiClient";

const getReviews = async (): Promise<ReviewsResponse> => {
    const res = await apiClient.get<ReviewsResponse>("/reviews");
    return res.data;
};

export default {
    getReviews
}