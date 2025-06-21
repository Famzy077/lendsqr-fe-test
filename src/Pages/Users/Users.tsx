import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatsCard from '../../components/UI/StatsCard';
import UsersTable from '../../components/UI/UsersTable/UsersTable';
import type { User } from '../../components/UI/UsersTable/UsersTable';
import './Users.scss';

import { Loader } from 'lucide-react';
// Import icons for the stats cards
import usersIcon from '../../../public/Images/Icons/userGender.png';
import activeUsersIcon from '../../../public/Images/Icons/Users3.png';
import usersWithLoansIcon from '../../../public/Images/Icons/loanIcon.png';
import usersWithSavingsIcon from '../../../public/Images/Icons/AssetIcon.png';

const Users = () => {
  // --- STATE AND DATA FETCHING LOGIC ---
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Fetch data from your local json-server
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users. Please make sure your local server is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  // --- STATS CARD DATA (This part was correct) ---
  const stats = [
    {
      icon: usersIcon,
      iconBgColor: 'rgba(223, 24, 255, 0.1)',
      label: 'Users',
      value: '2,453'
    },
    {
      icon: activeUsersIcon,
      iconBgColor: 'rgba(87, 24, 255, 0.1)',
      label: 'Active Users',
      value: '2,453'
    },
    {
      icon: usersWithLoansIcon,
      iconBgColor: 'rgba(245, 95, 68, 0.1)',
      label: 'Users with Loans',
      value: '12,453'
    },
    {
      icon: usersWithSavingsIcon,
      iconBgColor: 'rgba(255, 51, 102, 0.1)',
      label: 'Users with Savings',
      value: '102,453'
    }
  ];

  return (
    <div className="users-page">
      <h1 className="page-title">Users</h1>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            iconBgColor={stat.iconBgColor}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </div>
        
      <div className="users-table-container">
        {loading && <p>Loading users...</p>}
        {error && <p className="error-message">{error}</p>}
        {loading && (
          <div className="loading-container">
            <Loader size={48} className="spinner" color="#213F7D" />
          </div>
        )}
        {!loading && !error && <UsersTable users={users} />}
      </div>
    </div>
  );
};

export default Users;