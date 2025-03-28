export interface ResumeData {
  basics: Basics;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  interests: Interest[];
}

export interface Basics {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  summary: string;
  location: Location;
  profiles: Profile[];
}

export interface Location {
  address: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
}

export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Experience {
  company: string;
  position: string;
  website: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  gpa: string;
  courses: string[];
}

export interface Skill {
  name: string;
  level: string;
  keywords: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url: string;
  images: string[];
}

export interface Interest {
  name: string;
  description: string;
  keywords: string[];
} 