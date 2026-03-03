import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="px-6 py-4 flex items-center justify-between bg-white">
      <h1 className="text-3xl font-normal text-[#CD602F] font-motter-tektura tracking-tight">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          Cafe Keeper
        </Link>
      </h1>

      <nav className="flex items-center gap-8 text-[#4A5568] text-base font-normal">
        <Link to="/solutions" className="hover:text-[#2D3748] transition-colors">
          Solutions
        </Link>
        <Link to="/" className="hover:text-[#2D3748] transition-colors">
          Pricing
        </Link>
        <Link to="/" className="hover:text-[#2D3748] transition-colors">
          About
        </Link>
        <Link to="/" className="hover:text-[#2D3748] transition-colors">
          Contact
        </Link>
      </nav>
    </header>
  )
}
