import Link from "next/link";

export default function Header() {
  return (
    <header className="flex md:px-20 p-5 items-center">
      {/* <h4 className="font-bold text-3xl">lanatix</h4> */}
      <img src="/logo.svg" alt="logo" className="w-10" />
      <nav className="flex items-center gap-5"></nav>
      <Link href="/auth" className="ml-auto">
        <button className="btn-gradient2 text-black text-xl rounded-full py-2.5 px-5 font-medium ml-auto">
          Get Started
        </button>
      </Link>
    </header>
  );
}
