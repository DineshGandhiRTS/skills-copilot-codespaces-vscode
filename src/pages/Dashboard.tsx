import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Code, 
  Hash, 
  Network, 
  Globe, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Star,
  Zap,
  Shield,
  Target,
  Activity
} from 'lucide-react'

const tools = [
  {
    name: 'Encoder',
    description: 'Encode text using various algorithms',
    icon: Code,
    href: '/encoder',
    color: 'bg-green-500',
    gradient: 'from-green-500 to-green-600'
  },
  {
    name: 'Decoder',
    description: 'Decode encoded text and data',
    icon: Code,
    href: '/decoder',
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Hash Cracker',
    description: 'Crack and analyze hash values',
    icon: Hash,
    href: '/hash-cracker',
    color: 'bg-red-500',
    gradient: 'from-red-500 to-red-600'
  },
  {
    name: 'Network Tools',
    description: 'Network scanning and analysis',
    icon: Network,
    href: '/network-tools',
    color: 'bg-yellow-500',
    gradient: 'from-yellow-500 to-yellow-600'
  },
  {
    name: 'Web Tools',
    description: 'Web application testing tools',
    icon: Globe,
    href: '/web-tools',
    color: 'bg-cyan-500',
    gradient: 'from-cyan-500 to-cyan-600'
  },
  {
    name: 'CTF Tools',
    description: 'Capture The Flag challenge tools',
    icon: Trophy,
    href: '/ctf-tools',
    color: 'bg-pink-500',
    gradient: 'from-pink-500 to-pink-600'
  }
]

const stats = [
  {
    name: 'Total Tools',
    value: '12',
    icon: Zap,
    change: '+2',
    changeType: 'positive'
  },
  {
    name: 'Recent Usage',
    value: '47',
    icon: Activity,
    change: '+12%',
    changeType: 'positive'
  },
  {
    name: 'Active Sessions',
    value: '3',
    icon: Target,
    change: '+1',
    changeType: 'positive'
  },
  {
    name: 'Security Score',
    value: '94%',
    icon: Shield,
    change: '+3%',
    changeType: 'positive'
  }
]

const recentActivity = [
  {
    id: 1,
    action: 'Encoded text using Base64',
    tool: 'Encoder',
    time: '2 minutes ago',
    icon: Code
  },
  {
    id: 2,
    action: 'Cracked MD5 hash',
    tool: 'Hash Cracker',
    time: '5 minutes ago',
    icon: Hash
  },
  {
    id: 3,
    action: 'Scanned network ports',
    tool: 'Network Tools',
    time: '12 minutes ago',
    icon: Network
  },
  {
    id: 4,
    action: 'Analyzed web headers',
    tool: 'Web Tools',
    time: '1 hour ago',
    icon: Globe
  }
]

export default function Dashboard() {
  const [favorites] = useState(['encoder', 'hash-cracker'])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome to HT Tool - Your HackTheBox companion</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-primary-600/20 border border-primary-600/30">
            <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
            <span className="text-sm text-primary-400 font-medium">Connected</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="card-content">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-100">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-success-400' : 'text-danger-400'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-400 ml-1">from last week</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tools Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-100">Quick Tools</h2>
          <Link to="/settings" className="text-sm text-primary-400 hover:text-primary-300">
            View all
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              to={tool.href}
              className="card hover:border-primary-500/50 hover:bg-dark-700/50 transition-all duration-200 group"
            >
              <div className="card-content">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${tool.gradient}`}>
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-100 group-hover:text-primary-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-400">{tool.description}</p>
                  </div>
                  {favorites.includes(tool.name.toLowerCase().replace(' ', '-')) && (
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <h3 className="card-title">Recent Activity</h3>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-dark-700">
                    <activity.icon className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-100">{activity.action}</p>
                    <p className="text-xs text-gray-400">{activity.tool} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-gray-400" />
              <h3 className="card-title">Quick Stats</h3>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Most Used Tool</span>
                <span className="text-sm font-medium text-gray-100">Hash Cracker</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Total Encodings</span>
                <span className="text-sm font-medium text-gray-100">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Hashes Cracked</span>
                <span className="text-sm font-medium text-gray-100">89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Network Scans</span>
                <span className="text-sm font-medium text-gray-100">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">CTF Challenges</span>
                <span className="text-sm font-medium text-gray-100">23</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}