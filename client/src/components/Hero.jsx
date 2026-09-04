import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative h-[85vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Find your
            <span className="text-rose-400"> perfect stay</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200">
            Explore unique homes, luxury apartments,
            cozy cabins, and beachfront villas around
            the world.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              to="/ai"
              className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition"
            >
              AI Planner
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-12">
            <div>
              <h2 className="text-3xl font-bold">500+</h2>
              <p className="text-gray-300">Premium Stays</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">120+</h2>
              <p className="text-gray-300">Destinations</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">15K+</h2>
              <p className="text-gray-300">Happy Guests</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
