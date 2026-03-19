import {
  Coffee,
  Handshake,
  ListTodo,
  MessagesSquare,
  ToolCase,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

const features = [
  {
    id: 'recipes-menu',
    icon: <Coffee size={45} className="text-cyan-400" />,
    title: 'Recipes & Menu',
    description: 'Simplify menu and recipe management—store recipes, track ingredients, and share updates with your team to keep every cup and dish consistent and high-quality.',
    route: '/recipesMenu',
  },
  {
    id: 'equipment-maintenance',
    icon: <ToolCase size={45} className="text-cyan-400" />,
    title: 'Equipment & Maintenance',
    description: 'Manage and maintain all your equipment with ease—track purchases, maintenance, images, and ownership history, all in one organized platform.',
    route: '/equipmentMaintenance',
  },
  {
    id: 'team-messaging',
    icon: <MessagesSquare size={45} className="text-cyan-400" />,
    title: 'Team Messaging',
    description: 'A simple team chat for scheduling and updates—send messages, request shift coverage, and get notifications in real time.',
    route: '/teamMessaging',
  },
  {
    id: 'shift-staff-management',
    icon: <ListTodo size={45} className="text-cyan-400" />,
    title: 'Shift & Staff Management',
    description: 'Manage staff details and track shift activities, notes, and instructions—all in one easy-to-use system.',
    route: '/shiftStaffManagement',
  },
  {
    id: 'vendor-supply-management',
    icon: <Handshake size={45} className="text-cyan-400" />,
    title: 'Vendor & Supply Management',
    description: 'Track vendors, orders, and supplies all in one place to keep your operations running smoothly.',
    route: '/vendorSupplyManagement',
  },
  {
    id: 'barista-roaster-training',
    icon: <Coffee size={45} className="text-cyan-400" />,
    title: 'Barista and Roaster Training',
    description: 'Train your baristas and roasters with interactive lessons and quizzes, reinforcing key skills and company standards while tracking staff progress.',
    route: '/baristaRoasterTraining',
  },
]

const linkStyle = { color: 'inherit', textDecoration: 'none' }

export default function Features() {
  return (
    <section className="features" id="features">
      <h2 className="section-title">
        Business Solutions for Growing Companies
      </h2>
      <div className="feature-grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card" id={feature.id}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>
              {feature.route ? (
                <Link to={feature.route} style={linkStyle}>
                  {feature.title}
                </Link>
              ) : (
                <a href={`#${feature.id}`} style={linkStyle}>
                  {feature.title}
                </a>
              )}
            </h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}