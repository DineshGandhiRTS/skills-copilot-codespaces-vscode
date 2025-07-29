import { useState } from 'react'
import { Globe, Search, Shield, Activity, Zap, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

export default function WebTools() {
  const [url, setUrl] = useState('')
  const [scanResults, setScanResults] = useState<any>(null)
  const [isScanning, setIsScanning] = useState(false)

  const handleWebScan = () => {
    if (!url.trim()) {
      toast.error('Please enter a URL')
      return
    }

    setIsScanning(true)
    setScanResults(null)

    // Simulate web scanning
    setTimeout(() => {
      const mockResults = {
        url: url,
        timestamp: new Date(),
        headers: {
          'Server': 'nginx/1.18.0',
          'X-Powered-By': 'PHP/7.4.0',
          'Content-Type': 'text/html; charset=UTF-8',
          'X-Frame-Options': 'SAMEORIGIN',
          'X-Content-Type-Options': 'nosniff'
        },
        technologies: ['PHP', 'nginx', 'MySQL', 'WordPress'],
        vulnerabilities: [
          { type: 'XSS', severity: 'Medium', description: 'Potential XSS vulnerability detected' },
          { type: 'CSRF', severity: 'Low', description: 'Missing CSRF protection' }
        ],
        directories: [
          '/admin', '/wp-admin', '/backup', '/config', '/api'
        ]
      }
      setScanResults(mockResults)
      setIsScanning(false)
      toast.success('Web scan completed!')
    }, 4000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Web Tools</h1>
        <p className="text-gray-400 mt-1">Web application testing and analysis tools</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-gray-400" />
              <h3 className="card-title">Web Scanner</h3>
            </div>
          </div>
          <div className="card-content space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="input"
              />
            </div>

            <button
              onClick={handleWebScan}
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
                  Start Web Scan
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
            <div className="card-content space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Target:</span>
                  <span className="text-sm font-medium text-gray-100">{scanResults.url}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Technologies:</span>
                  <span className="text-sm font-medium text-gray-100">
                    {scanResults.technologies.join(', ')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Vulnerabilities:</span>
                  <span className="text-sm font-medium text-danger-400">
                    {scanResults.vulnerabilities.length}
                  </span>
                </div>
              </div>

              {/* Headers */}
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">HTTP Headers</h4>
                <div className="space-y-1">
                  {Object.entries(scanResults.headers).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">{key}:</span>
                      <span className="text-gray-100">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vulnerabilities */}
              {scanResults.vulnerabilities.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Vulnerabilities</h4>
                  <div className="space-y-2">
                    {scanResults.vulnerabilities.map((vuln: any, index: number) => (
                      <div key={index} className="p-2 rounded border border-danger-600/30 bg-danger-600/10">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-danger-400">{vuln.type}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            vuln.severity === 'High' ? 'bg-danger-600 text-danger-100' :
                            vuln.severity === 'Medium' ? 'bg-warning-600 text-warning-100' :
                            'bg-gray-600 text-gray-300'
                          }`}>
                            {vuln.severity}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{vuln.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Directories */}
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Found Directories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {scanResults.directories.map((dir: string, index: number) => (
                    <div key={index} className="text-xs text-gray-400 bg-dark-700 px-2 py-1 rounded">
                      {dir}
                    </div>
                  ))}
                </div>
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
              { name: 'Web Scanner', icon: Globe, status: 'Available' },
              { name: 'Directory Enumeration', icon: Search, status: 'Coming Soon' },
              { name: 'Subdomain Enumeration', icon: Zap, status: 'Coming Soon' },
              { name: 'Vulnerability Scanner', icon: Shield, status: 'Coming Soon' },
              { name: 'SSL Checker', icon: Eye, status: 'Coming Soon' },
              { name: 'Header Analysis', icon: Activity, status: 'Coming Soon' }
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