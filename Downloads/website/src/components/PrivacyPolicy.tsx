import React from 'react';

export default function PrivacyPolicy() {

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-5xl font-black text-blue-700 mb-10">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">

          <p>
            LEAD Academy Patna respects your privacy.
            This Privacy Policy explains how we collect,
            use and protect your information.
          </p>

          <h2 className="text-2xl font-bold text-black">
            Information We Collect
          </h2>

          <ul className="list-disc pl-6 space-y-2">

            <li>Name</li>
            <li>Phone Number</li>
            <li>Payment Information</li>
            <li>Course Enrollment Data</li>

          </ul>

          <h2 className="text-2xl font-bold text-black">
            How We Use Information
          </h2>

          <ul className="list-disc pl-6 space-y-2">

            <li>To provide course access</li>
            <li>To verify payments</li>
            <li>To contact students</li>
            <li>To improve services</li>

          </ul>

          <h2 className="text-2xl font-bold text-black">
            Contact
          </h2>

          <p>
            LEAD Academy Patna
            <br />
            Phone: 6200598775
          </p>

        </div>

      </div>

    </div>

  );

}