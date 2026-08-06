import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await login(email, password);
            toast.success("Logged in successfully");
            navigate("/reviews");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if(err.response?.status === 401) {
                    toast.error(err.response.data?.error ?? "Invalid email or password");
                } else {
                    toast.error("Something went wrong. Please try again");
                }
            } else {
                toast.error("Something went wrong. Please try again");
            }
            
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-background">
            <form 
                onSubmit={handleSubmit}
                className="w-full max-w-xs md:max-w-md bg-surface shadow-sm border border-border p-10"
            >
                <header className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-primary mb-3">
                        Ronin <span className="text-accent">Log</span>
                    </h1>
                    <p className="text-muted text-sm">Sign in to create comments on reviews</p>
                </header>

                <div className="border-t border-border mb-6"></div>

                <section className="mb-5">
                    <label 
                        htmlFor="email"
                        className="block text-sm font-medium text-muted mb-1"
                    >
                        Email
                    </label>
                    <input
                        id="email" 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                    />
                </section>

                <section className="mb-5">
                    <label 
                        htmlFor="password"
                        className="block text-sm font-medium text-muted mb-1"
                    >
                        Password
                    </label>
                    <input
                        id="password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-background border border-border px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                        required 
                    />
                </section>

                <button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full bg-red-600 text-white font-semibold py-2 hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                >
                    {submitting ? "Logging in..." : "Login"}
                </button>
            </form>
        </main>
    );
};

export default LoginPage;