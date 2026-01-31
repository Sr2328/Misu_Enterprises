import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Phone, Mail, MessageCircle, Home } from 'lucide-react';

const UnderConstruction = () => {
  const [isHovered, setIsHovered] = useState(null);

  const contactMethods = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/919717084301',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Phone,
      label: 'Call',
      href: 'tel:+919717084301',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:sachinyadav.work01@gmail.com',
      color: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-8">
      {/* Large Lottie Animation - Centered, No Container */}
      <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl mb-6 md:mb-8">
        <DotLottieReact
          src="https://lottie.host/794f59d7-ce18-46dd-9932-fcce44ef2643/9Vnqf6W1Mn.lottie"
          loop
          autoplay
          className="w-full h-auto"
        />
      </div>

      {/* Content Below Animation - Compact and Small */}
      <div className="w-full max-w-xl text-center space-y-4 md:space-y-5">
        {/* Developer Info - Compact */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 shadow-sm">
          <p className="text-xs md:text-sm text-gray-500 mb-2">Developer Information</p>
          <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1">
            Srdev Corp
          </h2>
          <p className="text-sm md:text-base text-gray-700 mb-3">Sachin Yadav</p>
          
          <p className="text-xs md:text-sm text-gray-500 mb-3">For more info, contact:</p>

          {/* Contact CTAs - Compact */}
          <div className="flex justify-center gap-2 md:gap-3 mb-3">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <a
                  key={index}
                  href={method.href}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                  className="group flex flex-col items-center justify-center p-2 md:p-3 rounded-lg border border-gray-200 hover:border-emerald-500 transition-all duration-300 hover:shadow-md bg-white"
                >
                  <div className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mb-1 transition-transform duration-300 ${
                    isHovered === index ? 'scale-110' : ''
                  }`}>
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-700">
                    {method.label}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Contact Details - Compact */}
          <div className="space-y-1 text-xs md:text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-700">Phone:</span>{' '}
              <a href="tel:+919717084301" className="text-emerald-600 hover:underline">
                +91 9717084301
              </a>
            </p>
            <p className="break-all">
              <span className="font-medium text-gray-700">Email:</span>{' '}
              <a href="mailto:sachinyadav.work01@gmail.com" className="text-emerald-600 hover:underline">
                sachinyadav.work01@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Back to Home Button - Compact */}
        <a
          href="/"
          className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium px-5 py-2.5 md:px-6 md:py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm md:text-base group"
        >
          <Home className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span>Back to Home</span>
        </a>
      </div>

      {/* Footer - Small */}
      <div className="mt-6 md:mt-8 text-gray-400 text-xs">
        © 2024 Srdev Corp. All rights reserved.
      </div>
    </div>
  );
};

export default UnderConstruction;