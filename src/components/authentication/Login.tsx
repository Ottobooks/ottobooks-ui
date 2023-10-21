"use client";
import { useAppDispatch } from "@/redux/hooks";
import { setAuth } from "@/redux/slices/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const request = {
      email,
      password,
    };

    const response: Response = await fetch(
      "https://ottobooks-api.onrender.com/signin",
      {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(request),
      }
    );

    const data = await response.json();
    if (response.ok) {
      dispatch(setAuth(data));
      router.push("/");
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col p-6 gap-6 w-96 otto-card">
        <div className="flex justify-between">
          <span className="font-bold">Sign In</span>
          <div className="flex gap-2">
            <Link href="/signup" className="otto-link">
              Create Account
            </Link>
            <span>instead?</span>
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="username" className="otto-label">
            Email
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="username"
              id="username"
              className="otto-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="password" className="otto-label">
            Password
          </label>
          <div className="mt-2">
            <input
              type="password"
              name="password"
              id="password"
              className="otto-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="otto-button" onClick={onLoginHandler}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
