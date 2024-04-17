import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-36 gap-6">
    <h1 className=" text-center text-5xl ">
       Authentication App <br /> With  <br /> NextJs
    </h1>
    <Link
    href={'/login'}
    className=" border-gray-400 border rounded-lg px-2 py-1"
    >
      Login
    </Link>
    <Link
    href={'/profile'}
    className=" border-gray-400 border rounded-lg px-2 py-1"
    >
      Profile
    </Link>
    </main>
  );
}
