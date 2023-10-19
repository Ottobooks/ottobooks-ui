import Link from "next/link";

export default function Nav() {
  return (
    <div className="flex flex-col bg-stone-700 text-gray-300 px-6 pb-6">
      <div className="h-16 flex items-center">
        <Link href="/" className="otto-link">
          OTTOBOOKS
        </Link>
      </div>

      <nav className="flex-1">
        <ul>
          <li className="px-2 py-3 hover:text-white hover:bg-stone-800 hover:rounded hover:cursor-pointer">
            <Link href="/automations">My Automations</Link>
          </li>
          <li className="px-2 py-3 hover:text-white hover:bg-stone-800 hover:rounded hover:cursor-pointer">
            <Link href="/create">Create New Automation</Link>
          </li>
          <li className="px-2 py-3 hover:text-white hover:bg-stone-800 hover:rounded hover:cursor-pointer">
            <Link href="/integrations">Integrations</Link>
          </li>
          <li className="px-2 py-3 hover:text-white hover:bg-stone-800 hover:rounded hover:cursor-pointer">
            <Link href="/downloads">Downloads</Link>
          </li>
        </ul>
      </nav>

      <div className="p-2 items-end hover:text-white hover:bg-stone-800 hover:rounded hover:cursor-pointer">
        <Link href="/community">Ottobooks Community</Link>
      </div>
    </div>
  );
}
