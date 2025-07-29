import { useState } from 'react'
import { Network, Search, Activity, Globe, Shield, Zap } from 'lucide-react'
import toast from 'react-hot-toast'

export default function NetworkTools() {
  const [target, setTarget] = useState('')
  const [scanResults, setScanResults] = useState<any>(null)
  const [isScanning, setIsScanning] = useState(false)

  const handlePortScan = () => {
    if (!target.trim()) {
      toast.error('Please enter a target')
      return
    }

    setIsScanning(true)
    setScanResults(null)

    // Simulate port scanning
    setTimeout(() => {
      const mockResults = {
        target: target,
        timestamp: new Date(),
        ports: [
          { port: 22, service: 'SSH', status: 'open' },
          { port: 80, service: 'HTTP', status: 'open' },
          { port: 443, service: 'HTTPS', status: 'open' },
          { port: 21, service: 'FTP', status: 'closed' },
          { port: 25, service: 'SMTP', status: 'closed' },
          { port: 3306, service: 'MySQL', status: 'closed' }
        ]
      }
      setScanResults(mockResults)
      setIsScanning(false)
      toast.success('Port scan completed!')
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Network Tools</h1>
        <p className="text-gray-400 mt-1">Network scanning and analysis tools</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex items-center space-x-2">
              <Network className="h-5 w-5 text-gray-400" />
              <h3 className="card-title">Port Scanner</h3>
            </div>
          </div>
          <div className="card-content space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Host
              </label>
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Enter IP address or hostname..."
                className="input"
              />
            </div>

            <button
              onClick={handlePortScan}
              disabled={isScanning}
              className="btn btn-primary w-full"
            >
              {isScanning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Start Port Scan
                </>
              )}
            </button>
          </div>
        </div>

        {scanResults && (
          <div className="card">
            <div className="card-header">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-gray-400" />
                <h3 className="card-title">Scan Results</h3>
              </div>
            </div>
            <div className="card-content">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Target:</span>
                  <span className="text-sm font-medium text-gray-100">{scanResults.target}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Scan Time:</span>
                  <span className="text-sm font-medium text-gray-100">
                    {scanResults.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Open Ports:</span>
                  <span className="text-sm font-medium text-success-400">
                    {scanResults.ports.filter(p => p.status === 'open').length}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {scanResults.ports.map((port: any, index: number) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2 rounded ${
                      port.status === 'open' ? 'bg-success-600/20 border border-success-600/30' : 'bg-dark-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-100">Port {port.port}</span>
                      <span className="text-xs text-gray-400">({port.service})</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      port.status === 'open' 
                        ? 'bg-success-600 text-success-100' 
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {port.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Available Tools</h3>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Port Scanner', icon: Network, status: 'Available' },
              { name: 'Ping Tool', icon: Activity, status: 'Coming Soon' },
              { name: 'Traceroute', icon: Globe, status: 'Coming Soon' },
              { name: 'DNS Lookup', icon: Search, status: 'Coming Soon' },
              { name: 'WHOIS Lookup', icon: Shield, status: 'Coming Soon' },
              { name: 'Subdomain Enumeration', icon: Zap, status: 'Coming Soon' }
            ].map((tool, index) => (
              <div key={index} className="p-3 rounded-lg border border-dark-600">
                <div className="flex items-center space-x-3">
                  <tool.icon className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-100">{tool.name}</div>
                    <div className="text-xs text-gray-400">{tool.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}