import React, { useState } from 'react';

// The main LoginPage component.
// This component handles the state for the form inputs and renders the login form.
const LoginPage = () => {
  // State variables to store the values of the form inputs.
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [studentClass, setStudentClass] = useState('');

  // Function to handle form submission.
  // It prevents the default form behavior (page reload) and logs the form data.
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form validation or submission logic here
    console.log({ name, dob, studentClass });
  };

  // The main container for the entire page.
  // It uses Tailwind CSS classes to center the content and set a dark background.
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-neutral-900 text-white p-4">
      {/* The form container.
      This div creates the card-like appearance with a backdrop blur effect,
      rounded corners, and a shadow for a modern, sleek look. */}
      <div className="bg-neutral-800 backdrop-filter backdrop-blur-lg rounded-3xl p-8 sm:p-12 shadow-2xl max-w-sm w-full border border-neutral-700 transition-all duration-300 transform hover:scale-105">
        {/* The main heading for the form. */}
        <h2 className="text-white text-3xl font-extrabold mb-8 text-center tracking-wide">
          Student Login
        </h2>
        {/* The form element itself.
        The onSubmit handler triggers the handleSubmit function when the form is submitted. */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Input field for the user's full name. */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-xl bg-neutral-900 text-white border border-neutral-700 py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors duration-200"
              placeholder="Your Full Name"
              required
            />
          </div>
          {/* Input field for the user's date of birth. */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-neutral-400 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="mt-1 block w-full rounded-xl bg-neutral-900 text-white border border-neutral-700 py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors duration-200"
              required
            />
          </div>
          {/* Select dropdown for the student's class. */}
          <div>
            <label htmlFor="class" className="block text-sm font-medium text-neutral-400 mb-1">
              Class
            </label>
            <select
              id="class"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="mt-1 block w-full rounded-xl bg-neutral-900 text-white border border-neutral-700 py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors duration-200"
              required
            >
              <option value="" className="bg-neutral-900 text-neutral-400">Select a class</option>
              <option value="6">Class 6</option>
              <option value="12">Class 12</option>
            </select>
          </div>
          {/* The submit button for the form.
          It has a gradient background and a hover effect for a modern feel. */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
