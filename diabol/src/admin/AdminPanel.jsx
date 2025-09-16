import { useState, useEffect } from 'react';
import '../styles/adminpanel.css';
import StatsCard from './StatsCard';
import UserTable from './UserTable';
import AdminAddProduct from './AdminAddProduct';
import AdminEditProduct from './AdminEditProduct';
import AdminOrders from './AdminOrders';

import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div className={`admin-dashboard ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <aside className="admin-sidebar">
        <div className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </div>
        <h2 className="admin-title">ADMIN</h2>
        <ul className="admin-nav">
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            <DashboardIcon /> <span>Dashboard</span>
          </li>
          <li className={activeTab === 'add-product' ? 'active' : ''} onClick={() => setActiveTab('add-product')}>
            <InventoryIcon /> <span>Add Product</span>
          </li>
          <li className={activeTab === 'edit-product' ? 'active' : ''} onClick={() => setActiveTab('edit-product')}>
            <InventoryIcon /> <span>Edit Product</span>
          </li>
          <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            <ShoppingCartIcon /> <span>Orders</span>
          </li>
          <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
            <PeopleIcon /> <span>Users</span>
          </li>
        </ul>
      </aside>

      <main className="admin-main">
        {activeTab === 'dashboard' && (
          <>
            <h1>Admin Dashboard</h1>
            <div className="stats-container">
              <StatsCard title="Total Users" value={users.length} />
              {/* Add more cards for products or orders if needed */}
            </div>
          </>
        )}
        {activeTab === 'add-product' && <AdminAddProduct />}
        {activeTab === 'edit-product' && <AdminEditProduct />}
        {activeTab === 'orders' && <AdminOrders />}
        {activeTab === 'users' && <UserTable users={users} />}
      </main>
    </div>
  );
}
