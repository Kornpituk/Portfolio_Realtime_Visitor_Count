import { Zap, Code, Target } from 'lucide-react';

export const statsConfig = [
  {
    key: "features",
    icon: Zap,
    valueKey: "featureCount",
    label: "Features",
    gradient: "from-primary/5 to-primary/10",
    textColor: "from-primary to-primary/70",
  },
  {
    key: "tech",
    icon: Code,
    valueKey: "tech",
    label: "Technologies",
    gradient: "from-secondary/5 to-secondary/10",
    textColor: "from-secondary to-secondary/70",
  },
  {
    key: "challenges",
    icon: Target,
    valueKey: "challengeCount",
    label: "Challenges",
    gradient: "from-accent/5 to-accent/10",
    textColor: "from-accent to-accent/70",
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
  hover: { y: -5, scale: 1.02 },
};


