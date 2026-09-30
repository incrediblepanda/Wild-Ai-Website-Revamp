
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="page-hero flex min-h-[100svh] items-center">
      <div className="page-hero__wash" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="container relative mx-auto px-4 text-center">
        <p className="eyebrow mb-5 justify-center">Error 404</p>
        <h1 className="page-hero__title mb-4">
          Oops! Page <span>not found</span>
        </h1>
        <Link to="/" className="btn-primary mt-6">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
