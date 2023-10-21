import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const isSelected = (currentPath: string) =>
    pathname?.startsWith(currentPath) ? "otto-primary rounded" : "";

  return (
    <div className="flex flex-col bg-stone-700 text-gray-300 px-6 pb-6">
      <div className="p-3 h-16 flex items-center">
        <Link href="/" className="otto-link">
          OTTOBOOKS
        </Link>
      </div>

      <nav className="flex-1">
        <ul className="flex flex-col gap-3">
          <li
            className={`p-3 hover:text-white hover:rounded hover:cursor-pointer ${isSelected(
              "/automations"
            )}`}
          >
            <Link href="/automations">My Automations</Link>
          </li>
          <li
            className={`p-3 hover:text-white hover:rounded hover:cursor-pointer ${isSelected(
              "/create"
            )}`}
          >
            <Link href="/create">Create New Automation</Link>
          </li>
          <li
            className={`p-3 hover:text-white hover:rounded hover:cursor-pointer ${isSelected(
              "/integrations"
            )}`}
          >
            <Link href="/integrations">Integrations</Link>
          </li>
          <li
            className={`p-3 hover:text-white hover:rounded hover:cursor-pointer ${isSelected(
              "/downloads"
            )}`}
          >
            <Link href="/downloads">Downloads</Link>
          </li>
        </ul>
      </nav>

      <div
        className={`p-3 items-end hover:text-white hover:rounded hover:cursor-pointer ${isSelected(
          "/community"
        )}`}
      >
        <Link href="/community">Ottobooks Community</Link>
      </div>
    </div>
  );
}
