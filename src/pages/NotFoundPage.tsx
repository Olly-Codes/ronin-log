import { useNavigate } from "react-router";

const NotFoundPage = () => {

    const navigate = useNavigate();

    return (
        <main>
            <div>
                <p>Page not found</p>
                <h1>We could not find that page</h1>
                <p>The link may be outdated, mistyped, or no longer available</p>
                <button 
                    type="button"
                    onClick={() => navigate("/")}
                >
                    Go back home
                </button>
            </div>
        </main>
    );
};

export default NotFoundPage;