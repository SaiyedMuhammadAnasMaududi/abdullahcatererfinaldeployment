import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/admin" className="block p-2 hover:bg-gray-200 rounded">Dashboard</Link>
          </li>
          <li>
            <Link href="/admin/catering" className="block p-2 hover:bg-gray-200 rounded">Catering</Link>
          </li>
          <li>
            <Link href="/admin/decoration" className="block p-2 hover:bg-gray-200 rounded">Decoartion</Link>
          </li>
          <li>
            <Link href="/admin/reservingDestination" className="block p-2 hover:bg-gray-200 rounded">ReservingDestination</Link>
          </li>
          <li>
            <Link href="/admin/consultancyManager" className="block p-2 hover:bg-gray-200 rounded">Consultancy</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
