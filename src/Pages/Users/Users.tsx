import React, { useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { User } from '../../hooks/UserTypes';
import StatsCard from '../../components/UI/StatsCard';
import UsersTable from '../../components/UI/UsersTable/UsersTable';
import { Loader } from 'lucide-react';
import './Users.scss';

// Import icons
import usersIcon from '../../../public/Images/Icons/userGender.png';
import activeUsersIcon from '../../../public/Images/Icons/Users3.png';
import usersWithLoansIcon from '../../../public/Images/Icons/loanIcon.png';
import usersWithSavingsIcon from '../../../public/Images/Icons/AssetIcon.png';

const API_URL = 'https://lendsqr-mock-api.onrender.com/users';

// --- Data Fetching Function ---
const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get(API_URL);
  return data;
};

const Users = () => {
  // --- Data Fetching with TanStack Query ---
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    onSuccess: (data) => {
      try {
        console.log("Saving fetched user data to localStorage...");
        // I use JSON.stringify because localStorage can only store strings.
        localStorage.setItem('allUsersData', JSON.stringify(data));
      } catch (e) {
        console.error("Failed to save user data to localStorage:", e);
      }
    },
  });

  // --- Dynamic Stats Calculation ---
  const statsData = useMemo(() => {

    const totalUsers: number = users.length;
    const activeUsers = users.filter(user => user.status === 'Active').length;
    const usersWithLoans = Math.floor(totalUsers * 0.8);
    const usersWithSavings = Math.floor(totalUsers * 0.6);
    
    return [
      {
        icon: usersIcon,
        iconBgColor: 'rgba(223, 24, 255, 0.1)',
        label: 'Users',
        value: totalUsers.toLocaleString()
      },
      {
        icon: activeUsersIcon,
        iconBgColor: 'rgba(87, 24, 255, 0.1)',
        label: 'Active Users',
        value: activeUsers.toLocaleString()
      },
      {
        icon: usersWithLoansIcon,
        iconBgColor: 'rgba(245, 95, 68, 0.1)',
        label: 'Users with Loans',
        value: usersWithLoans.toLocaleString()
      },
      {
        icon: usersWithSavingsIcon,
        iconBgColor: 'rgba(255, 51, 102, 0.1)',
        label: 'Users with Savings',
        value: usersWithSavings.toLocaleString()
      }
    ];
  }, [users]);

  return (
    <div className="users-page">
      <h1 className="page-title">Users</h1>
      <div className="stats-grid">
        {statsData.map((stat, index) => (
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
        {isLoading && (
          <div className="loading-container">
            <Loader size={48} className="spinner" color="#213F7D" />
          </div>
        )}
        {error && <p className="error-message">Failed to fetch users. Please try again.</p>}
        
        {!isLoading && !error && <UsersTable users={users} />}
      </div>
    </div>
  );
};

export default Users;

