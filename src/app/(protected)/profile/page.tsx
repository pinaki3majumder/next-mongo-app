"use client";

import { ApiResponse } from "@/types/api-response.types";
import { EmailType } from "@/types/email-type.enum";
import { SendEmailData } from "@/types/send-email.type";
import { UserInfo } from "@/types/user.type";
import axios from "axios";
import React, { useEffect } from "react";

const Profile = () => {
  const [user, setUser] = React.useState<UserInfo | null>(null);
  const [activateEmail, setActivateEmail] = React.useState<boolean>(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const response = await axios.get<ApiResponse<UserInfo>>(
      "/api/users/profile"
    );
    setUser(response.data.data);
    console.log(response.data.data);

    if (!response.data.data.isVerified) {
      setActivateEmail(true);
    }
  };

  const verifyUserEmail = async () => {
    console.log("verifyUserEmail");

    sendEmail({
      email: user?.email || "",
      userId: user?._id || "",
      emailType: EmailType.VERIFY_USER,
    });
  };

  const sendEmail = async ({ email, userId, emailType }: SendEmailData) => {
    const res = await fetch("/api/users/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, userId, emailType }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to send email");
    return data;
  };

  return (
    <>
      <h1 className="font-bold">Profile</h1>
      <hr />
      <div>
        {user?.isVerified ? (
          <div
            className="p-4 !mt-2 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span className="font-bold">Verified</span>
          </div>
        ) : (
          <div
            className="p-4 !mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-bold">Not Verified!</span>
            <br />
            {activateEmail && (
              <button
                className="mt-2 p-4 rounded-2xl font-bold bg-amber-400"
                onClick={verifyUserEmail}
              >
                Verify
              </button>
            )}
          </div>
        )}

        <h2>Username: {user?.userName}</h2>
        <h2>Email: {user?.email}</h2>
      </div>
    </>
  );
};

export default Profile;
