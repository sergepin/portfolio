import React, { useState } from "react";
import { getLangFromUrl, useTranslations } from "../i18n/utils";

const translations = {
  en: {
    title: "What I do?",
    categories: {
      "Frontend Development": {
        name: "Frontend Development",
        items: [
          "Development of scalable e-commerce platforms",
          "Migration and modernization of web apps (AngularJS to Angular, .NET to Next.js)",
          "Responsive UI with React, Angular, Vue and Next.js",
        ],
      },
      "Backend Development": {
        name: "Backend Development",
        items: [
          "RESTful API and GraphQL development with Node.js and NestJS",
          "Stored procedures and database management (PostgreSQL, MSSQL, MongoDB)",
          "Cloud services integration (AWS EC2, Lambda, S3)",
        ],
      },
      "AI Enthusiast": {
        name: "AI Enthusiast",
        items: [
          "Learning about machine learning with Python",
          "Experimenting with Generative AI tools and frameworks",
        ],
      },
    },
  },
  es: {
    title: "¿Qué hago?",
    categories: {
      "Frontend Development": {
        name: "Desarrollo Frontend",
        items: [
          "Desarrollo de plataformas e-commerce escalables",
          "Migración y modernización de apps web (AngularJS a Angular, .NET a Next.js)",
          "Interfaces responsivas con React, Angular, Vue y Next.js",
        ],
      },
      "Backend Development": {
        name: "Desarrollo Backend",
        items: [
          "Desarrollo de APIs RESTful y GraphQL con Node.js y NestJS",
          "Gestión de bases de datos y procedimientos almacenados (PostgreSQL, MSSQL, MongoDB)",
          "Integración de servicios en la nube (AWS EC2, Lambda, S3)",
        ],
      },
      "AI Enthusiast": {
        name: "Entusiasta de la IA",
        items: [
          "Aprendizaje de modelos de machine learning con Python",
          "Experimentación con herramientas y frameworks de IA generativa",
        ],
      },
    },
  },
};


const CategoryIcons = {
  "Frontend Development": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="w-6 h-6 text-[var(--color-primary)]"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  ),
  "Backend Development": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="w-6 h-6 text-[var(--color-primary)]"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  "AI Enthusiast": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="w-6 h-6 text-[var(--color-primary)]"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="10" rx="2"></rect>
      <circle cx="12" cy="5" r="2"></circle>
      <path d="M12 7v4"></path>
      <line x1="8" y1="16" x2="8" y2="16"></line>
      <line x1="16" y1="16" x2="16" y2="16"></line>
    </svg>
  ),
};

interface Props {
  url: URL;
}

const SkillsList: React.FC<Props> = ({ url }) => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const lang = getLangFromUrl(url) as keyof typeof translations;
  const t = translations[lang];

  const toggleItem = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <div className="text-left pt-3 md:pt-9">
      <h3 className="text-[var(--text-primary)] text-3xl md:text-4xl font-semibold md:mb-6">
        {t.title}
      </h3>
      <ul className="space-y-4 mt-4 text-lg">
        {Object.entries(t.categories).map(([key, category]) => (
          <li key={key} className="w-full">
            <div
              onClick={() => toggleItem(key)}
              className="md:w-[400px] w-full bg-[var(--bg-secondary)]/50 rounded-2xl text-left hover:bg-[var(--bg-secondary)] transition-all border border-[var(--border-color)] cursor-pointer overflow-hidden shadow-md backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 p-4">
                {CategoryIcons[key as keyof typeof CategoryIcons]}
                <div className="flex items-center gap-2 flex-grow justify-between">
                  <div className="min-w-0 max-w-[200px] md:max-w-none overflow-hidden">
                    <span className="block truncate text-[var(--text-primary)] text-lg">
                      {category.name}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-6 h-6 text-[var(--text-primary)] transform transition-transform flex-shrink-0 ${
                      openItem === key ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                  </svg>
                </div>
              </div>

              <div
                className={`transition-all duration-300 px-4 ${
                  openItem === key
                    ? "max-h-[500px] pb-4 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
                  {category.items.map((item: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <span className="pl-1 text-[var(--color-primary)]">•</span>
                      <li className="pl-3">{item}</li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsList;