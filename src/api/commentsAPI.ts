import type { CommentsCreateResponse } from "../types/types";
import apiClient from "./apiClient";

const postCreateComment = async (
    reviewId: number, 
    content: string
): Promise<CommentsCreateResponse> => {
    const res = await apiClient.post<CommentsCreateResponse>(
        `/reviews/${reviewId}/comments`, 
        { content }
    );
    return res.data;
};

export default {
    postCreateComment
}