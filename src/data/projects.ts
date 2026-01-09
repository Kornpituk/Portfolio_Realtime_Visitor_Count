/* eslint-disable @typescript-eslint/no-explicit-any */
// src/data/projects.ts

import { Project } from "@/types/project";

const generateImagePaths = (folder: any, count: any, prefix = "") =>
  Array.from(
    { length: count },
    (_, i) => `${folder}/${prefix}${String(i + 1).padStart(2, "0")}.png`
  );

// export type Project = {
//     id: number
//     title: string
//     description: string
//     image: string
//     category: string
//     link: string
//     tech: string[]
// }

// src/data/projects.ts
export const projectsMockData: Project[] = [

  {
    id: 2,
    title: "A Leading Multinational Specialty Chemical Manufacturer (Japanese Subsidiary)",
    description:
      "Developed a web-based Warehouse Management System (WMS) using Vue.js for a chemical manufacturing factory. The system replaces traditional Excel-based workflows for raw material receiving and shipping by consolidating processes such as receiving, planning, and shipping plans into a single web platform, enabling real-time tracking, reducing manual errors, and improving overall warehouse efficiency.",
    overview: {
      th: "พัฒนาเว็บ Warehouse Management System (WMS) ด้วย Vue.js สำหรับโรงงานผลิตสารเคมี เพื่อทดแทนกระบวนการทำงานเดิมที่ใช้เอกสาร Excel ในการรับ–จ่ายวัตถุดิบ ระบบรวบรวมขั้นตอนการทำงาน เช่น Receiving, Planning และ Shipping Plan มาไว้บนเว็บ ทำให้สามารถติดตามสถานะการทำงานได้แบบเรียลไทม์ ลดความผิดพลาดจากงานเอกสาร และเพิ่มประสิทธิภาพในการบริหารจัดการคลังสินค้า",
      en: "Developed a web-based Warehouse Management System (WMS) using Vue.js for a chemical manufacturing factory. The system replaces traditional Excel-based workflows for raw material receiving and shipping by consolidating processes such as receiving, planning, and shipping plans into a single web platform, enabling real-time tracking, reducing manual errors, and improving overall warehouse efficiency.",
    },
    images: [
      "/project/wms-skt/01.png",
      "/project/wms-skt/02.png",
      "/project/wms-skt/03.png",
      "/project/wms-skt/04.png",
      "/project/wms-skt/05.png",
    ],
    category: "Warehouse Manage System",
    tech: [
      "VueJs",
      "Pinia",
      "Vuetify",
      "Remix-icon",
      "JWT Token",
      "Gitlab",
      "Soucetree",
    ],
    link: "/public-pages/projects?id=2",
    demoUrl: "https://sktdev.easetrackwms.com/login",
    features: [
      {
        emoji: "🔐",
        featureTitle: "Authentication (JWT)",
        description: {
          th: "ระบบเข้าสู่ระบบด้วย JWT Token เมื่อผู้ใช้ Login สำเร็จ ระบบจะนำ Token ไปใช้งานกับทุก API Request และมีการจัดการสถานะผู้ใช้ผ่าน Context หาก Token หมดอายุหรือไม่มี Token ระบบจะบังคับให้กลับไปที่หน้า Login อัตโนมัติ",
          en: "Implemented JWT-based authentication. After successful login, the token is attached to every API request. A global auth context handles token validation and automatically redirects users to the Login page when the token is missing or expired.",
        },
        caseStudy: {
          problem: {
            th: "ระบบต้องรองรับผู้ใช้งานหลายบทบาท และมีการเรียก API จำนวนมาก หากไม่มีการจัดการ Session ที่ดี จะเกิดปัญหา Token หมดอายุ, Unauthorized access และผู้ใช้งานต้อง Login ซ้ำบ่อยครั้ง",
            en: "The system supports multiple user roles and frequent API calls. Without proper session management, token expiration and unauthorized access could occur, leading to poor user experience.",
          },
          solution: {
            th: "พัฒนาระบบ Authentication ด้วย JWT โดยจัดเก็บ Token ไว้ใน Global Context\n\n• แนบ Token ไปกับทุก API Request อัตโนมัติ\n• ตรวจสอบสถานะ Token ทุกครั้งที่เรียกใช้งาน\n• Redirect ผู้ใช้กลับไปหน้า Login เมื่อ Token หมดอายุหรือไม่พบ Token",
            en: "Implemented JWT-based authentication using a global application context.\n\n• Automatically attached JWT to all API requests\n• Centralized token validation\n• Auto-redirect to Login when token is missing or expired",
          },
          result: {
            th: "ระบบมีความปลอดภัยสูงขึ้น ลดปัญหา Session Error และทำให้ผู้ใช้งานไม่ต้องจัดการเรื่อง Authentication เอง",
            en: "Improved security and session reliability while providing a seamless authentication experience for users.",
          },
          metrics: [
            {
              label: "Session Timeout",
              value: "8 hours",
              improvement: "Reduced login frequency by 80%",
            },
            {
              label: "Unauthorized Access",
              value: "0 incidents",
              improvement: "100% prevention",
            },
          ],
        },
      },
      {
        emoji: "📦",
        featureTitle: "Stock Update",
        description: {
          th: "หน้าจอแสดงข้อมูล Stock ของสินค้าในรูปแบบตาราง ประกอบด้วยข้อมูล เช่น ชื่อสินค้า, Lot, จำนวน และวันหมดอายุ สามารถ Expand แถวเพื่อดูรายละเอียด Lot Batch ของสินค้าแต่ละรายการได้",
          en: "A stock overview page displaying product information in a table format, including product name, lot number, quantity, and expiration date. Each row can be expanded to view detailed lot batch information.",
        },
        caseStudy: {
          problem: {
            th: "ผู้ใช้งานต้องการดูข้อมูล Stock และ Lot Batch ของสินค้าอย่างรวดเร็ว แต่ข้อมูลมีหลายระดับ หากแยกหลายหน้า จะทำให้ใช้งานยากและเสียเวลา",
            en: "Users need to inspect stock and lot batch data quickly. Navigating between multiple pages reduces efficiency and clarity.",
          },
          solution: {
            th: "ออกแบบ Data Table ที่สามารถ Expand ได้\n\n• แสดงข้อมูลหลักในระดับ Product\n• Expand เพื่อดูรายละเอียด Lot Batch ในหน้าเดียว\n• ลดการเปลี่ยนหน้าและเพิ่มความเร็วในการตรวจสอบข้อมูล",
            en: "Designed an expandable data table that shows product-level data with inline lot batch details, eliminating unnecessary navigation.",
          },
          result: {
            th: "ผู้ใช้งานสามารถตรวจสอบสถานะ Stock ได้รวดเร็วและเข้าใจง่ายมากขึ้น",
            en: "Faster stock inspection and improved usability for warehouse operations.",
          },
          metrics: [
            {
              label: "Time to check stock",
              value: "30 seconds",
              improvement: "75% faster than previous system",
            },
            {
              label: "User satisfaction",
              value: "95%",
              improvement: "40% improvement in user feedback",
            },
          ],
        },
      },
      {
        emoji: "🧾",
        featureTitle: "Receiving Plan",
        description: {
          th: "ระบบจัดการแผนการรับวัตถุดิบ แบ่งออกเป็น 2 ส่วนหลัก:\n\n• Data Table สำหรับผู้จัดการ ใช้ดูภาพรวม, Approve/Cancel งาน, Filter ข้อมูล และ Export Excel\n\n• Form Input แบ่งเป็น 3 Tabs:\n  - Raw Material Receiving Form\n  - Raw Material Inspection Request Form\n  - Lorry Loading Check List\n\nฟอร์มทั้งหมดถูกพัฒนาจากเอกสาร Excel เดิม ให้สามารถกรอกข้อมูลและแนบไฟล์ COA ได้โดยตรง พร้อมระบบอนุมัติจากหัวหน้างานและผู้จัดการ",
          en: "A receiving management feature consisting of two main parts:\n\n• Data Table View for managers to review overall receiving data, approve/cancel tasks, filter records, and export to Excel\n\n• Form Input View with three tabs:\n  - Raw Material Receiving Form\n  - Raw Material Inspection Request Form\n  - Lorry Loading Check List\n\nAll forms are digital versions of existing Excel documents, supporting direct input, COA attachment, and approval workflows.",
        },
        caseStudy: {
          problem: {
            th: "กระบวนการ Receiving เดิมใช้ Excel ที่ต้องพิมพ์ออกมาเขียน ทำให้เกิดข้อผิดพลาด, เอกสารสูญหาย และไม่สามารถติดตามสถานะงานแบบ Real-time",
            en: "The receiving process relied on printed Excel forms, leading to errors, lost documents, and lack of real-time tracking.",
          },
          solution: {
            th: "พัฒนา Receiving Plan เป็นระบบดิจิทัล แบ่งเป็น 2 ส่วน\n\n• Data Table สำหรับ Manager ดูภาพรวม, Approve, Filter และ Export\n• Form Input 3 Tabs จำลองฟอร์ม Excel เดิม รองรับการกรอกข้อมูลและแนบ COA\n• มี Workflow การ Approve จากพนักงาน → หัวหน้างาน → Manager\n• พร้อมรองรับ Lorry Loading Check List ที่เปลี่ยนตามประเภทวัตถุดิบ (15 รูปแบบ)",
            en: "Digitized the entire receiving workflow with:\n\n• A manager-focused data table\n• Three form tabs replicating existing Excel documents\n• File attachment support (COA)\n• Approval workflow across multiple roles\n• Dynamic lorry loading forms based on material type",
          },
          result: {
            th: "ลดการใช้กระดาษ เพิ่มความถูกต้องของข้อมูล และทำให้สามารถติดตามสถานะ Receiving ได้แบบ End-to-End",
            en: "Eliminated paper-based processes, improved data accuracy, and enabled full workflow traceability.",
          },
          metrics: [
            {
              label: "Paper usage reduction",
              value: "100%",
              improvement: "Complete elimination of paper forms",
            },
            {
              label: "Processing time",
              value: "15 minutes",
              improvement: "60% faster processing",
            },
            {
              label: "Error rate",
              value: "< 1%",
              improvement: "90% reduction in data errors",
            },
          ],
        },
      },
      {
        emoji: "🏭",
        featureTitle: "Production Plan",
        description: {
          th: "ระบบจัดการแผนการผลิต แยกการใช้งานตามบทบาท:\n\n• Production Data Table สำหรับ Manager ใช้ตรวจสอบและอนุมัติแผนการผลิต\n• Batch Plan Table สำหรับพนักงาน ใช้วางแผนการผลิตในระดับ Lot Batch แบบ Multi-input",
          en: "Production planning system with role-based interfaces:\n\n• Production Data Table for managers to review and approve production plans\n• Batch Plan Table for staff to plan production at lot batch level with multi-input capabilities",
        },
        caseStudy: {
          problem: {
            th: "การวางแผนการผลิตต้องแยกบทบาทชัดเจนระหว่าง Manager และพนักงาน แต่ข้อมูลเชื่อมโยงกัน หากออกแบบไม่ดีจะทำให้การตรวจสอบและอนุมัติล่าช้า",
            en: "Production planning requires clear separation of roles while keeping data tightly connected across workflows.",
          },
          solution: {
            th: "แยกหน้าการใช้งานตาม Role\n\n• Production Data Table สำหรับ Manager ตรวจสอบและอนุมัติ\n• Batch Plan Table สำหรับพนักงาน วางแผนระดับ Lot Batch แบบ Multi-input\n• ทุกขั้นตอนเชื่อมต่อด้วย Approval Workflow",
            en: "Separated views by role:\n\n• A high-level production overview for managers\n• A detailed batch planning table for staff\n• Integrated approval and feedback workflow",
          },
          result: {
            th: "ลดความซับซ้อนของข้อมูล และเพิ่มความรวดเร็วในการตัดสินใจของ Manager",
            en: "Improved planning efficiency and faster decision-making for production management.",
          },
          metrics: [
            {
              label: "Planning time",
              value: "2 hours",
              improvement: "50% reduction in planning cycle",
            },
            {
              label: "Approval turnaround",
              value: "4 hours",
              improvement: "70% faster approval process",
            },
          ],
        },
      },
      {
        emoji: "🚚",
        featureTitle: "Shipment Plan",
        description: {
          th: "ระบบจัดการแผนการจัดส่งสินค้า แสดงข้อมูลในรูปแบบ Data Table ที่สามารถ Show/Hide คอลัมน์ตามแผนกได้ รองรับฟอร์ม 2 รูปแบบ (Standard และ Lorry-Flexi) พร้อมระบบ Approve และ Print เอกสาร",
          en: "Shipment planning system with dynamic data tables that adjust column visibility based on department. Supports two shipment form types (Standard and Lorry-Flexi) with integrated approval workflows and document printing.",
        },
        caseStudy: {
          problem: {
            th: "การจัดส่งต้องทำงานร่วมกันหลายแผนก แต่แต่ละแผนกต้องเห็นข้อมูลไม่เหมือนกัน และต้องมีการควบคุมสิทธิ์อย่างเข้มงวด",
            en: "Shipment planning involves multiple departments with different data requirements and strict permission control.",
          },
          solution: {
            th: "พัฒนา Data Table ที่\n\n• Show / Hide คอลัมน์ตามแผนก\n• ตรวจสอบสิทธิ์ทุก Input จาก Role และ Department\n• รองรับฟอร์ม 2 รูปแบบ (Standard / Lorry-Flexi) พร้อมระบบ Approve และ Print เอกสาร",
            en: "Built a role-aware shipment planning system with:\n\n• Dynamic column visibility\n• Permission-based input validation\n• Multiple shipment form types\n• Approval and document printing workflow",
          },
          result: {
            th: "ทุกแผนกทำงานร่วมกันได้ในระบบเดียว ลดความผิดพลาด และเพิ่มความโปร่งใสของกระบวนการจัดส่ง",
            en: "Enabled smooth cross-department collaboration with reduced errors and improved process transparency.",
          },
          metrics: [
            {
              label: "Cross-department coordination",
              value: "Seamless",
              improvement: "Eliminated manual coordination needs",
            },
            {
              label: "Shipping errors",
              value: "Near zero",
              improvement: "95% reduction in shipping mistakes",
            },
          ],
        },
      },
      {
        emoji: "🏷️",
        featureTitle: "Print Label",
        description: {
          th: "หน้าจอพิมพ์สติกเกอร์ติดสินค้า สามารถ Filter และค้นหาสินค้าได้ พิมพ์สติกเกอร์ได้ทั้งขนาดเล็กและปกติ",
          en: "Label printing interface with search and filtering capabilities. Supports printing of both small and standard-sized product labels.",
        },
        caseStudy: {
          problem: {
            th: "กระบวนการทำงานต้องใช้ Sticker ติดสินค้าในทุกขั้นตอน แต่การค้นหาและพิมพ์ข้อมูลทำได้ยาก",
            en: "Product labeling was inefficient and time-consuming without a centralized printing system.",
          },
          solution: {
            th: "พัฒนาหน้า Print Label ที่สามารถ\n\n• Filter และค้นหาสินค้า\n• พิมพ์ Sticker ได้ทั้งขนาดเล็กและปกติ",
            en: "Developed a dedicated label printing page with search, filtering, and multiple label size support.",
          },
          result: {
            th: "ลดเวลาในการเตรียมเอกสารและเพิ่มความต่อเนื่องของกระบวนการทำงาน",
            en: "Faster labeling process and improved operational consistency.",
          },
          metrics: [
            {
              label: "Label printing time",
              value: "1 minute",
              improvement: "80% faster than manual printing",
            },
            {
              label: "Label accuracy",
              value: "100%",
              improvement: "Eliminated mislabeling",
            },
          ],
        },
      },
      {
        emoji: "🔔",
        featureTitle: "Notification",
        description: {
          th: "ระบบแจ้งเตือนเมื่อสถานะงานเปลี่ยน ผู้ใช้จะได้รับการแจ้งเตือนและสามารถคลิกเข้าไปทำงานต่อได้ทันที",
          en: "Notification system that alerts users when task status changes, with direct navigation to relevant tasks.",
        },
        caseStudy: {
          problem: {
            th: "เมื่อสถานะงานเปลี่ยน ผู้ใช้งานไม่รู้ทันที ต้องเช็คหลายหน้า ทำให้การทำงานล่าช้า",
            en: "Users were not immediately aware of status changes, causing delays in task execution.",
          },
          solution: {
            th: "พัฒนา Notification System ที่แจ้งเตือนเมื่อสถานะงานเปลี่ยน และสามารถคลิกเข้าไปทำงานต่อได้ทันที",
            en: "Implemented a notification system that alerts users on status changes with direct navigation to related tasks.",
          },
          result: {
            th: "เพิ่มความเร็วในการทำงาน และลดการสื่อสารที่ไม่จำเป็นระหว่างทีม",
            en: "Improved responsiveness and reduced operational friction.",
          },
          metrics: [
            {
              label: "Response time",
              value: "Immediate",
              improvement: "Real-time notification delivery",
            },
            {
              label: "Manual follow-ups",
              value: "Reduced by 90%",
              improvement: "Significant reduction in communication overhead",
            },
          ],
        },
      },
    ],
    duration: "8 months",
    challenges: [""],
    date: "Sep 2024 - April 2025",
    videoUrl: "",
    status: "Completed phase 1, mainten and Updated Phase 2",
    teamSize: "",
    role: "frontend",
    githubUrl: "",
    liveUrl: "https://sktdev.easetrackwms.com/login",
    image: "/project/wms-skt/01.png",
    impact:
      "Digitized warehouse operations, eliminating paper-based processes and enabling real-time workflow tracking across multiple departments.",
  },
  {
    id: 3,
    title: "A Leading Publicly Listed Food Manufacturing & Consumer Goods Company in Thailand.",
    description:
      "Developed a web-based Warehouse Management System (WMS) using React and TypeScript for a chemical manufacturing factory. The system replaces traditional Excel-based workflows by consolidating raw material receiving, production planning, and shipment management into a single web platform, enabling real-time tracking, reducing manual errors, and improving overall warehouse and logistics efficiency.",
    overview: {
      th: "พัฒนาเว็บ Warehouse Management System (WMS) ด้วย React และ TypeScript เพื่อทดแทนกระบวนการทำงานเดิมที่ใช้เอกสาร Excel ระบบรองรับการทำงานของหลายแผนกภายในแพลตฟอร์มเดียว พร้อม Workflow ที่ซับซ้อน การกำหนดสิทธิ์ตาม Role และกระบวนการอนุมัติหลายขั้นตอน ช่วยเพิ่มประสิทธิภาพการทำงาน ลดข้อผิดพลาด และทำให้สามารถติดตามสถานะงานได้แบบ Real-time",

      en: "Developed a web-based Warehouse Management System (WMS) using React and TypeScript to replace manual, Excel-based workflows. The system supports cross-department operations with complex workflows, role-based access control, and multi-step approval processes, improving operational efficiency, reducing errors, and enabling real-time visibility across the organization.",
    },
    images: [
      "/project/nutrix/2.png",
      "/project/nutrix/3.png",
      "/project/nutrix/4.png",
      "/project/nutrix/5.png",
      "/project/nutrix/6.png",
      "/project/nutrix/7.png",
      "/project/nutrix/8.png",
    ],
    category: "Warehouse Manage System",
    tech: [
      "React",
      "Typescript",
      "Zustand",
      "Shadcn",
      "Lucide-Icon",
      "JWT Token",
      "Gitlab",
      "Soucetree",
    ],
    link: "/public-pages/projects?id=2",
    demoUrl: "https://sktdev.easetrackwms.com/login",
    features: [
      {
        emoji: "🔐",
        featureTitle: "Authentication",
        description: {
          th: "ระบบเข้าสู่ระบบผู้ใช้งาน โดยผู้ใช้สามารถ Login ด้วยบัญชีของระบบ เมื่อ Login สำเร็จ ระบบจะจัดเก็บ Token เพื่อใช้ตรวจสอบสิทธิ์ในการเข้าถึงข้อมูล และแสดงข้อมูลผู้ใช้งานภายในระบบตามสิทธิ์ที่ได้รับ",
          en: "User authentication system allowing users to log in with system credentials. After successful login, an access token is stored and used for authorization, enabling secure access to user-specific data.",
        },
        caseStudy: {
          problem: {
            th: "ระบบต้องรองรับผู้ใช้งานหลายบทบาท และมีการเรียกใช้งานข้อมูลจากหลายหน้าพร้อมกัน หากไม่มีระบบ Authentication ที่เหมาะสม จะเกิดปัญหาการเข้าถึงข้อมูลโดยไม่ได้รับอนุญาต และไม่สามารถระบุตัวตนผู้ใช้งานได้อย่างชัดเจน",
            en: "The system supports multiple user roles and frequent data access. Without proper authentication, unauthorized access and unclear user identity could compromise system security.",
          },
          solution: {
            th: "พัฒนาระบบ Authentication โดย\n\n• ให้ผู้ใช้ Login ด้วยบัญชีผู้ใช้ของระบบ\n• จัดเก็บ Token เพื่อนำไปตรวจสอบสิทธิ์การเข้าถึง\n• แสดงข้อมูลผู้ใช้งานภายในระบบตามสิทธิ์ที่กำหนด",
            en: "Implemented an authentication mechanism that:\n\n• Authenticates users via system credentials\n• Stores access tokens for authorization\n• Displays user profile information based on assigned permissions",
          },
          result: {
            th: "ระบบสามารถควบคุมการเข้าถึงข้อมูลได้อย่างปลอดภัย และทำให้การใช้งานในแต่ละบทบาทมีความชัดเจนมากขึ้น",
            en: "Improved access control and ensured secure, role-based system usage.",
          },
          metrics: [
            {
              label: "Unauthorized access",
              value: "0 incidents",
              improvement: "Prevented unauthorized data access",
            },
          ],
        },
      },

      {
        emoji: "📥",
        featureTitle: "Receiving Management",
        description: {
          th: "ระบบจัดการกระบวนการรับสินค้า (Receiving) รองรับทั้งการรับสินค้าจากใบสั่งซื้อ (PO) ที่เชื่อมต่อจากระบบ Epicor และการรับสินค้าที่ไม่มาจาก PO เช่น การคืนสินค้าจากลูกค้า หรือการรับจากแหล่งอื่น ๆ",
          en: "Receiving management system supporting both PO-based receiving integrated with Epicor and non-PO receiving such as customer returns or external sources.",
        },
        caseStudy: {
          problem: {
            th: "กระบวนการรับสินค้ามีหลายรูปแบบ หากใช้วิธีบันทึกข้อมูลแบบเดียวกันทั้งหมด จะเกิดข้อผิดพลาด และไม่สามารถแยกที่มาของสินค้าได้อย่างชัดเจน",
            en: "Different receiving scenarios require different handling. Using a single process increases errors and reduces traceability.",
          },
          solution: {
            th: "ออกแบบระบบ Receiving ให้แยกตามประเภทการรับสินค้า\n\n• รับสินค้าจาก PO ที่เชื่อมต่อข้อมูลจาก Epicor\n• รับสินค้าที่ไม่มาจาก PO (Other Receiving)\n• ใช้ Workflow การตรวจสอบและอนุมัติในทุกกรณี",
            en: "Designed a receiving system that:\n\n• Separates PO and non-PO receiving flows\n• Integrates PO data from Epicor\n• Applies validation and approval workflows consistently",
          },
          result: {
            th: "ลดข้อผิดพลาดในการรับสินค้า และเพิ่มความชัดเจนของแหล่งที่มาของสินค้าในระบบ",
            en: "Reduced receiving errors and improved source traceability.",
          },
          metrics: [
            {
              label: "Receiving accuracy",
              value: "> 99%",
              improvement: "Significant reduction in data discrepancies",
            },
          ],
        },
      },

      {
        emoji: "🔍",
        featureTitle: "Receiving Request & Inspection Workflow",
        description: {
          th: "ระบบสร้างใบ Request การรับสินค้า การตรวจสอบ (Inspection) และการอนุมัติแบบเป็นขั้นตอน สามารถทำงานได้ทั้งบน Web และ Mobile โดยใช้ React Hook Form และ Zod ในการตรวจสอบความถูกต้องของข้อมูล",
          en: "A request, inspection, and approval workflow available on both web and mobile platforms, utilizing React Hook Form and Zod for form validation.",
        },
        caseStudy: {
          problem: {
            th: "กระบวนการตรวจสอบสินค้าต้องทำงานร่วมกันหลายบทบาท หากไม่มี Workflow ที่ชัดเจน จะเกิดความล่าช้าและข้อมูลไม่ครบถ้วน",
            en: "Inspection requires collaboration across multiple roles. Without a clear workflow, delays and incomplete data can occur.",
          },
          solution: {
            th: "พัฒนา Workflow การทำงานแบบเป็นขั้นตอน\n\n• สร้างใบ Request การรับสินค้า\n• ตรวจสอบสินค้า (Inspection) ผ่าน Web หรือ Mobile\n• ส่งข้อมูลให้หัวหน้าตรวจสอบและ Manager อนุมัติ\n• ดำเนินการรับสินค้าเมื่อได้รับการอนุมัติ",
            en: "Implemented a step-based workflow:\n\n• Create receiving requests\n• Perform inspection on web or mobile\n• Submit for supervisor review and manager approval\n• Complete receiving after approval",
          },
          result: {
            th: "กระบวนการรับสินค้าเป็นระบบมากขึ้น ลดความล่าช้า และสามารถติดตามสถานะงานได้ชัดเจน",
            en: "Streamlined receiving operations with improved traceability and faster approvals.",
          },
          metrics: [
            {
              label: "Approval turnaround",
              value: "Reduced by 60%",
              improvement: "Faster inspection-to-receiving process",
            },
          ],
        },
      },

      {
        emoji: "🖨️",
        featureTitle: "Print Label & QR Code",
        description: {
          th: "ระบบพิมพ์ Label และ QR Code สำหรับติดสินค้าและวัตถุดิบในกระบวนการทำงานต่าง ๆ เพื่อช่วยในการระบุตัวตนและติดตามสินค้า",
          en: "Label and QR code printing system for identifying and tracking products and raw materials throughout operational workflows.",
        },
        caseStudy: {
          problem: {
            th: "การติดตามสินค้าในหน้างานทำได้ยาก หากไม่มีสัญลักษณ์หรือรหัสที่เป็นมาตรฐานเดียวกัน",
            en: "Tracking products on the shop floor is difficult without standardized identification.",
          },
          solution: {
            th: "พัฒนาระบบพิมพ์ Label และ QR Code ที่สามารถใช้งานได้ในหลายขั้นตอนของกระบวนการทำงาน",
            en: "Developed a unified label and QR code printing system used across multiple operational steps.",
          },
          result: {
            th: "เพิ่มความถูกต้องในการระบุสินค้า และลดความผิดพลาดในการทำงานหน้างาน",
            en: "Improved product identification accuracy and reduced operational mistakes.",
          },
          metrics: [
            {
              label: "Identification errors",
              value: "Near zero",
              improvement: "Significant reduction in misidentification",
            },
          ],
        },
      },
    ],
    // Project Goals
    goals: {
      th: [
        "เพิ่มประสิทธิภาพการทำงาน",
        "ลดข้อผิดพลาดจากการใช้เอกสาร",
        "เพิ่มความโปร่งใสของข้อมูลแบบ Real-time",
        "ทำให้ทุกแผนกสามารถทำงานร่วมกันได้อย่างเป็นระบบ",
        "ตรวจสอบย้อนหลังและติดตามงานได้",
      ],
      en: [
        "Improve operational efficiency",
        "Reduce human error from manual processes",
        "Provide real-time visibility across departments",
        "Enable structured cross-departmental collaboration",
        "Provide traceable and auditable workflows",
      ],
    },
    duration: "2 months",
    challenges: [
      "Complex form validation logic matching Excel calculations",
      "Multi-role permission system with dynamic UI rendering",
      "Real-time notification system integration",
      "Legacy Excel format conversion maintaining data integrity",
      "Dynamic lorry loading checklist supporting 15+ material types",
    ],
    videoUrl: "",
    status: "Completed feature 1",
    teamSize: "15",
    role: "Frontend Developer",
    date: "Oct 2025 - Nov 2025",
    githubUrl: "",
    liveUrl: "https://sktdev.easetrackwms.com/login",
    image: "/project/nutrix/4.png",
    impact:
      "Digitized warehouse operations, eliminating paper-based processes and enabling real-time workflow tracking across multiple departments.",
    scope: "Enterprise-level WMS for manufacturing industry",
    performance: {
      loadTime: "< 2s",
      bundleSize: "< 500KB",
      lighthouseScore: 92,
    },
  },
  // {
  //   id: 4,
  //   title: "WMS original Smart Reform Plus Co., Ltd.",
  //   description:
  //     "Frontend VueJs,Authentication JWT token, planner, receviep, shipment, and admin dashboard.",
  //   images: ["/project/wms-skt/00.png"],
  //   category: "Warehouse Manage System",
  //   tech: [
  //     "React",
  //     "Typescript",
  //     "Zustand",
  //     "Shadcn",
  //     "Lucide-Icon",
  //     "JWT Token",
  //     "Gitlab",
  //     "Soucetree",
  //   ],
  //   link: "/public-pages/projects?id=2",
  //   demoUrl: "https://sktdev.easetrackwms.com/login",
  //   features: [
  //     {
  //       emoji: "🔐",
  //       featureTitle: "Authentication (JWT)",
  //       description: {
  //         th: "ระบบเข้าสู่ระบบด้วย JWT Token เมื่อผู้ใช้ Login สำเร็จ ระบบจะนำ Token ไปใช้งานกับทุก API Request และมีการจัดการสถานะผู้ใช้ผ่าน Context หาก Token หมดอายุหรือไม่มี Token ระบบจะบังคับให้กลับไปที่หน้า Login อัตโนมัติ",
  //         en: "Implemented JWT-based authentication. After successful login, the token is attached to every API request. A global auth context handles token validation and automatically redirects users to the Login page when the token is missing or expired.",
  //       },
  //       caseStudy: {
  //         problem: {
  //           th: "ระบบต้องรองรับผู้ใช้งานหลายบทบาท และมีการเรียก API จำนวนมาก หากไม่มีการจัดการ Session ที่ดี จะเกิดปัญหา Token หมดอายุ, Unauthorized access และผู้ใช้งานต้อง Login ซ้ำบ่อยครั้ง",
  //           en: "The system supports multiple user roles and frequent API calls. Without proper session management, token expiration and unauthorized access could occur, leading to poor user experience.",
  //         },
  //         solution: {
  //           th: "พัฒนาระบบ Authentication ด้วย JWT โดยจัดเก็บ Token ไว้ใน Global Context\n\n• แนบ Token ไปกับทุก API Request อัตโนมัติ\n• ตรวจสอบสถานะ Token ทุกครั้งที่เรียกใช้งาน\n• Redirect ผู้ใช้กลับไปหน้า Login เมื่อ Token หมดอายุหรือไม่พบ Token",
  //           en: "Implemented JWT-based authentication using a global application context.\n\n• Automatically attached JWT to all API requests\n• Centralized token validation\n• Auto-redirect to Login when token is missing or expired",
  //         },
  //         result: {
  //           th: "ระบบมีความปลอดภัยสูงขึ้น ลดปัญหา Session Error และทำให้ผู้ใช้งานไม่ต้องจัดการเรื่อง Authentication เอง",
  //           en: "Improved security and session reliability while providing a seamless authentication experience for users.",
  //         },
  //         metrics: [
  //           {
  //             label: "Session Timeout",
  //             value: "8 hours",
  //             improvement: "Reduced login frequency by 80%",
  //           },
  //           {
  //             label: "Unauthorized Access",
  //             value: "0 incidents",
  //             improvement: "100% prevention",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       emoji: "📦",
  //       featureTitle: "Stock Update",
  //       description: {
  //         th: "หน้าจอแสดงข้อมูล Stock ของสินค้าในรูปแบบตาราง ประกอบด้วยข้อมูล เช่น ชื่อสินค้า, Lot, จำนวน และวันหมดอายุ สามารถ Expand แถวเพื่อดูรายละเอียด Lot Batch ของสินค้าแต่ละรายการได้",
  //         en: "A stock overview page displaying product information in a table format, including product name, lot number, quantity, and expiration date. Each row can be expanded to view detailed lot batch information.",
  //       },
  //       caseStudy: {
  //         problem: {
  //           th: "ผู้ใช้งานต้องการดูข้อมูล Stock และ Lot Batch ของสินค้าอย่างรวดเร็ว แต่ข้อมูลมีหลายระดับ หากแยกหลายหน้า จะทำให้ใช้งานยากและเสียเวลา",
  //           en: "Users need to inspect stock and lot batch data quickly. Navigating between multiple pages reduces efficiency and clarity.",
  //         },
  //         solution: {
  //           th: "ออกแบบ Data Table ที่สามารถ Expand ได้\n\n• แสดงข้อมูลหลักในระดับ Product\n• Expand เพื่อดูรายละเอียด Lot Batch ในหน้าเดียว\n• ลดการเปลี่ยนหน้าและเพิ่มความเร็วในการตรวจสอบข้อมูล",
  //           en: "Designed an expandable data table that shows product-level data with inline lot batch details, eliminating unnecessary navigation.",
  //         },
  //         result: {
  //           th: "ผู้ใช้งานสามารถตรวจสอบสถานะ Stock ได้รวดเร็วและเข้าใจง่ายมากขึ้น",
  //           en: "Faster stock inspection and improved usability for warehouse operations.",
  //         },
  //         metrics: [
  //           {
  //             label: "Time to check stock",
  //             value: "30 seconds",
  //             improvement: "75% faster than previous system",
  //           },
  //           {
  //             label: "User satisfaction",
  //             value: "95%",
  //             improvement: "40% improvement in user feedback",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       emoji: "🧾",
  //       featureTitle: "Receiving Plan",
  //       description: {
  //         th: "ระบบจัดการแผนการรับวัตถุดิบ แบ่งออกเป็น 2 ส่วนหลัก:\n\n• Data Table สำหรับผู้จัดการ ใช้ดูภาพรวม, Approve/Cancel งาน, Filter ข้อมูล และ Export Excel\n\n• Form Input แบ่งเป็น 3 Tabs:\n  - Raw Material Receiving Form\n  - Raw Material Inspection Request Form\n  - Lorry Loading Check List\n\nฟอร์มทั้งหมดถูกพัฒนาจากเอกสาร Excel เดิม ให้สามารถกรอกข้อมูลและแนบไฟล์ COA ได้โดยตรง พร้อมระบบอนุมัติจากหัวหน้างานและผู้จัดการ",
  //         en: "A receiving management feature consisting of two main parts:\n\n• Data Table View for managers to review overall receiving data, approve/cancel tasks, filter records, and export to Excel\n\n• Form Input View with three tabs:\n  - Raw Material Receiving Form\n  - Raw Material Inspection Request Form\n  - Lorry Loading Check List\n\nAll forms are digital versions of existing Excel documents, supporting direct input, COA attachment, and approval workflows.",
  //       },
  //       caseStudy: {
  //         problem: {
  //           th: "กระบวนการ Receiving เดิมใช้ Excel ที่ต้องพิมพ์ออกมาเขียน ทำให้เกิดข้อผิดพลาด, เอกสารสูญหาย และไม่สามารถติดตามสถานะงานแบบ Real-time",
  //           en: "The receiving process relied on printed Excel forms, leading to errors, lost documents, and lack of real-time tracking.",
  //         },
  //         solution: {
  //           th: "พัฒนา Receiving Plan เป็นระบบดิจิทัล แบ่งเป็น 2 ส่วน\n\n• Data Table สำหรับ Manager ดูภาพรวม, Approve, Filter และ Export\n• Form Input 3 Tabs จำลองฟอร์ม Excel เดิม รองรับการกรอกข้อมูลและแนบ COA\n• มี Workflow การ Approve จากพนักงาน → หัวหน้างาน → Manager\n• พร้อมรองรับ Lorry Loading Check List ที่เปลี่ยนตามประเภทวัตถุดิบ (15 รูปแบบ)",
  //           en: "Digitized the entire receiving workflow with:\n\n• A manager-focused data table\n• Three form tabs replicating existing Excel documents\n• File attachment support (COA)\n• Approval workflow across multiple roles\n• Dynamic lorry loading forms based on material type",
  //         },
  //         result: {
  //           th: "ลดการใช้กระดาษ เพิ่มความถูกต้องของข้อมูล และทำให้สามารถติดตามสถานะ Receiving ได้แบบ End-to-End",
  //           en: "Eliminated paper-based processes, improved data accuracy, and enabled full workflow traceability.",
  //         },
  //         metrics: [
  //           {
  //             label: "Paper usage reduction",
  //             value: "100%",
  //             improvement: "Complete elimination of paper forms",
  //           },
  //           {
  //             label: "Processing time",
  //             value: "15 minutes",
  //             improvement: "60% faster processing",
  //           },
  //           {
  //             label: "Error rate",
  //             value: "< 1%",
  //             improvement: "90% reduction in data errors",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       emoji: "🏭",
  //       featureTitle: "Production Plan",
  //       description: {
  //         th: "ระบบจัดการแผนการผลิต แยกการใช้งานตามบทบาท:\n\n• Production Data Table สำหรับ Manager ใช้ตรวจสอบและอนุมัติแผนการผลิต\n• Batch Plan Table สำหรับพนักงาน ใช้วางแผนการผลิตในระดับ Lot Batch แบบ Multi-input",
  //         en: "Production planning system with role-based interfaces:\n\n• Production Data Table for managers to review and approve production plans\n• Batch Plan Table for staff to plan production at lot batch level with multi-input capabilities",
  //       },
  //       caseStudy: {
  //         problem: {
  //           th: "การวางแผนการผลิตต้องแยกบทบาทชัดเจนระหว่าง Manager และพนักงาน แต่ข้อมูลเชื่อมโยงกัน หากออกแบบไม่ดีจะทำให้การตรวจสอบและอนุมัติล่าช้า",
  //           en: "Production planning requires clear separation of roles while keeping data tightly connected across workflows.",
  //         },
  //         solution: {
  //           th: "แยกหน้าการใช้งานตาม Role\n\n• Production Data Table สำหรับ Manager ตรวจสอบและอนุมัติ\n• Batch Plan Table สำหรับพนักงาน วางแผนระดับ Lot Batch แบบ Multi-input\n• ทุกขั้นตอนเชื่อมต่อด้วย Approval Workflow",
  //           en: "Separated views by role:\n\n• A high-level production overview for managers\n• A detailed batch planning table for staff\n• Integrated approval and feedback workflow",
  //         },
  //         result: {
  //           th: "ลดความซับซ้อนของข้อมูล และเพิ่มความรวดเร็วในการตัดสินใจของ Manager",
  //           en: "Improved planning efficiency and faster decision-making for production management.",
  //         },
  //         metrics: [
  //           {
  //             label: "Planning time",
  //             value: "2 hours",
  //             improvement: "50% reduction in planning cycle",
  //           },
  //           {
  //             label: "Approval turnaround",
  //             value: "4 hours",
  //             improvement: "70% faster approval process",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       emoji: "🚚",
  //       featureTitle: "Shipment Plan",
  //       description: {
  //         th: "ระบบจัดการแผนการจัดส่งสินค้า แสดงข้อมูลในรูปแบบ Data Table ที่สามารถ Show/Hide คอลัมน์ตามแผนกได้ รองรับฟอร์ม 2 รูปแบบ (Standard และ Lorry-Flexi) พร้อมระบบ Approve และ Print เอกสาร",
  //         en: "Shipment planning system with dynamic data tables that adjust column visibility based on department. Supports two shipment form types (Standard and Lorry-Flexi) with integrated approval workflows and document printing.",
  //       },
  //       caseStudy: {
  //         problem: {
  //           th: "การจัดส่งต้องทำงานร่วมกันหลายแผนก แต่แต่ละแผนกต้องเห็นข้อมูลไม่เหมือนกัน และต้องมีการควบคุมสิทธิ์อย่างเข้มงวด",
  //           en: "Shipment planning involves multiple departments with different data requirements and strict permission control.",
  //         },
  //         solution: {
  //           th: "พัฒนา Data Table ที่\n\n• Show / Hide คอลัมน์ตามแผนก\n• ตรวจสอบสิทธิ์ทุก Input จาก Role และ Department\n• รองรับฟอร์ม 2 รูปแบบ (Standard / Lorry-Flexi) พร้อมระบบ Approve และ Print เอกสาร",
  //           en: "Built a role-aware shipment planning system with:\n\n• Dynamic column visibility\n• Permission-based input validation\n• Multiple shipment form types\n• Approval and document printing workflow",
  //         },
  //         result: {
  //           th: "ทุกแผนกทำงานร่วมกันได้ในระบบเดียว ลดความผิดพลาด และเพิ่มความโปร่งใสของกระบวนการจัดส่ง",
  //           en: "Enabled smooth cross-department collaboration with reduced errors and improved process transparency.",
  //         },
  //         metrics: [
  //           {
  //             label: "Cross-department coordination",
  //             value: "Seamless",
  //             improvement: "Eliminated manual coordination needs",
  //           },
  //           {
  //             label: "Shipping errors",
  //             value: "Near zero",
  //             improvement: "95% reduction in shipping mistakes",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       emoji: "🏷️",
  //       featureTitle: "Print Label",
  //       description: {
  //         th: "หน้าจอพิมพ์สติกเกอร์ติดสินค้า สามารถ Filter และค้นหาสินค้าได้ พิมพ์สติกเกอร์ได้ทั้งขนาดเล็กและปกติ",
  //         en: "Label printing interface with search and filtering capabilities. Supports printing of both small and standard-sized product labels.",
  //       },
  //       caseStudy: {
  //         problem: {
  //           th: "กระบวนการทำงานต้องใช้ Sticker ติดสินค้าในทุกขั้นตอน แต่การค้นหาและพิมพ์ข้อมูลทำได้ยาก",
  //           en: "Product labeling was inefficient and time-consuming without a centralized printing system.",
  //         },
  //         solution: {
  //           th: "พัฒนาหน้า Print Label ที่สามารถ\n\n• Filter และค้นหาสินค้า\n• พิมพ์ Sticker ได้ทั้งขนาดเล็กและปกติ",
  //           en: "Developed a dedicated label printing page with search, filtering, and multiple label size support.",
  //         },
  //         result: {
  //           th: "ลดเวลาในการเตรียมเอกสารและเพิ่มความต่อเนื่องของกระบวนการทำงาน",
  //           en: "Faster labeling process and improved operational consistency.",
  //         },
  //         metrics: [
  //           {
  //             label: "Label printing time",
  //             value: "1 minute",
  //             improvement: "80% faster than manual printing",
  //           },
  //           {
  //             label: "Label accuracy",
  //             value: "100%",
  //             improvement: "Eliminated mislabeling",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       emoji: "🔔",
  //       featureTitle: "Notification",
  //       description: {
  //         th: "ระบบแจ้งเตือนเมื่อสถานะงานเปลี่ยน ผู้ใช้จะได้รับการแจ้งเตือนและสามารถคลิกเข้าไปทำงานต่อได้ทันที",
  //         en: "Notification system that alerts users when task status changes, with direct navigation to relevant tasks.",
  //       },
  //       caseStudy: {
  //         problem: {
  //           th: "เมื่อสถานะงานเปลี่ยน ผู้ใช้งานไม่รู้ทันที ต้องเช็คหลายหน้า ทำให้การทำงานล่าช้า",
  //           en: "Users were not immediately aware of status changes, causing delays in task execution.",
  //         },
  //         solution: {
  //           th: "พัฒนา Notification System ที่แจ้งเตือนเมื่อสถานะงานเปลี่ยน และสามารถคลิกเข้าไปทำงานต่อได้ทันที",
  //           en: "Implemented a notification system that alerts users on status changes with direct navigation to related tasks.",
  //         },
  //         result: {
  //           th: "เพิ่มความเร็วในการทำงาน และลดการสื่อสารที่ไม่จำเป็นระหว่างทีม",
  //           en: "Improved responsiveness and reduced operational friction.",
  //         },
  //         metrics: [
  //           {
  //             label: "Response time",
  //             value: "Immediate",
  //             improvement: "Real-time notification delivery",
  //           },
  //           {
  //             label: "Manual follow-ups",
  //             value: "Reduced by 90%",
  //             improvement: "Significant reduction in communication overhead",
  //           },
  //         ],
  //       },
  //     },
  //   ],
  //   duration: "8 months",
  //   challenges: [""],
  //   videoUrl: "",
  //   status: "Inprocess",
  //   teamSize: "",
  //   role: "frontend",
  //   githubUrl: "",
  //   liveUrl: "https://sktdev.easetrackwms.com/login",
  //   date: "",
  //   image: "/project/srp/01.png",
  // },
  {
    id: 15,
    title: "Task Manager",
    description:
      "My personal portfolio built with Next.js, Tailwind, shadcn/ui.",
    images: ["/project/task_manage/01.png", "/project/task_manage/02.png"],
    image: "/project/task_manage/01.png",
    category: "Web Development",
    tech: [
      "Next.js",
      "Superbase - Prosgress",
      "Tailwind",
      "TypeScript",
      "hero-UI",
      "Lucide-Icon",
    ],
    link: "/public-pages/projects?id=1",
    demoUrl: "https://nextjs-task-manager-app-nu.vercel.app/",
    features: [],
    duration: "duration",
    challenges: ["challenges"],
    videoUrl: "",
    status: "status",
    teamSize: "teamSize",
    role: "role",
    githubUrl: "https://github.com/Kornpituk/NEXTJS-task-manager-app",
    liveUrl: "https://nextjs-task-manager-app-nu.vercel.app/",
    date: "",
  },
];
