import AdminLayout from "../components/admin/Adminlayout";


export default function Dashboard() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome, Admin! Manage your store here.</p>
    </AdminLayout>
  );
}
