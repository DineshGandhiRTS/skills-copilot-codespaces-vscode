import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Menu, 
  X, 
  Home, 
  Code, 
  Lock, 
  Hash, 
  Network, 
  Globe, 
  Trophy, 
  Settings,
  Zap,
  Shield,
  Terminal
} from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home, color: 'text-blue-500' },
  { name: 'Encoder', href: '/encoder', icon: Code, color: 'text-green-500' },
  { name: 'Decoder', href: '/decoder', icon: Code, color: 'text-purple-500' },
  { name: 'Hash Cracker', href: '/hash-cracker', icon: Hash, color: 'text-red-500' },
  { name: 'Network Tools', href: '/network-tools', icon: Network, color: 'text-yellow-500' },
  { name: 'Web Tools', href: '/web-tools', icon: Globe, color: 'text-cyan-500' },
  { name: 'CTF Tools', href: '/ctf-tools', icon: Trophy, color: 'text-pink-500' },
  { name: 'Settings', href: '/settings', icon: Settings, color: 'text-gray-500' },
]

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-dark-900/80" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-dark-800 border-r border-dark-600">
          <div className="flex items-center justify-between p-4 border-b border-dark-600">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold text-gray-100">HT Tool</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-100 hover:bg-dark-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-4 px-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-dark-700 hover:text-gray-100'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-dark-800 border-r border-dark-600">
          <div className="flex items-center space-x-2 p-4 border-b border-dark-600">
            <Shield className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-gray-100">HT Tool</span>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-dark-700 hover:text-gray-100'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-dark-600">
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <Terminal className="h-4 w-4" />
              <span>HackTheBox Companion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-dark-800 border-b border-dark-600">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-100 hover:bg-dark-700"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-lg font-semibold text-gray-100">
                {navigation.find(item => item.href === location.pathname)?.name || 'HT Tool'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-success-600/20 border border-success-600/30">
                <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></div>
                <span className="text-xs text-success-400 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}