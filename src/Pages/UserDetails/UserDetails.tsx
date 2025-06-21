import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Loader, ArrowLeft, Star } from 'lucide-react';
import './UserDetails.scss';
import type { User } from '../../hooks/UserTypes';

// A small helper component to keep the code clean and DRY (Don't Repeat Yourself)
const InfoDetail = ({ label, value }: { label: string, value: string | number }) => (
    <div className="info-detail">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
);

const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/users/${userId}`);
        setUser(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch user details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    if (userId) {
    fetchUserDetails();
  };
  }, [userId]);

  if (loading) {
    return (
      <div className="loading-container">
        <Loader size={48} className="spinner" color="#213F7D" />
      </div>
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!user) {
    return <p>User not found.</p>;
  }

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
        <div className="profile-header">
            <div className="avatar">
                <img src={user.avatar} alt={`${user.username}'s avatar`} />
            </div>
            <div className="name-section">
                <h2>{user.personalInfo.fullName}</h2>
                <p>{user.id}</p>
            </div>
            <div className="tier-section">
                <p>User's Tier</p>
                <div className="stars">
                    <Star fill={user.financialInfo.userTier >= 1 ? "#E9B200" : "#E0E0E0"} strokeWidth={0} />
                    <Star fill={user.financialInfo.userTier >= 2 ? "#E9B200" : "#E0E0E0"} strokeWidth={0} />
                    <Star fill={user.financialInfo.userTier >= 3 ? "#E9B200" : "#E0E0E0"} strokeWidth={0} />
                </div>
            </div>
            <div className="balance-section">
                <h2>₦{Number(user.financialInfo.accountBalance).toLocaleString()}</h2>
                <p>{user.financialInfo.accountNumber}/{user.financialInfo.bankName}</p>
            </div>
        </div>
        <nav className="details-tabs">
            <a href="#" className="tab-link active">General Details</a>
            <a href="#" className="tab-link">Documents</a>
            <a href="#" className="tab-link">Bank Details</a>
            <a href="#" className="tab-link">Loans</a>
            <a href="#" className="tab-link">Savings</a>
            <a href="#" className="tab-link">App and System</a>
        </nav>
      </div>

      <div className="details-content-card">
        <section className="info-section">
            <h2>Personal Information</h2>
            <div className="info-grid">
              <InfoDetail label="Full Name" value={user.personalInfo.fullName} />
              <InfoDetail label="Phone Number" value={user.phoneNumber} />
              <InfoDetail label="Email Address" value={user.email} />
              <InfoDetail label="Bvn" value={user.personalInfo.bvn} />
              <InfoDetail label="Gender" value={user.personalInfo.gender} />
              <InfoDetail label="Marital Status" value={user.personalInfo.maritalStatus} />
              <InfoDetail label="Children" value={user.personalInfo.children} />
              <InfoDetail label="Type of Residence" value={user.personalInfo.typeOfResidence} />
            </div>
        </section>

        <section className="info-section">
            <h2>Education and Employment</h2>
            <div className="info-grid">
              <InfoDetail label="Level of Education" value={user.educationAndEmployment.levelOfEducation} />
              <InfoDetail label="Employment Status" value={user.educationAndEmployment.employmentStatus} />
              <InfoDetail label="Sector of Employment" value={user.educationAndEmployment.sectorOfEmployment} />
              <InfoDetail label="Duration of Employment" value={user.educationAndEmployment.durationOfEmployment} />
              <InfoDetail label="Office Email" value={user.educationAndEmployment.officeEmail} />
              <InfoDetail label="Monthly Income" value={`₦${user.educationAndEmployment.monthlyIncome}`} />
              <InfoDetail label="Loan Repayment" value={`₦${user.educationAndEmployment.loanRepayment}`} />
            </div>
        </section>

        <section className="info-section">
            <h2>Socials</h2>
            <div className="info-grid">
                <InfoDetail label="Twitter" value={user.socials.twitter} />
                <InfoDetail label="Facebook" value={user.socials.facebook} />
                <InfoDetail label="Instagram" value={user.socials.instagram} />
            </div>
        </section>
        
        <section className="info-section">
            <h2>Guarantor</h2>
            {user.guarantors.map((guarantor, index) => (
                <div className="info-grid guarantor-grid" key={index}>
                    <InfoDetail label="Full Name" value={guarantor.name} />
                    <InfoDetail label="Phone Number" value={guarantor.phone} />
                    <InfoDetail label="Email Address" value={guarantor.email} />
                    <InfoDetail label="Relationship" value={guarantor.relationship} />
                </div>
            ))}
        </section>
      </div>
    </div>
  );
};

export default UserDetails;