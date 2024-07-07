import Authorised from "./Authorised";

function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      {/* Admin-specific content goes here */}
      <h3>Admin only page woohoo</h3>
    </div>
  );
}

export default Authorised(AdminDashboard);
