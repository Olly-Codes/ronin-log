import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Markdown from "react-markdown";
import reviewsAPI from "../api/reviewsAPI";
import commentsAPI from "../api/commentsAPI";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-hot-toast";


const ReviewDetailsPage = () => {

    const { user } = useAuth();

    const { id } = useParams();
    const reviewId = id ? parseInt(id) : undefined;
    const queryClient = useQueryClient();
    const [commentContent, setCommentContent] = useState("");

    const reviewQuery = useQuery({
        queryKey: ["review", id],
        queryFn: () => reviewsAPI.getReviewById(reviewId!),
        enabled: reviewId !== undefined
    });

    const postCommentMutation = useMutation({
        mutationFn: (content: string) => commentsAPI.postCreateComment(reviewId!, content),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["review", id] });
            setCommentContent("");
        }
    });

    const handleCommentSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!commentContent.trim()) return;
        if (!user) return toast.error("Sign in to make comments");
        postCommentMutation.mutate(commentContent);
    };

    if (!id) return <p>Review not found</p>
    if (reviewQuery.isLoading) return <p>Loading Review...</p>

    return (
        <main>
            {reviewQuery.data ? 
            (
                <>
                <section>
                    {reviewQuery.data.review.cover_image_url ? (
                        <img 
                            src={reviewQuery.data.review.cover_image_url}
                            alt={reviewQuery.data.review.title}
                        />
                    ) : (
                        <div>
                            No image
                        </div>
                    )}
                </section>

                <section>
                    <div>
                        <p>
                            {reviewQuery.data.review.media_type} &bull; {reviewQuery.data.review.demographic}
                        </p>
                        <h1>{reviewQuery.data.review.title}</h1>
                        <p>Reviewed on {reviewQuery.data.review.created_at}</p>

                        <div>
                            <Markdown>{reviewQuery.data.review.body}</Markdown>
                        </div>

                        <div>
                            <p>Leave a comment</p>
                            <form onSubmit={handleCommentSubmit}>
                                <textarea 
                                    value={commentContent}
                                    onChange={(e) => setCommentContent(e.target.value)}
                                    placeholder="Type a comment here..."
                                    disabled={postCommentMutation.isPending}
                                />
                                <button
                                    type="submit"
                                    disabled={postCommentMutation.isPending || !commentContent.trim()}
                                >
                                    {postCommentMutation.isPending ? "Posting..." : "Post Comment"}
                                </button>
                                {postCommentMutation.isError && (
                                    <p>Could not post comment. Please try again</p>
                                )}
                            </form>
                        </div>

                        <div>
                            <h2>Comments ({reviewQuery.data.comments.length})</h2>
                            {reviewQuery.data.comments.length > 0 ? (
                                <ul>
                                    {reviewQuery.data.comments.map((comment) => (
                                        <li key={comment.comment_id}>
                                            <div>
                                                <p>{comment.content}</p>
                                                <p>made by {comment.username} on {comment.created_at}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No comments yet</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <div>
                            <h3>Score</h3>
                            <p>{reviewQuery.data.review.score}</p>
                        </div>

                        <div>
                            <h3>Genre</h3>
                            <div>
                                {reviewQuery.data.review.genres.map((genre) => (
                                    <span key={genre}>
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                </>
            ) : (
                <p>Could not load review</p>
            )}
        </main>
    );
};

export default ReviewDetailsPage;