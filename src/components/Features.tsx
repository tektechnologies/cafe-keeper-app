import {
  Coffee,
  Handshake,
  ListTodo,
  MessagesSquare,
  ToolCase,
} from 'lucide-react'

const features = [
  {
    icon: <Coffee className="w-12 h-12 text-cyan-400" />,
    title: 'Recipes & Menu',
    description:
      'Simplify menu and recipe management—store recipes, track ingredients, and share updates with your team to keep every cup and dish consistent and high-quality.',
  },
  {
    icon: <ToolCase className="w-12 h-12 text-cyan-400" />,
    title: 'Equipment & Maintenance',
    description:
      'Manage and maintain all your equipment with ease—track purchases, maintenance, images, and ownership history, all in one organized platform.',
  },
  {
    icon: <MessagesSquare className="w-12 h-12 text-cyan-400" />,
    title: 'Team Messaging',
    description:
      'A simple team chat for scheduling and updates—send messages, request shift coverage, and get notifications in real time.',
  },
  {
    icon: <ListTodo className="w-12 h-12 text-cyan-400" />,
    title: 'Shift & Staff Management',
    description:
      'Manage staff details and track shift activities, notes, and instructions—all in one easy-to-use system.',
  },
  {
    icon: <Handshake className="w-12 h-12 text-cyan-400" />,
    title: 'Vendor & Supply Management',
    description:
      'Track vendors, orders, and supplies all in one place to keep your operations running smoothly.',
  },
  {
    icon: <Coffee className="w-12 h-12 text-cyan-400" />,
    title: 'Barista and Roaster Training',
    description:
      'Train your baristas and roasters with interactive lessons and quizzes, reinforcing key skills and company standards while tracking staff progress.',
  },
]

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
