
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-6">
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="text-9xl font-bold text-primary/20">404</div>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-medium">
              Page Not Found
            </div>
          </div>
        </div>
        
        <p className="text-muted-foreground max-w-md mx-auto">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild className="mt-4">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
