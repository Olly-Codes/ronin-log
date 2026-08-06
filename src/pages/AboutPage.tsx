const AboutPage = () => {
    return (
        <main className="p-8">
            <header>
                <h1 className="text-2xl font-bold text-primary mb-4">About Ronin <span className="text-accent">Log</span></h1>
            </header>

            <section className="text-primary text-2xl">
                <p>
                    Ronin <span>Log</span> is a platform for writing and sharing reviews of anime, manga, light novels, and many more.
                </p>
                <p>
                    Sign in to leave comments on any review, or browse without an account 
                    to read through what's been reviewed so far.
                </p>
            </section>
        </main>
    );
};

export default AboutPage;