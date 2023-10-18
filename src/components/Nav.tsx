export default function Nav() {
  return (
    <div className="flex flex-col bg-stone-700 text-gray-300 px-6 pb-6">
      <div className="h-16 flex items-center">
        <span className="text-amber-500">OTTOBOOKS</span>
      </div>

      <nav className="flex-1">
        <ul>
          <li className="px-2 py-3 hover:text-white hover:bg-stone-800 hover:rounded hover:cursor-pointer">
            <a href="">My Automations</a>
          </li>
          <li className="px-2 py-3 hover:text-white hover:bg-stone-800 hover:rounded hover:cursor-pointer">
            <a href="">Create New Automation</a>
          </li>
          <li className="px-2 py-3 hover:text-white hover:bg-stone-800 hover:rounded hover:cursor-pointer">
            <a href="">Integrations</a>
          </li>
          <li className="px-2 py-3 hover:text-white hover:bg-stone-800 hover:rounded hover:cursor-pointer">
            <a href="">Downloads</a>
          </li>
        </ul>
      </nav>

      <div className="p-2 items-end hover:text-white hover:bg-stone-800 hover:rounded hover:cursor-pointer">
        <a href="">Ottobooks Community</a>
      </div>
    </div>
  );
}
