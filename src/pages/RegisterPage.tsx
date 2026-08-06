import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";

const RegisterPage = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent): Promise<void> => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await register({ username, email, password });
            toast.success("Account created successfully");
            navigate("/reviews");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 409) {
                    toast.error(err.response.data?.error ?? "Username or email already in use");
                } else if (err.response?.status === 400) {
                    toast.error(err.response.data?.error ?? "Please check your details and try again");
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
                    <p>Register an account to start commenting on reviews</p>
                </header>

                <section>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username" 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </section>

                <section>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email" 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </section>

                <section>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </section>

                <button type="submit" disabled={submitting}>
                    {submitting ? "Creating account..." : "Register"}
                </button>
            </form>
        </main>
    );
};

export default RegisterPage;