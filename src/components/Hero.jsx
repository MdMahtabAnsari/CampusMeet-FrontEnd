import { Link } from "react-router-dom";
import homepageLogo from "../assets/homepage.jpg";
const Hero = () => {
  return (
    <section className="bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
          {/* Text content */}
          <div className="text-center lg:text-left lg:max-w-lg">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Welcome to <span className="text-blue-600">CampsMeet</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8">
              A place where students around the world can connect, collaborate,
              and grow together. Let’s build bridges, share knowledge, and
              create opportunities.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <Link
                to="/auth/signup"
                className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700"
              >
                Get Started
              </Link>
              {/* <Link
                to="/learn-more"
                className="bg-transparent border border-blue-600 text-blue-600 px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-600 hover:text-white"
              >
                Learn More
              </Link> */}
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2">
            <img
              src={homepageLogo}
              alt="Homepage"
              className="w-full h-auto max-w-md lg:max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
