// Define the User type based on the structure in db.json
export interface User {
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
}
