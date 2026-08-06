import { useQuery } from "@tanstack/react-query";
import reviewsAPI from "../api/reviewsAPI";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const ReviewsPage = () => {

    const navigate = useNavigate();
    const reviewsQuery = useQuery({
        queryKey: ["reviews"],
        queryFn: reviewsAPI.getReviews

    });

    if (reviewsQuery.isLoading) return <p>Loading Reviews...</p>
    if (reviewsQuery.isError) {
        toast.error("Could not load reviews. Please try again");
    }
    
    return (
        <main>
            <h1>Reviews</h1>
            {reviewsQuery.data ? (reviewsQuery.data.reviews.map((review) => (
                <article
                    key={review.review_id}
                    onClick={() => navigate(`${review.review_id}`)}
                >
                    <section>
                        {review.cover_image_url ? (
                            <img 
                                src={review.cover_image_url}
                                alt={review.title}
                            />
                        ) : (
                            <div>
                                No image
                            </div>
                        )}
                    </section>

                    <section>
                        <p>{review.media_type} &bull; {review.demographic}</p>
                        <div>
                            <h2>{review.title}</h2>
                            <span>{review.score}</span>
                        </div>
                        <div>
                            {review.genres.map((genre) => (
                                <span
                                    key={genre}>
                                        {genre}
                                    </span>
                            ))}
                        </div>
                    </section>
                </article>
            ))
            ) : (
                <p>Failed to load reviews</p>
            )}
        </main>
    );
};

export default ReviewsPage;