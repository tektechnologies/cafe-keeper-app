import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
// import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
// import { TanStackDevtools } from '@tanstack/react-devtools'
import appCss from '../theme/index.css?url'
import Header from '../components/Navs/Header'
import Footer from '@/components/Footer'

console.log('Root Route')

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Cafe Keeper',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent() {
    return (
      <section className="features">
        <div
          className="feature-card"
          style={{ maxWidth: 600, margin: '4rem auto', textAlign: 'center' }}
        >
          <h2 className="section-title">Page not found</h2>
          <p>
            The page you&apos;re looking for doesn&apos;t exist. Please check the
            address or use the navigation to find your way.
          </p>
        </div>
      </section>
    )
  },
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
      <Header />
        {children}
        <Footer />
        {/* <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        /> */}
        <Scripts />
      </body>
    </html>
  )
}
