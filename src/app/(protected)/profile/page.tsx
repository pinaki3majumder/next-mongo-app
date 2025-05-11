"use client";

import { ApiResponse } from "@/types/api-response.types";
import { UserInfo } from "@/types/user.type";
import axios from "axios";
import React, { useEffect } from "react";

const Profile = () => {
  const [user, setUser] = React.useState<UserInfo | null>(null);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const response = await axios.get<ApiResponse<UserInfo>>(
      "/api/users/profile"
    );
    setUser(response.data.data);
    console.log(response.data.data);
  };

  return (
    <>
      <h1>Profile</h1>
      <div>
        {user?.isVerified ? (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span className="font-bold">Verified</span>
          </div>
        ) : (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-bold">Not Verified!</span>
          </div>
        )}

        <h2>Username: {user?.userName}</h2>
        <h2>Email: {user?.email}</h2>
      </div>
    </>
  );
};

export default Profile;
