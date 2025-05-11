"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const VerifyUser = () => {
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error) {
      console.log("VerifyUser error-", error);
      setError("Invalid token!");
      setVerified(false);
    }
  };

  useEffect(() => {
    console.log("useEffect 1");

    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    console.log("useEffect 2.0");

    if (token.length > 0) {
      console.log("useEffect 2.1");
      verifyUserEmail();
    } else {
      console.log("useEffect 2.2");
      setError("Invalid token!");
      setVerified(false);
    }
  }, [token]);

  return (
    <div>
      {verified ? (
        <h2 className="text-green-600 font-extrabold text-2xl text-center bg-gray-200 !p-2">
          Email verified successfully.
          <br />
          You can login now <Link href="/login">Login</Link>
        </h2>
      ) : (
        <h2 className="text-red-600 font-extrabold text-2xl text-center bg-gray-200 !p-2">
          {error}
          <br />
          Contact Admin
        </h2>
      )}
    </div>
  );
};

export default VerifyUser;
