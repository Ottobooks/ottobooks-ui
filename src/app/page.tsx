import Main from "@/components/Main";
import Nav from "@/components/Nav";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Nav></Nav>
      <Main></Main>
    </main>
  );
}
