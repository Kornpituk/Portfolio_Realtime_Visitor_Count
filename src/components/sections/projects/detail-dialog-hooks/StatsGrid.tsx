import { motion, Variants } from "framer-motion";
import { Zap, Code, Target, LucideIcon } from "lucide-react";

interface StatsGridProps {
  featureCount: number;
  project: {
    tech: string[];
  };
  challengeCount: number;
  onStatClick?: (tab: "features" | "tech" | "impact") => void; // เพิ่ม prop นี้
}

interface StatConfig {
  key: keyof StatsData;
  icon: LucideIcon;
  label: string;
  gradient: string;
  textColor: string;
  tab: "features" | "tech" | "impact"; // เพิ่ม property tab
}

interface StatsData {
  features: number;
  tech: number;
  challenges: number;
}

const statsConfig: StatConfig[] = [
  {
    key: "features",
    icon: Zap,
    label: "Features",
    gradient: "from-primary/5 to-primary/10",
    textColor: "from-primary to-primary/70",
    tab: "features",
  },
  {
    key: "tech",
    icon: Code,
    label: "Technologies",
    gradient: "from-secondary/5 to-secondary/10",
    textColor: "from-secondary to-secondary/70",
    tab: "tech",
  },
  {
    key: "challenges",
    icon: Target,
    label: "Challenges",
    gradient: "from-accent/5 to-accent/10",
    textColor: "from-accent to-accent/70",
    tab: "impact", // หรืออาจจะเปลี่ยนเป็น 'features' ถ้าต้องการให้เปิดที่ features tab
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      type: "spring" as const,
      stiffness: 400,
    },
  },
  tap: {
    scale: 0.98,
  },
};

export function StatsGrid({
  featureCount,
  project,
  challengeCount,
  onStatClick,
}: StatsGridProps) {
  const statsData: StatsData = {
    features: featureCount,
    tech: project.tech.length,
    challenges: challengeCount,
  };

  const handleCardClick = (tab: "features" | "tech" | "impact") => {
    onStatClick?.(tab);
  };

  return (
    <motion.div
      className="grid grid-cols-3 gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {statsConfig.map((stat, index) => {
        const Icon = stat.icon;
        const value = statsData[stat.key];

        return (
          <motion.button
            key={stat.key}
            type="button"
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleCardClick(stat.tab)}
            className={`
              relative flex flex-col items-center p-3 rounded-lg 
              border bg-gradient-to-br ${stat.gradient}
              overflow-hidden group cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-primary/50
              active:scale-[0.98] transition-transform
            `}
            aria-label={`View ${stat.label} details`}
          >
            {/* Hover glow effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
            />

            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeInOut" as const,
              }}
            >
              <Icon className="w-5 h-5 text-primary mb-2" />
            </motion.div>

            <motion.div
              key={value}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" as const, stiffness: 200 }}
              className={`text-2xl font-bold bg-gradient-to-r ${stat.textColor} bg-clip-text`}
            >
              {value}
            </motion.div>

            <div className="text-xs text-muted-foreground">{stat.label}</div>

            {/* Tooltip text สำหรับ mobile */}
            {/* <div className="absolute bottom-1 text-[10px] text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to view
            </div> */}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
