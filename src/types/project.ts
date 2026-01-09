export interface Project {
  id: number
  title: string
  description: string,
  image: string
  images?: string[] // สำหรับ multiple images
  tech: string[]
  category: string
  githubUrl: string
  liveUrl: string
  date: string
  features: FeatureDetails[]
  link: string
  duration: string;
  challenges: string[]; // เปลี่ยนจาก string เป็น string[]
  demoUrl: string;
  videoUrl: string
  status: string;
  teamSize: string;
  impact?: string;
  role: string;
  
  // เพิ่ม fields ใหม่สำหรับการแสดงผลแบบเต็มใน Drawer
  scope?: string; // ขอบเขตโครงการ
  performance?: {
    loadTime?: string;
    bundleSize?: string;
    lighthouseScore?: number;
    [key: string]: string | number | undefined;
  };
  achievements?: string[]; // ความสำเร็จเพิ่มเติม
  architecture?: string; // อธิบาย architecture
  learnings?: string[]; // สิ่งที่ได้เรียนรู้จากโปรเจค
  nextSteps?: string; // แผนการพัฒนาต่อไป
  // สามารถเพิ่ม fields อื่นๆ ตามต้องการ
  stats?: {
    featuresCount?: number;
    techCount?: number;
    challengesCount?: number;
  };
  // Optional: สำหรับ Overview content แบบกำหนดเอง
  overview?: {
    th: string;
    en: string;
  };

  descriptionOverview?: {
    th: string;
    en: string;
  }
  // Optional: สำหรับ Goals แบบกำหนดเอง
  goals?: {
    th: string[];
    en: string[];
  };
}

export interface CaseStudy {
  problem: {
    th: string;
    en: string;
  };
  solution: {
    th: string;
    en: string;
  };
  result: {
    th: string;
    en: string;
  };
  metrics?: {
    label: string;
    value: string;
    improvement?: string;
  }[];
}

export interface ImpactDetails {
  impact: string;
  emoji: string;
  featureTitle: string;
  description: {
    th: string;
    en: string;
  };
  caseStudy?: CaseStudy; // Optional: เพิ่ม case study สำหรับแต่ละ feature
}

export interface FeatureDetails {
  emoji: string;
  featureTitle: string;
  description: {
    th: string;
    en: string;
  };
  caseStudy?: CaseStudy; // Optional: เพิ่ม case study สำหรับแต่ละ feature
}

// หรือถ้าต้องการแบ่งเป็น interface ที่ซับซ้อนขึ้น
export interface ProjectDetails {
  id: number
  title: string
  description: string
  image: string
  images?: string[]
  tech: string[]
  category: string
  githubUrl: string
  liveUrl: string
  date: string
  features: string[]
  link: string
  duration: string
  challenges: string[]
  demoUrl: string
  videoUrl: string
  status: string
  teamSize: string
  impact?: string
  role: string
  
  // Metadata สำหรับการจัดกลุ่ม
  metadata?: {
    client?: string
    industry?: string
    platform?: string[]
    timeline?: {
      start: string
      end: string
    }
  }
  
  // Technical details
  technicalDetails?: {
    architecture?: string
    designPatterns?: string[]
    testing?: string[]
    deployment?: string[]
    performance?: Record<string, number | string>
    accessibility?: boolean
    seoScore?: number
    lighthouseScore?: {
      performance: number
      accessibility: number
      bestPractices: number
      seo: number
    }
  }
  
  // Business/Impact metrics
  metrics?: {
    users?: string
    traffic?: string
    conversionRate?: string
    loadTime?: string
    uptime?: string
  }
  
  // Personal growth
  learnings?: {
    technical: string[]
    softSkills: string[]
    challengesOvercome: string[]
  }
  
  // Visual assets
  assets?: {
    screenshots?: string[]
    mockups?: string[]
    diagrams?: string[]
    videos?: string[]
  }
}