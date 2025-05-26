import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-16">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600">
          Contact Us
        </h1>

        <p className="text-lg text-gray-700 text-center">
          We'd love to hear from you! Whether you have feedback, questions, or just want to say hello, feel free to reach out using the information below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Details */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Email</h2>
              <p className="text-gray-600">support@technewsdemo.com</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Phone</h2>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Address</h2>
              <p className="text-gray-600">
                3rd Floor, Crystal Tech Park<br />
                MG Road, Indore, MP 452001<br />
                India
              </p>
            </div>
          </div>

          {/* Contact Form (Non-functional placeholder) */}
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Your Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Your Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Write your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              disabled
            >
              Send Message (coming soon)
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Response time: within 24-48 hours
        </p>
      </div>
    </div>
  );
};

export default Contact;
