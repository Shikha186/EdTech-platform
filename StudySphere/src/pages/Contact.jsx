
import React from "react";

function Contact() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <p className="text-lg mb-4">We would love to hear from you! Please fill out the form below to get in touch with us.</p>
      <form className="w-full max-w-lg bg-muted p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
          <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brand focus:border-brand" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
          <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brand focus:border-brand" required />  
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
          <textarea id="message" name="message" rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brand focus:border-brand" required></textarea>
        </div>
        <button type="submit" className="w-full bg-brand text-white py-2 px-4 rounded-md hover:bg-brand-dark transition-colors duration-300">Submit</button>
      </form>
    </div>
  );
}
export default Contact;