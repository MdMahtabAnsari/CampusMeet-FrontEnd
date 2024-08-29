const About = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            About <span className="text-blue-600">CampsMeet</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-700">
            Connecting students across the globe to foster collaboration,
            innovation, and learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Vision */}
          <div className="text-center p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <svg
                className="w-12 h-12 text-blue-600 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-.01l-.02-3a1.003 1.003 0 011-1h.04a1 1 0 011 .97v.04L13 8.01V12h.99v4H13zm0 4v-2h-1v2h1z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-700">
              To create a world where students from all backgrounds can connect,
              collaborate, and grow together.
            </p>
          </div>

          {/* Mission */}
          <div className="text-center p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <svg
                className="w-12 h-12 text-blue-600 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19V6l12 7-12 7z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700">
              To empower students with the tools and networks they need to
              succeed in an interconnected world.
            </p>
          </div>

          {/* Values */}
          <div className="text-center p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <svg
                className="w-12 h-12 text-blue-600 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Our Values
            </h3>
            <p className="text-gray-700">
              Collaboration, inclusivity, and innovation are at the heart of
              everything we do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
