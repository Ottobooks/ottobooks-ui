"use client";
import Nav from "./Nav";
import styles from "./Layout.module.css";
// import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Main from "./Main";

const Layout = (props: any) => {
  //   const token = useAppSelector((state: any) => state.token);
  //   const router = useRouter();

  //   useEffect(() => {
  //     if (!token) {
  //       router.push("/authentication");
  //     }
  //   }, [token]);

  return (
    <div className="flex min-h-screen">
      <Nav />
      <Main>{props.children}</Main>
    </div>
  );
};

export default Layout;
