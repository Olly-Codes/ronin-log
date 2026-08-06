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
        <main className="p-8">
            {reviewQuery.data ? 
            (
                <>
                <section className="aspect-[21/9] bg-surface-hover overflow-hidden mb-4 text-primary">
                    {reviewQuery.data.review.cover_image_url ? (
                        <img 
                            src={reviewQuery.data.review.cover_image_url}
                            alt={reviewQuery.data.review.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-surface-hover flex items-center justify-center">
                            No image
                        </div>
                    )}
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)] gap-4">
                    <div className="order-3 lg:order-1 bg-surface border border-border p-4">
                        <p className="text-sm text-muted mb-1">
                            {reviewQuery.data.review.media_type} &bull; {reviewQuery.data.review.demographic}
                        </p>
                        <h1 className="text-2xl font-bold text-primary">{reviewQuery.data.review.title}</h1>
                        <p className="text-sm text-muted mt-1 mb-4">Reviewed on {reviewQuery.data.review.created_at}</p>

                        <div className="text-primary">
                            <Markdown>{reviewQuery.data.review.body}</Markdown>
                        </div>

                        <div className="mt-8 pt-4 border-t border-gray-200">
                            <p className="text-lg font-semibold text-primary mb-4">Leave a comment</p>
                            <form 
                                onSubmit={handleCommentSubmit}
                                className="flex items center flex-col"
                            >
                                {postCommentMutation.isError && (
                                    <p className="text-accent mb-2">Could not post comment. Please try again</p>
                                )}
                                <textarea 
                                    value={commentContent}
                                    onChange={(e) => setCommentContent(e.target.value)}
                                    placeholder="Type a comment here..."
                                    disabled={postCommentMutation.isPending}
                                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent mb-4"
                                />
                                <button
                                    type="submit"
                                    disabled={postCommentMutation.isPending || !commentContent.trim()}
                                    className="text-primary px-2 cursor-pointer bg-red-600 py-2 hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 mb-4 self-end"
                                >
                                    {postCommentMutation.isPending ? "Posting..." : "Post Comment"}
                                </button>
                            </form>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-primary mb-2">Comments ({reviewQuery.data.comments.length})</h2>
                            {reviewQuery.data.comments.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {reviewQuery.data.comments.map((comment) => (
                                        <li 
                                            key={comment.comment_id}
                                            className="py-3 flex items-start justify-between"
                                        >
                                            <div>
                                                <p className="text-sm text-primary">{comment.content}</p>
                                                <p className="text-sm text-muted">made by {comment.username} on {comment.created_at}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted text-sm">No comments yet</p>
                            )}
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 flex flex-col gap-4">
                        <div className="bg-surface border border-border p-4">
                            <h3 className="text-sm text-muted mb-1">Score</h3>
                            <p className="text-2xl font-bold text-primary">{reviewQuery.data.review.score}</p>
                        </div>

                        <div className="order-2 lg:order-3 bg-surface border border-border p-4">
                            <h3 className="text-sm text-muted mb-2">Genres</h3>
                            <div  className="flex flex-wrap gap-2">
                                {reviewQuery.data.review.genres.map((genre) => (
                                    <span 
                                        key={genre}
                                        className="text-sm font-medium bg-red-600 text-white px-3 py-1"
                                    >
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