'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import YouTubeToMP3 from './YouTubeToMP3';

interface UtilityOption {
  id: string;
  name: string;
  description: string;
  component: React.ReactNode;
}

export default function Utilities() {
  const utilities: UtilityOption[] = [
    {
      id: 'youtube-to-mp3',
      name: 'YouTube to MP3',
      description: 'Convert YouTube videos to MP3 audio files',
      component: <YouTubeToMP3 />
    },
    // Add more utilities here in the future
  ];

  const [activeUtility, setActiveUtility] = useState<string>(utilities[0].id);

  return (
    <div>
      <h3 className="text-2xl font-bold mb-8 text-center">Useful Utilities</h3>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar with utility options */}
        <div className="md:w-1/4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h4 className="font-medium text-lg mb-4">Available Tools</h4>
            <ul className="space-y-2">
              {utilities.map((utility) => (
                <li key={utility.id}>
                  <button
                    onClick={() => setActiveUtility(utility.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition duration-200 ${
                      activeUtility === utility.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium">{utility.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {utility.description}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main content area */}
        <div className="md:w-3/4">
          <motion.div
            key={activeUtility}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {utilities.find(u => u.id === activeUtility)?.component}
          </motion.div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          These utilities are provided for demonstration purposes.
          For production use, please consider the legal and ethical implications.
        </p>
      </div>
    </div>
  );
}