import bannerImage from '../assets/images/banner-image-1.png'

export default function Banner() {
  return (
    <section className="relative py-20 px-6 text-center overflow-hidden">
      <img
        src={bannerImage}
        alt="Cafe Keeper banner"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-6 mb-6">
          <h1 className="text-6xl md:text-7xl font-black text-white [letter-spacing:-0.08em]">
            <span className="text-gray-300">Cafe</span>{' '}
            <span className="bg-gradient-to-r from-[#E98A60] to-[#CD602F] bg-clip-text text-transparent">
              Keeper
            </span>
          </h1>
        </div>
        <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
          The framework for next generation AI business applications
        </p>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
          Smart Controls. Seamless Operations.
        </p>
        <div className="flex flex-col items-center gap-4">
          <a
            href="https://tanstack.com/start"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}
