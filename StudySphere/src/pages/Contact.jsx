import React, { useState } from "react";
import Footer from "../components/common/Footer";
import { submitContactForm } from "../services/operations/contactAPI";
import countryCodes from "../data/countrycode.json"; // Import the country codes

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    message: "",
  });
  // Add a separate state for the country code, defaulting to India (+91)
  const [countryCode, setCountryCode] = useState("+91"); 
  const [loading, setLoading] = useState(false);

  const { name, email, contactNumber, message } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Combine country code and the phone number before sending to backend
      const finalDataToSend = {
        ...formData,
        contactNumber: `${countryCode} ${formData.contactNumber}`,
      };

      const response = await submitContactForm(finalDataToSend);

      if (response.success) {
        alert("Message sent successfully! We will get back to you soon.");
        setFormData({
          name: "",
          email: "",
          contactNumber: "",
          message: "",
        });
        setCountryCode("+91"); // Reset country code
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Text and Form */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-lg mb-8 text-gray-400">
              We would love to hear from you! Please fill out the form below and our team will get back to you shortly.
            </p>
            
            <form onSubmit={handleOnSubmit} className="w-full bg-muted p-8 rounded-2xl shadow-lg border border-gray-800">
              <div className="mb-5">
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={name}
                  onChange={handleOnChange}
                  className="w-full px-4 py-3 bg-background border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all" 
                  required 
                  placeholder="John Doe"
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={email}
                  onChange={handleOnChange} 
                  className="w-full px-4 py-3 bg-background border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all" 
                  required 
                  placeholder="john@example.com"
                />  
              </div>

              {/* Updated Contact Number field with Dropdown */}
              <div className="mb-5">
                <label htmlFor="contactNumber" className="block text-sm font-medium text-foreground mb-2">Contact Number</label>
                <div className="flex gap-3">
                  <select
                    name="countryCode"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-[100px] px-3 py-3 bg-background border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all cursor-pointer"
                  >
                    {countryCodes.map((element, index) => (
                      <option key={index} value={element.code}>
                        {element.code} - {element.country}
                      </option>
                    ))}
                  </select>
                  
                  <input 
                    type="tel" 
                    id="contactNumber" 
                    name="contactNumber"
                    value={contactNumber}
                    onChange={handleOnChange} 
                    className="flex-1 px-4 py-3 bg-background border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all" 
                    required 
                    placeholder="12345 67890"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={message}
                  onChange={handleOnChange}
                  rows="4" 
                  className="w-full px-4 py-3 bg-background border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all resize-none" 
                  required
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-brand text-white py-3 px-4 rounded-lg hover:bg-brand-dark transition-colors duration-300 font-semibold shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Right Side: Image Presentation */}
          <div className="w-full lg:w-1/2 relative hidden lg:block">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800 relative z-10 group">
              <img 
                src="https://images.pexels.com/photos/5877661/pexels-photo-5877661.jpeg" 
                alt="Person typing on laptop indicating support or communication" 
                className="object-cover w-full h-[600px] group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000814]/80 to-transparent pointer-events-none"></div>
            </div>
            
            <div className="absolute -top-6 -right-6 w-64 h-64 bg-brand rounded-full blur-3xl opacity-20 z-0"></div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-blue-600 rounded-full blur-3xl opacity-20 z-0"></div>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Contact;