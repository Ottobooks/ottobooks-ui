"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onCreateHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const request = {
      firstname,
      lastname,
      email,
      password,
    };

    const response: Response = await fetch(
      "https://ottobooks-api.onrender.com/signup",
      {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(request),
      }
    );

    const { data, status, errors } = await response.json();
    if (response.ok) {
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col p-6 gap-6 w-96 otto-card">
        <div className="flex justify-between">
          <span className="font-bold">Create Account</span>
          <div className="flex gap-2">
            <Link href="/login" className="otto-link">
              Sign in
            </Link>
            <span>instead?</span>
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="firstname" className="otto-label">
            First Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="firstname"
              id="firstname"
              className="otto-input"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="lastname" className="otto-label">
            Last Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="otto-input"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
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
        <button className="otto-button" onClick={onCreateHandler}>
          Create New Account
        </button>
      </div>
    </div>
  );
};

export default Signup;
