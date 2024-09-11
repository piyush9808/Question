import { SignedOut, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div>
        Home
      </div>
      <Link href="/dashboard"><button>Dashboard</button></Link>
      <button><SignOutButton/></button>
    </div>
  );
}
