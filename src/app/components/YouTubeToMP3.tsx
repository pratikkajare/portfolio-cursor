'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function YouTubeToMP3() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversionComplete, setConversionComplete] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const isValidYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const extractVideoId = (url: string) => {
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
    }
    return videoId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset states
    setError('');
    setConversionComplete(false);
    setVideoTitle('');
    setDownloadUrl('');

    if (!url) {
      setError('Please enter a YouTube URL');
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setIsLoading(true);

    try {
      // Extract video ID
      const videoId = extractVideoId(url);

      // For demonstration, we'll use a direct YouTube video download URL format
      // Note: In a real implementation, you would use a proper API
      const downloadUrl = `https://www.y2mate.com/youtube/${videoId}`;

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Set video title based on ID
      setVideoTitle(`YouTube Video - ${videoId}`);
      setDownloadUrl(downloadUrl);
      setConversionComplete(true);
    } catch (err) {
      setError('An error occurred during conversion. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md mb-4">
        <p className="text-yellow-700 dark:text-yellow-400 text-sm">
          <strong>Important:</strong> This tool redirects to Y2mate.com, a third-party service for YouTube video conversion.
          Please ensure you comply with YouTube's Terms of Service and copyright laws when downloading content.
        </p>
      </div>

      <h3 className="text-xl font-bold mb-4">YouTube to MP3 Converter</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Convert YouTube videos to MP3 audio files for offline listening.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="youtube-url" className="block text-sm font-medium mb-1">
            YouTube URL
          </label>
          <input
            type="text"
            id="youtube-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Convert to MP3'}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-500 text-sm">
          {error}
        </div>
      )}

      {conversionComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-md"
        >
          <p className="text-green-700 dark:text-green-400 font-medium mb-2">
            Ready for download!
          </p>
          <div className="mb-3">
            <span className="text-sm font-medium">Title:</span>
            <span className="ml-2">{videoTitle}</span>
          </div>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Go to Download Page
          </a>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            You will be redirected to Y2mate.com to complete your download.
          </p>
        </motion.div>
      )}

      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        <p className="font-medium mb-1">How it works:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Paste a valid YouTube video URL</li>
          <li>Click the "Convert to MP3" button</li>
          <li>Wait for the processing to complete</li>
          <li>Click "Go to Download Page" to download your MP3</li>
        </ol>
      </div>
    </div>
  );
}