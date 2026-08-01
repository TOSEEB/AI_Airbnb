import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <h1 className="text-7xl font-bold">

        404

      </h1>

      <p className="mt-5 text-xl">

        Page Not Found

      </p>

      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
      >
        Go Home
      </Link>

    </div>
  );
};

export default NotFound;