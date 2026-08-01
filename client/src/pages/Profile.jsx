import { useState } from "react";

const Profile = () => {
  const [user] = useState({
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role"),
  });

  return (
    <div className="container mx-auto py-10 px-6">

      <div className="max-w-xl mx-auto bg-white shadow rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-6">

          My Profile

        </h1>

        <div className="space-y-4">

          <p>

            <strong>Name:</strong> {user.name}

          </p>

          <p>

            <strong>Email:</strong> {user.email}

          </p>

          <p>

            <strong>Role:</strong> {user.role}

          </p>

        </div>

      </div>

    </div>
  );
};

export default Profile;