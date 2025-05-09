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
        <h2>Username: {user?.userName}</h2>
        <h2>Email: {user?.email}</h2>
      </div>
    </>
  );
};

export default Profile;
