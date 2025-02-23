import { useState, useEffect } from 'react';

const DATA_URL = 'https://gist.githubusercontent.com/Karthick1242004/a592ea1b1145419477d9bea28706ade8/raw/data.json';

interface Education {
  institution: string;
  degree: string;
  score: string;
  duration: string;
}

interface PersonalInfo {
  name: string;
  designation: string;
  about: string[];
  resumeLink: string;
}

interface Contact {
  email: string;
  phone: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
  };
}

interface Project {
  id: number;
  image: string;
  content: string;
  demoLink: string;
  githubLink: string;
  isHovered: boolean;
}

interface PortfolioData {
  personalInfo: PersonalInfo;
  education: Education[];
  contact: Contact;
  projects: Project[];
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
