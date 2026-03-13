export default function ContactUs() {
  return (
    <section className="features">
      <h2 className="section-title">Contact Us</h2>

      <div className="feature-grid">
        <div className="feature-card" style={{ maxWidth: 600, margin: '0 auto' }}>
          <h3>We&apos;d love to hear from you</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Tell us a bit about your café and what you&apos;d like to improve. We&apos;ll get back to you with next steps.
          </p>

          <form className="contact-form">
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 6,
                  border: '1px solid #d0d0d0',
                  fontSize: '1rem',
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@yourcafe.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 6,
                  border: '1px solid #d0d0d0',
                  fontSize: '1rem',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem' }}>
                How can we help?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Share a bit about your team, locations, and goals."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 6,
                  border: '1px solid #d0d0d0',
                  fontSize: '1rem',
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              type="submit"
              className="cta-button"
              style={{ width: '100%', textAlign: 'center' }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

