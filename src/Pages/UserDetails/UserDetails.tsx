'use client';

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import './UserDetails.scss';
import { Loader, ArrowLeft, FolderKanban } from 'lucide-react'; // NEW: Added an icon for the empty state
import lightStar from '/public/Images/Icons/lightStarIcon.png';
import thickRateStar from '/public/Images/Icons/thickRateStar.png';

const API_URL = 'https://lendsqr-mock-api.onrender.com';

// --- The User type definition (no changes) ---
type User = {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  avatar: string;
  personalInfo: {
    fullName: string,
    bvn: string,
    gender: string,
    maritalStatus: string,
    children: string,
    typeOfResidence: string
  };
  financialInfo: {
    accountBalance: string;
    accountNumber: string,
    bankName: string,
    userTier: number
  };
  educationAndEmployment: {
      levelOfEducation: string;
      employmentStatus: string,
      sectorOfEmployment: string,
      durationOfEmployment: string,
      officeEmail: string,
      monthlyIncome: string,
      loanRepayment: string
  };
  socials: {
    facebook: string,
    twitter: string,
    instagram: string
  };
  guarantors: {
    name: string;
    phone: string;
    email: string;
    relationship: string;
  }[];
};

// --- Data Fetching Function (no changes) ---
const fetchUserById = async (userId: string | undefined): Promise<User | null> => {
  if (!userId) return null;
  const { data } = await axios.get(`${API_URL}/users/${userId}`);
  return data;
};

// --- Helper Components ---
const InfoDetail = ({ label, value }: { label: string, value: string | number | undefined }) => (
  <div className="info-detail">
    <span className="label">{label}</span>
    <span className="value">{value || 'N/A'}</span>
  </div>
);

// --- NEW: A reusable component for empty tabs ---
const EmptyTabContent = ({ tabName }: { tabName: string }) => (
    <div className="flex flex-col items-center justify-center h-48 text-gray-400">
        <FolderKanban size={40} className="mb-4" />
        <p className="font-semibold">No Information Available</p>
        <p className="text-sm">There are no {tabName.toLowerCase()} details for this user yet.</p>
    </div>
);


const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>();
  const [activeTab, setActiveTab] = useState('General Details');

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserById(userId),
    initialData: () => {
      try {
        const allUsersJSON = localStorage.getItem('allUsersData');
        if (!allUsersJSON) return undefined;
        const allUsers: User[] = JSON.parse(allUsersJSON);
        return allUsers.find(u => u.id === userId);
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        return undefined;
      }
    },
    staleTime: 1000 * 60,
  });

  if (isLoading) {
    return (
      <div className="loading-container">
        <Loader size={48} className="spinner" color="#213F7D" />
      </div>
    );
  }

  if (error) {
    return <p className="error-message">Failed to fetch user details.</p>;
  }

  if (!user) {
    return <p>User not found.</p>;
  }
  
  const TABS = ['General Details', 'Documents', 'Bank Details', 'Loans', 'Savings', 'App and System'];

  return (
    <div className="user-details-page">
      <Link to="/dashboard" className="back-link">
        <ArrowLeft size={20} />
        <span>Back to Users</span>
      </Link>

      <div className="page-header">
        <h1>User Details</h1>
        <div className="action-buttons">
          <button className="blacklist-btn">Blacklist User</button>
          <button className="activate-btn">Activate User</button>
        </div>
      </div>

      <div className="user-info-card">
        {/* ... Profile Header JSX (no changes) ... */}
        <div className="profile-header">
          <div className="avatar">
            <img src={user.avatar} alt={`${user.username}'s avatar`} />
          </div>
          <div className="name-section">
            <h2>{user.personalInfo?.fullName}</h2>
            <p>{user.financialInfo?.accountNumber}</p>
          </div>
          <div className="tier-section">
            <p>User's Tier</p>
            <div className="stars">
                {[1, 2, 3].map(star => (
                    <img key={star} src={star <= (user.financialInfo?.userTier || 0) ? thickRateStar : lightStar} alt="Star rating" className="star-icon" />
                ))}
            </div>
          </div>
          <div className="balance-section">
            <h2>₦{Number(user.financialInfo?.accountBalance).toLocaleString()}</h2>
            <p>{user.financialInfo?.accountNumber}/{user.financialInfo?.bankName}</p>
          </div>
        </div>
        <nav className="details-tabs">
            {TABS.map(tab => (
                <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab)}
                    className={`tab-link ${activeTab === tab ? 'active' : ''}`}
                >
                    {tab}
                </button>
            ))}
        </nav>
      </div>

      <div className="details-content-card">
        {/* --- UPDATED: Logic to handle all tabs --- */}
        {activeTab === 'General Details' ? (
            <>
                <section className="info-section">
                  <h2>Personal Information</h2>
                  <div className="info-grid">
                    <InfoDetail label="Full Name" value={user.personalInfo?.fullName} />
                    <InfoDetail label="Phone Number" value={user.phoneNumber} />
                    <InfoDetail label="Email Address" value={user.email} />
                    <InfoDetail label="Bvn" value={user.personalInfo?.bvn} />
                    <InfoDetail label="Gender" value={user.personalInfo?.gender} />
                    <InfoDetail label="Marital Status" value={user.personalInfo?.maritalStatus} />
                    <InfoDetail label="Children" value={user.personalInfo?.children} />
                    <InfoDetail label="Type of Residence" value={user.personalInfo?.typeOfResidence} />
                  </div>
                </section>
                <section className="info-section">
                  <h2>Education and Employment</h2>
                  <div className="info-grid">
                    <InfoDetail label="Level of Education" value={user.educationAndEmployment?.levelOfEducation} />
                    <InfoDetail label="Employment Status" value={user.educationAndEmployment?.employmentStatus} />
                    <InfoDetail label="Sector of Employment" value={user.educationAndEmployment?.sectorOfEmployment} />
                    <InfoDetail label="Duration of Employment" value={user.educationAndEmployment?.durationOfEmployment} />
                    <InfoDetail label="Office Email" value={user.educationAndEmployment?.officeEmail} />
                    <InfoDetail label="Monthly Income" value={`₦${user.educationAndEmployment?.monthlyIncome}`} />
                    <InfoDetail label="Loan Repayment" value={`₦${user.educationAndEmployment?.loanRepayment}`} />
                  </div>
                </section>
                 <section className="info-section">
                    <h2>Socials</h2>
                    <div className="info-grid">
                        <InfoDetail label="Twitter" value={user.socials?.twitter} />
                        <InfoDetail label="Facebook" value={user.socials?.facebook} />
                        <InfoDetail label="Instagram" value={user.socials?.instagram} />
                    </div>
                </section>
                <section className="info-section">
                    <h2>Guarantor</h2>
                    {user.guarantors?.map((guarantor, index) => (
                        <div className="info-grid guarantor-grid" key={index}>
                            <InfoDetail label="Full Name" value={guarantor.name} />
                            <InfoDetail label="Phone Number" value={guarantor.phone} />
                            <InfoDetail label="Email Address" value={guarantor.email} />
                            <InfoDetail label="Relationship" value={guarantor.relationship} />
                        </div>
                    ))}
                </section>
            </>
        ) : (
            // For all other tabs, show the empty state message
            <EmptyTabContent tabName={activeTab} />
        )}
      </div>
    </div>
  );
};

export default UserDetails;
