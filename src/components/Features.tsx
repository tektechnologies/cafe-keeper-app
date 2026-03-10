import {
  Coffee,
  Handshake,
  ListTodo,
  MessagesSquare,
  ToolCase,
} from 'lucide-react'

const features = [
  {
    icon: <Coffee size={45} className="text-cyan-400" />,
    title: 'Recipes & Menu',
    description:
      'Simplify menu and recipe management—store recipes, track ingredients, and share updates with your team to keep every cup and dish consistent and high-quality.',
  },
  {
    icon: <ToolCase size={45} className="text-cyan-400" />,
    title: 'Equipment & Maintenance',
    description:
      'Manage and maintain all your equipment with ease—track purchases, maintenance, images, and ownership history, all in one organized platform.',
  },
  {
    icon: <MessagesSquare size={45} className="text-cyan-400" />,
    title: 'Team Messaging',
    description:
      'A simple team chat for scheduling and updates—send messages, request shift coverage, and get notifications in real time.',
  },
  {
    icon: <ListTodo size={45} className="text-cyan-400" />,
    title: 'Shift & Staff Management',
    description:
      'Manage staff details and track shift activities, notes, and instructions—all in one easy-to-use system.',
  },
  {
    icon: <Handshake size={45} className="text-cyan-400" />,
    title: 'Vendor & Supply Management',
    description:
      'Track vendors, orders, and supplies all in one place to keep your operations running smoothly.',
  },
  {
    icon: <Coffee size={45} className="text-cyan-400" />,
    title: 'Barista and Roaster Training',
    description:
      'Train your baristas and roasters with interactive lessons and quizzes, reinforcing key skills and company standards while tracking staff progress.',
  },
]

export default function Features() {
  return (
    <section className="features">
      <h2 className="section-title">
        Business Solutions for Growing Companies
      </h2>
      <div className="feature-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
