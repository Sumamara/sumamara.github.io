import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Blog = () => {
  const { toast } = useToast();

  const blogPosts = [
    {
      title: '10 Science-Backed Ways to Boost Your Energy Naturally',
      excerpt: 'Discover evidence-based strategies to increase your vitality without relying on caffeine or stimulants.',
      author: 'Dr. Sarah Johnson',
      date: 'December 15, 2025',
      category: 'Energy',
      image: 'Healthy breakfast bowl with fruits and energy-boosting foods',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'The Ultimate Guide to Better Sleep: What Science Says',
      excerpt: 'Learn the latest research on sleep optimization and how to implement proven techniques tonight.',
      author: 'Michael Chen',
      date: 'December 12, 2025',
      category: 'Sleep',
      image: 'Cozy bedroom setup optimized for quality sleep',
      color: 'from-indigo-400 to-purple-500'
    },
    {
      title: 'Stress Management Techniques That Actually Work',
      excerpt: 'Explore practical, research-backed methods to reduce stress and build lasting resilience.',
      author: 'Dr. Emily Roberts',
      date: 'December 10, 2025',
      category: 'Stress',
      image: 'Person practicing mindfulness meditation in nature',
      color: 'from-pink-400 to-rose-500'
    },
    {
      title: 'Breaking the Procrastination Cycle: A Psychologist\'s Guide',
      excerpt: 'Understand the psychology of procrastination and learn actionable strategies to overcome it.',
      author: 'Dr. James Wilson',
      date: 'December 8, 2025',
      category: 'Productivity',
      image: 'Person achieving goals with organized workspace',
      color: 'from-green-400 to-teal-500'
    },
    {
      title: 'Morning Routines of High Performers',
      excerpt: 'Discover how successful people start their day and how you can build your own powerful morning routine.',
      author: 'Lisa Anderson',
      date: 'December 5, 2025',
      category: 'Habits',
      image: 'Morning routine with exercise and healthy breakfast',
      color: 'from-orange-400 to-red-500'
    },
    {
      title: 'The Connection Between Exercise and Mental Health',
      excerpt: 'Learn how physical activity impacts your mood, stress levels, and overall mental wellbeing.',
      author: 'Dr. Marcus Thompson',
      date: 'December 2, 2025',
      category: 'Wellness',
      image: 'Person exercising outdoors with positive energy',
      color: 'from-blue-400 to-cyan-500'
    }
  ];

  const handleReadMore = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Blog - Transform Life</title>
        <meta name="description" content="Read expert articles on energy, sleep, stress management, and productivity. Evidence-based tips to help you transform your life." />
      </Helmet>

      <div className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert insights, research-backed strategies, and practical tips for personal transformation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <div className={`absolute top-4 right-4 bg-gradient-to-r ${post.color} px-3 py-1 rounded-full text-white text-sm font-semibold`}>
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleReadMore}
                    variant="ghost"
                    className="w-full justify-between group-hover:bg-orange-50 group-hover:text-orange-600 transition-all"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-xl mb-8 opacity-95">
              Get the latest articles and tips delivered to your inbox
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button
                onClick={handleReadMore}
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
              >
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Blog;
