"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";

export default function AdminLogin() {
  const initialState = { username: "", password: "" };

  const [credentials, setCredentials] = useState(initialState);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      username: credentials.username,
      password: credentials.password,
      callbackUrl: "http://localhost:3000/dashboard",
    });
  };
  return (
    <div className="min-h-screen flex items-center w-screen justify-center flex-col">
      <h4 className="font-bold text-2xl md:text-3xl text-center">
        Hey there👋
      </h4>
      <p className="text-center text-neutral-400 font-light text-sm mt-1 mb-5">
        Log in to your Lanatix Admin dashboard
      </p>
      <form action="" onSubmit={handleSubmit} className="space-y-2.5">
        <div className="space-y-1">
          <h4 className="font-medium text-sm">Brand Username</h4>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className="w-full md:w-72"
          />
        </div>
        <div className="space-y-1">
          <h4 className="font-medium text-sm">Admin Password</h4>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="w-full md:w-72"
          />
        </div>
        <button
          type="submit"
          className="grad px-5 p-2.5 font-medium text-black w-full rounded-lg"
        >
          Log in as Admin
        </button>
      </form>
    </div>
  );
}
