import { useQuery } from "@tanstack/react-query";
import reviewsAPI from "../api/reviewsAPI";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { capatilize } from "../utils/capitlizeText"

const ReviewsPage = () => {

    const navigate = useNavigate();
    const reviewsQuery = useQuery({
        queryKey: ["reviews"],
        queryFn: reviewsAPI.getReviews

    });

    if (reviewsQuery.isLoading) return <p className="bg-surface border border-border p-8 text-muted text-sm">Loading Reviews...</p>
    if (reviewsQuery.isError) {
        toast.error("Could not load reviews. Please try again");
    }
    
    return (
        <main className="p-8">
            <header>
                <h1 className="text-2xl font-bold text-primary mb-4">Reviews</h1>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviewsQuery.data ? (reviewsQuery.data.reviews.map((review) => (
                    <article
                        key={review.review_id}
                        onClick={() => navigate(`${review.review_id}`)}
                        className="bg-surface border border-border p-4 flex flex-col justify-between cursor-pointer hover:bg-surface-hover"
                    >
                        <section className="aspect-[16/9] bg-surface-hover overflow-hidden text-primary mb-4">
                            {review.cover_image_url ? (
                                <img 
                                    src={review.cover_image_url}
                                    alt={review.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-surface-hover flex items-center justify-center text-muted">
                                    No image
                                </div>
                            )}
                        </section>

                        <section>
                            <p className="text-muted text-sm mb-1">{capatilize(review.media_type)} &bull; {capatilize(review.demographic)}</p>
                            <div className="text-primary mb-4">
                                <h2 className="text-xl lg:text-2xl font-semibold mb-1">{capatilize(review.title)}</h2>
                                <span className="text-2xl">Rating: {review.score}/10</span>
                            </div>
                            <div className="flex gap-4">
                                {review.genres.map((genre) => (
                                    <span
                                        key={genre}
                                        className="text-sm font-semibold bg-red-600 text-primary px-3 py-1"
                                    >
                                            {capatilize(genre)}
                                        </span>
                                ))}
                            </div>
                        </section>
                    </article>
                ))
                ) : (
                    <p className="bg-surface border border-border p-8 text-muted text-sm">There are no reviews yet</p>
                )}
            </section>
        </main>
    );
};

export default ReviewsPage;