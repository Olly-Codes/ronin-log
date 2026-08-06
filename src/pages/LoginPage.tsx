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
        <main>
            <form onSubmit={handleSubmit}>
                <header>
                    <h1>Ronin <span>Log</span></h1>
                    <p>Sign in to create comments on reviews</p>
                </header>

                <section>
                    <label 
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        id="email" 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </section>

                <section>
                    <label 
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        id="password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </section>

                <button 
                    type="submit" 
                    disabled={submitting}
                >
                    {submitting ? "Logging in..." : "Login"}
                </button>
            </form>
        </main>
    );
};

export default LoginPage;