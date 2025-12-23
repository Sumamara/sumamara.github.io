import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Success = () => {
  return (
    <>
      <Helmet>
        <title>Payment Successful - Transform Life</title>
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
          className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-12 h-12 text-green-600" strokeWidth={3} />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase. Your transformation journey begins now! We've sent a confirmation email with all the details.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="w-full sm:w-auto bg-gray-900 text-white hover:bg-gray-800">
                Back to Home
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" className="w-full sm:w-auto border-gray-300">
                Continue Shopping <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Success;
