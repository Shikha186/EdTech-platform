import React from "react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
    return (
        <div className="w-full">

            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">
                    Welcome to StudySphere 👋
                </h1>

                <p className="mt-2 text-gray-400">
                    Continue learning and track your progress.
                </p>
            </div>


            {/* Statistics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {/* Enrolled Courses */}
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                    <p className="text-sm text-gray-400">
                        Enrolled Courses
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-white">
                        5
                    </h2>

                    <Link
                        to="/dashboard/enrolled-courses"
                        className="mt-4 inline-block text-sm text-blue-400 hover:text-blue-300"
                    >
                        View Courses →
                    </Link>
                </div>


                {/* Completed Courses */}
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                    <p className="text-sm text-gray-400">
                        Completed Courses
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-white">
                        2
                    </h2>

                    <p className="mt-4 text-sm text-gray-500">
                        Keep learning!
                    </p>
                </div>


                {/* Cart */}
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                    <p className="text-sm text-gray-400">
                        Courses in Cart
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-white">
                        2
                    </h2>

                    <Link
                        to="/dashboard/cart"
                        className="mt-4 inline-block text-sm text-blue-400 hover:text-blue-300"
                    >
                        View Cart →
                    </Link>
                </div>

            </div>


            {/* Continue Learning */}
            <div className="mt-10">

                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-white">
                        Continue Learning
                    </h2>

                    <Link
                        to="/dashboard/enrolled-courses"
                        className="text-sm text-blue-400 hover:text-blue-300"
                    >
                        View All
                    </Link>
                </div>


                {/* Course */}
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">

                    <div className="flex flex-col gap-5 md:flex-row md:items-center">

                        {/* Course Image */}
                        <div className="h-32 w-full overflow-hidden rounded-lg bg-gray-800 md:w-52">
                            <img
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                                alt="Course"
                                className="h-full w-full object-cover"
                            />
                        </div>


                        {/* Course Information */}
                        <div className="flex-1">

                            <h3 className="text-xl font-semibold text-white">
                                Data Structures & Algorithms
                            </h3>

                            <p className="mt-2 text-sm text-gray-400">
                                Continue your DSA preparation and improve
                                your problem-solving skills.
                            </p>


                            {/* Progress */}
                            <div className="mt-5">

                                <div className="mb-2 flex justify-between text-sm">
                                    <span className="text-gray-400">
                                        Progress
                                    </span>

                                    <span className="text-blue-400">
                                        65%
                                    </span>
                                </div>

                                <div className="h-2 w-full rounded-full bg-gray-700">

                                    <div
                                        className="h-2 rounded-full bg-blue-500"
                                        style={{ width: "65%" }}
                                    />

                                </div>

                            </div>


                            {/* Continue Button */}
                            <button
                                className="mt-5 rounded-lg bg-blue-600 px-5 py-2 
                                           font-medium text-white transition 
                                           hover:bg-blue-700"
                            >
                                Continue Learning
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* Recent Activity */}
            <div className="mt-10">

                <h2 className="mb-5 text-2xl font-semibold text-white">
                    Recent Activity
                </h2>

                <div className="rounded-xl border border-gray-800 bg-gray-900">

                    <div className="border-b border-gray-800 p-5">
                        <p className="text-white">
                            Completed a lesson in DSA
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            2 hours ago
                        </p>
                    </div>


                    <div className="border-b border-gray-800 p-5">
                        <p className="text-white">
                            Enrolled in Generative AI
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Yesterday
                        </p>
                    </div>


                    <div className="p-5">
                        <p className="text-white">
                            Updated your profile
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            3 days ago
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default DashboardHome;