'use client';

import { motion } from 'framer-motion';

interface TimelineItem {
  title: string;
  role: string;
  period: string;
  description: string;
  skills: string[];
}

export default function ExperienceTimeline() {
  const experiences: TimelineItem[] = [
    {
      title: "Backend Developer",
      role: "NestJS Developer",
      period: "2022 - Present",
      description: "Developing scalable backend services using NestJS, GraphQL, and MongoDB. Implementing authentication systems, RESTful APIs, and database integrations.",
      skills: ["NestJS", "GraphQL", "MongoDB", "TypeScript", "AWS"]
    },
    {
      title: "Full Stack Developer",
      role: "Web Developer",
      period: "2020 - 2022",
      description: "Built responsive web applications using React and Node.js. Worked on database design, API development, and frontend implementation.",
      skills: ["React", "Node.js", "Express", "PostgreSQL", "JavaScript"]
    },
    {
      title: "Junior Developer",
      role: "Frontend Specialist",
      period: "2019 - 2020",
      description: "Developed user interfaces using modern JavaScript frameworks. Collaborated with designers to implement pixel-perfect designs.",
      skills: ["HTML/CSS", "JavaScript", "React", "UI/UX", "Git"]
    }
  ];

  return (
    <div className="py-10">
      <h3 className="text-2xl font-bold mb-12 text-center">Professional Experience</h3>

      <div className="relative border-l-2 border-green-500 ml-6 md:ml-12 pl-8 space-y-10">
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[42px] h-6 w-6 rounded-full bg-green-500 border-4 border-white dark:border-gray-900 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-white"></div>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">{experience.title}</h4>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium mt-1 md:mt-0">
                  {experience.period}
                </span>
              </div>

              <p className="text-md text-gray-600 dark:text-gray-300 mb-4">
                <span className="font-medium">{experience.role}</span>
              </p>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {experience.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}