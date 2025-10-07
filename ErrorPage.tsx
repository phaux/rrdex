import { useRouteError } from "react-router";
import { Link } from "react-router";

export function ErrorPage() {
  const error = useRouteError();
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Error</h1>
      <p className="text-red-400">
        {error instanceof Error ? error.message : String(error)}
      </p>
      <Link to="/" className="text-blue-400 hover:underline mt-4 inline-block">
        Back to Home
      </Link>
    </main>
  );
}
