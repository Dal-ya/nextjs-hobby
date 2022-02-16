import Link from "next/link";

export default function NavBar() {
  return (
    /* TODO: FIXED 형태로 변경하기 */
    <nav className="max-w-full dark:bg-slate-900 shadow-md">
      <div className="container flex p-4">
        <div className="flex w-full">
          <ul className="flex space-x-4 text-sm text-slate-300">
            <li>
              <Link href="/"><a>Home</a></Link>
            </li>
            <li>
              <Link href="/"><a>About</a></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
