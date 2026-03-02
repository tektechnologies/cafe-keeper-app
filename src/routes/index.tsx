import { createFileRoute } from '@tanstack/react-router'
import {
  Coffee,
  Handshake,
  ListTodo,
  MessagesSquare,
  ToolCase,
} from 'lucide-react'
import bannerImage from '../assets/images/banner-image-1.png'

export const Route = createFileRoute('/')({ component: App })

function App() {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <img
          src={bannerImage}
          alt="Cafe Keeper banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-6">
          
            <h1 className="text-6xl md:text-7xl font-black text-white [letter-spacing:-0.08em]">
              <span className="text-gray-300">Cafe</span>{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Keeper
              </span>
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
            The framework for next generation AI business applications
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
          Smart Controls. Seamless Operations.
          </p>
          <div className="flex flex-col items-center gap-4">
            <a
              href="https://tanstack.com/start"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50"
            >
              Learn More
            </a>
            <p className="text-gray-400 text-sm mt-2">
              Begin your CAFE KEEPER journey TODAY!{' '}
             
            </p>
          </div>
        </div>
      </section>

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
