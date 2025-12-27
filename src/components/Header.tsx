import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <>
      <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
        <h1 className="ml-4 text-xl font-semibold font-motter-tektura">
          <Link to="/">Cafe Keeper</Link>
        </h1>

        <nav>
          <Link to="/">
            <span className="font-medium">Solutions</span>
          </Link>

          <Link to="/demo/start/server-funcs">
            <span className="font-medium">Pricing</span>
          </Link>

          <Link to="/demo/start/api-request" className="">
            <span className="font-medium">About Us</span>
          </Link>

          <div className="flex flex-row justify-between">
            <Link
              to="/demo/start/ssr"
              className="flex-1 flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            >
              <span className="font-medium">Contact Us</span>
            </Link>
          </div>

          {/* Demo Links End */}
        </nav>
      </header>
    </>
  )
}
