'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real application, you would send the form data to your backend
      // For now, we'll simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setSubmitStatus('success');

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');

      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      {submitStatus === 'success' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Thank you for reaching out. I'll get back to you as soon as possible.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors
                ${errors.name
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-green-200 dark:focus:ring-green-800'
                }
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors
                ${errors.email
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-green-200 dark:focus:ring-green-800'
                }
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
              placeholder="What is this regarding?"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors
                ${errors.message
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-green-200 dark:focus:ring-green-800'
                }
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              placeholder="Your message here..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-lg font-medium transition-colors
                ${isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </div>

          {submitStatus === 'error' && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              <p>There was an error sending your message. Please try again later.</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
}