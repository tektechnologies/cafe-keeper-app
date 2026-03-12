import bannerImage from '../assets/images/banner-image-1.png'
import Features from './Features'
import MarqueeMessage from './MarqueeMessage'

export default function Banner() {
  return (
    <>
      <section
        className="hero"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="hero-content">
          {/* <h2>Smart Controls. Seamless Operations.</h2> */}
          <h2>Smart Controls. Seamless Operations.</h2>
          {/* <p>Store Recipes, Manage Opening and Closing Checklists, and more.</p> */}
          <a href="#" className="cta-button">
            Find Out More
          </a>
        </div>
      </section>


      <Features />
      <MarqueeMessage /> 

      <section className="stats">
        <div className="stats-container">
          <div className="stat-item">
            <h4>+32%</h4>
            <p>Operational Efficiency</p>
          </div>
          <div className="stat-item">
            <h4>99.9%</h4>
            <p>Staff Training Completion</p>
          </div>
          <div className="stat-item">
            <h4>2+</h4>
            <p>Advanced Training Programs</p>
          </div>
          <div className="stat-item">
            <h4>24/7</h4>
            <p>Fresh Coffee Available</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Optimize Your Operation?</h2>
        <p>
          Designed for busy cafés, this app streamlines daily operations by
          organizing shift tasks, recipe management, staff training, and
          inventory tracking, helping teams run efficiently and consistently.
        </p>
        <a href="#" className="cta-button">
          Schedule Consultation
        </a>
      </section>
    </>
  )
}
