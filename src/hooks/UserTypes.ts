// // Define the User type based on the structure in db.json
// export interface User {
//   id: string;
//   organization: string;
//   username: string;
//   email: string;
//   phoneNumber: string;
//   dateJoined: string;
//   status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
//   avatar: string;
  
//   personalInfo: {
//     fullName: string,
//     bvn: string,
//     gender: string,
//     maritalStatus: string,
//     children: string,
//     typeOfResidence: string
//   };
//   financialInfo: {
//     accountBalance: string;
//     accountNumber: string,
//     bankName: string,
//     userTier: number
//   };
//   educationAndEmployment: {
//       levelOfEducation: string;
//       employmentStatus: string,
//       sectorOfEmployment: string,
//       durationOfEmployment: string,
//       officeEmail: string,
//       monthlyIncome: string,
//       loanRepayment: string
//   };
//   socials: {
//     facebook: string,
//     twitter: string,
//     instagram: string
//   };
//   guarantors: {
//     name: string;
//     phone: string;
//     email: string;
//     relationship: string;
//   }[];
// }



export type User = {
  id: string;
  orgName: string; // Changed from organization to match API
  userName: string; // Changed from username to match API
  email: string;
  phoneNumber: string;
  createdAt: string; // Changed from dateJoined
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  profile: {
    firstName: string;
    lastName: string;
    avatar: string;
    gender: string;
    bvn: string;
    address: string;
    currency: string;
    // These fields were likely in personalInfo, moved to profile
    phoneNumber: string;
    maritalStatus?: string; // Made optional
    children?: string; // Made optional
    typeOfResidence?: string; // Made optional
  };
  accountBalance: string;
  accountNumber: string;
  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: string[];
    loanRepayment: string;
  };
  socials: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  guarantor: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
    address: string;
  };
};
