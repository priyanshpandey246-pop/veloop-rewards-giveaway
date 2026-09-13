import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main className="container py-5 text-center">
            <h1>Page not found</h1>

            <p style={{ color: "var(--text-secondary)"}}>
                The page you're looking for is not available.
            </p>

            <Link
            to="/giveaways"
            className="btn btn-light mt-2"
            >
                Back to Giveaways
            </Link>
        </main>
    )
}

export default NotFound;


