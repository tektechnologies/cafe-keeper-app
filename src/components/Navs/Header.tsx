import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/" className="play-regular">
            Cafe Keeper
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/solutions" className="[&.active]:font-bold">
              Solutions
            </Link>
          </li>
          <li>
            <Link to="/pricing" className="[&.active]:font-bold">
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="[&.active]:font-bold">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
