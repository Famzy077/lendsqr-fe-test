import React from 'react';
import { Eye, UserX, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ActionPopover.scss';

const ActionPopover = ({ userId }: { userId: string }) => {
  const navigate = useNavigate();
  const handleViewDetails = () => {
    navigate(`/dashboard/user/${userId}`);
  };
  return (
    <div className="action-popover">
        <ul>
          <li onClick={handleViewDetails}>
            <Eye size={16} />
            <span>View Details</span>
          </li>
          <li>
            <UserX size={16} />
            <span>Blacklist User</span>
          </li>
          <li>
            <UserCheck size={16} />
            <span>Activate User</span>
          </li>
        </ul>
    </div>
  );
};

export default ActionPopover;