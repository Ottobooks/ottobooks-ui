"use client";
import Nav from "./Nav";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Main from "./Main";
import { useAppSelector } from "@/redux/hooks";

const Layout = (props: any) => {
  const token = useAppSelector((state: any) => state.token);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setLoggedIn(false);
      router.push("/login");
    } else {
      setLoggedIn(true);
    }
  }, [token]);

  return (
    <div className="flex min-h-screen">
      {isLoggedIn ? <Nav /> : <></>}
      <Main>{props.children}</Main>
    </div>
  );
};

export default Layout;
