'use client';

import { motion } from 'framer-motion';
// Remove the Next.js Image import
// import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: 'E-Commerce API',
    description: 'A scalable e-commerce backend built with NestJS and PostgreSQL',
    image: '/project1.jpg',
    technologies: ['NestJS', 'PostgreSQL', 'TypeScript'],
    link: '#'
  },
  {
    title: 'Real-time Chat App',
    description: 'A real-time chat application using WebSockets and MongoDB',
    image: '/project2.jpg',
    technologies: ['NestJS', 'MongoDB', 'WebSocket'],
    link: '#'
  },
  {
    title: 'Task Management System',
    description: 'A full-stack task management system with authentication',
    image: '/project3.jpg',
    technologies: ['NestJS', 'React', 'JWT'],
    link: '#'
  }
];

const Projects = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            My Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={project.link}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Project
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;