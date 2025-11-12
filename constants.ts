import { GitHubIcon, LinkedInIcon, MailIcon, LeetCodeIcon } from './components/ui/Icons';
import React from 'react';

export interface Project {
  title: string;
  tech: string[];
  description: string;
  github: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Predictive Maintenance for IoT",
    tech: ["Python", "Docker", "Streamlit", "XGBoost"],
    description: "A predictive system for IoT-connected manufacturing, enabling early fault detection and reducing downtime.",
    github: "https://github.com/Varma-N/Predictive-Maintenance-for-IoT-Connected-Manufacturing-Systems",
  },
  {
    title: "ETL Superstore Pipeline",
    tech: ["Python", "SQL", "Power BI", "Pandas"],
    description: "An automated ETL workflow that processes raw superstore data and visualizes insights on Power BI dashboards.",
    github: "https://github.com/Varma-N/ETL_Superstore_pipeline",
  },
  {
    title: "Real-Time EV Monitoring",
    tech: ["Python (Flask)", "SQLite", "JS (Chart.js)", "HTML/CSS"],
    description: "A real-time analytics dashboard for electric vehicles, providing monitoring and predictive insights.",
    github: "https://github.com/Varma-N/Real-Time-EV-Monitoring-And-Predictive-Analytics-Solution",
  },
  {
    title: "Student Management System",
    tech: ["Java", "Spring Boot"],
    description: "A robust Java-based Spring Boot application for managing student academic records efficiently.",
    github: "https://github.com/Varma-N/student-management-system",
  },
];

export const EDUCATION = [
    {
        degree: "B.Tech, Electronics & Communication Engineering",
        institution: "NRI Institute of Technology, Vijayawada",
        period: "Sep 2022 – May 2025",
        details: "CGPA: 8.57 / 10",
        description: "Built strong foundations in communication systems and digital logic, bridging software engineering and electronics."
    },
    {
        degree: "Diploma, Electronics & Communication Engineering",
        institution: "Sir C.R. Reddy Polytechnic",
        period: "",
        details: "Percentage: 95.97%",
        description: "Specialized in circuits and embedded systems, building analytical and problem-solving precision."
    }
];

export const CERTIFICATIONS = [
  "Microsoft Certified: Azure Fundamentals",
  "Oracle Certified Data Science Professional",
  "Infosys Springboard AI Internship",
  "Oracle Certified Generative AI Professional",
  "Databases and SQL for Data Science with Python",
  "Oracle Certified Foundations Associate",
  "Google AI Essentials",
  "Networking Essentials (Cisco)",
];

export const SOCIAL_LINKS = [
  { icon: GitHubIcon, href: "https://github.com/Varma-N" },
  { icon: LinkedInIcon, href: "https://www.linkedin.com/in/madan-gopal-varma-nandi/" },
  { icon: MailIcon, href: "mailto:gopalvarma1135@gmail.com" },
  { icon: LeetCodeIcon, href: "https://leetcode.com/u/NANDI_MADAN_GOPAL_VARMA/" },
];

export const TECH_STACK: string[] = [
    'Python',
    'JavaScript',
    'SQL',
    'Java',
    'React',
    'AngularJS',
    'Flask',
    'Docker',
    'Power BI',
    'MySQL',
    'SQLite',
    'Azure',
    'Git',
];