"use client";
import Nav from "./Nav";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Main from "./Main";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { OttoState } from "@/constants/script.constant";
import { setBreadcrumb } from "@/redux/slices/breadcrumbSlice";

const Layout = (props: any) => {
  const token = useAppSelector((state: OttoState) => state.auth.token);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBreadcrumb(pathname));
  }, [pathname]);

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
