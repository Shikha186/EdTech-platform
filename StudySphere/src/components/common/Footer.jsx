import React from 'react';
import { FaLinkedinIn, FaInstagram, FaXTwitter, FaFacebookF, FaYoutube } from "react-icons/fa6";
import HighlightText from '../HomePage/HighlightText';

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-white/10 pt-16 pb-6 mt-20 font-sans">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
          
          {/* Left Column: Logo & Socials (Takes up more space) */}
          <div className="lg:w-2/5 flex flex-col gap-6">
            
            {/* Logo */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl font-extrabold  text-brand tracking-tight bg-clip-text ">
                StudySphere
              </span>
            </div>

            {/* Short Tagline / Description */}
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Your ultimate platform to master coding, track your progress, and prepare for your dream tech job. Start your journey today.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mt-4">
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-brand hover:text-foreground transition-all duration-300">
                <FaLinkedinIn className="text-lg" />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand hover:text-white transition-all duration-300">
                <FaInstagram className="text-lg" />
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand hover:text-white transition-all duration-300">
                <FaXTwitter className="text-lg" />
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand hover:text-white transition-all duration-300">
                <FaFacebookF className="text-lg" />
              </a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand hover:text-white transition-all duration-300">
                <FaYoutube className="text-lg" />
              </a>
            </div>
          </div>

          {/* Right Columns: Links (Grid layout) */}
          <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-3 gap-10">
            
            {/* Company Column */}
            <div>
              <h3 className="text-brand font-bold text-lg mb-6">Company</h3>
              <ul className="flex flex-col gap-3">
                {['About Us', 'Legal', 'Privacy Policy', 'Careers', 'Contact Us', 'Corporate Solution', 'Campus Training Program'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore Column */}
            <div>
              <h3 className="text-brand font-bold text-lg mb-6">Explore</h3>
              <ul className="flex flex-col gap-3">
                {['POTD', 'Practice Problems', 'Blogs', 'Upskill Courses', 'Connect'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Courses Column */}
            <div>
              <h3 className="text-brand font-bold text-lg mb-6">Courses</h3>
              <ul className="flex flex-col gap-3">
                {['ML and Data Science', 'DSA and Placements', 'Web Development', 'Data Science', 'Programming Languages', 'DevOps & Cloud', 'GATE'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 mt-16 pt-6 text-center lg:text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-gray-500 text-sm">
            @StudySphere, Education Private Limited, All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}