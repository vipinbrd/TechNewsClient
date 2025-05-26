import React from 'react';

const About= () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-10 md:px-16">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 md:p-12 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600">
          About Us
        </h1>

        <p className="text-lg leading-relaxed text-justify">
          Welcome to <span className="font-semibold">Tech News</span>, your one-stop destination for the latest updates in the tech world. From breakthroughs in AI and cybersecurity to startup trends and gadget reviews — we bring you curated, trustworthy content that matters.
        </p>

        <div className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
          "Empowering tech minds with knowledge and news."
        </div>

        <h2 className="text-2xl font-semibold text-gray-700">Meet the Founder</h2>
        <p className="text-lg text-justify">
          I'm <span className="font-bold text-blue-700">Vipin Barode</span>, the founder of Tech News. With a deep passion for technology, innovation, and journalism, I created this platform to deliver accurate, timely, and impactful tech news to readers across the globe. My mission is to simplify complex topics and help everyone—from enthusiasts to professionals—stay informed in this fast-paced digital world.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700">Our Mission</h2>
        <p className="text-lg text-justify">
          Our mission is to bridge the gap between emerging technologies and everyday people. We believe tech should be accessible and understandable. We aim to empower readers with reliable information, foster critical thinking, and inspire innovation through news, analysis, and expert insights.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700">What We Cover</h2>
        <ul className="list-disc pl-6 text-lg space-y-1">
          <li>Artificial Intelligence & Machine Learning</li>
          <li>Startups & Innovation</li>
          <li>Gadget & Product Reviews</li>
          <li>Cybersecurity News</li>
          <li>Tech Policy & Regulations</li>
          <li>How-to Guides & Tutorials</li>
        </ul>

        <p className="text-lg text-center text-gray-600 mt-10">
          Thank you for being a part of our journey. Stay curious, stay informed.
        </p>
      </div>
    </div>
  );
};

export default About;
