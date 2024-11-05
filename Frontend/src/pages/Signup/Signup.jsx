import React from 'react';
import { Calendar, Eye } from 'lucide-react';

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-indigo-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2 mb-8">
          <Calendar className="w-6 h-6 text-indigo-600" />
          <span className="text-xl text-indigo-600 font-medium">Planster</span>
        </div>

        {/* Form Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Create an account
        </h1>

        {/* Form */}
        <form className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-sm text-gray-700">Password</label>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                Forgot?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
                            <label className="text-sm text-gray-700">Password</label>

                <input
                type="password"
                placeholder="Re-Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create account
          </button>

          {/* Google Sign In Button */}
          <button
            type="button"
            className="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-100 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#4285F4"
                d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
              />
              <path
                fill="#34A853"
                d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
              />
              <path
                fill="#FBBC05"
                d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
              />
              <path
                fill="#EA4335"
                d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            Already Have An Account?{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
