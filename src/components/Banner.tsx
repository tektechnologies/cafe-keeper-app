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
        <div className="hero-content">
          <h2>Smart Controls. Seamless Operations.</h2>
        </div>
        </div>
       
        
        <div className="flex flex-col items-center gap-4">
          <a
            href="https://tanstack.com/start"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-[#EADDBC] hover:bg-[#E0D4B0] text-[#476C7D] font-semibold rounded-lg transition-colors shadow-md"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}
