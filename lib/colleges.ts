import collegesJson from './colleges.json';

export interface College {
  id: string; // matches slug for SEO route consistency
  slug: string;
  name: string;
  logo: string;
  color: string;
  location: string;
  feeNum: number; // in lakhs (e.g. 1.99)
  feeText: string;
  accreditation: string;
  packageNum: number; // in LPA (e.g. 8.5)
  packageText: string;
  topSpecialization: string;
  exams: string;
  mode: string;
  lms: string;
  rating: number;
  about: string;
  highlights: string[];
  duration: string;
  approvals: string;
  whatsapp: string;
  tier: string;
  programs: string[];
}

export const collegesData = collegesJson as College[];
