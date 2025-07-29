import { useState } from 'react'
import { Trophy, Code, Hash, Search, Zap, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CTFTools() {
  const [challengeInput, setChallengeInput] = useState('')
  const [challengeType, setChallengeType] = useState('steganography')
  const [results, setResults] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCTFChallenge = () => {
    if (!challengeInput.trim()) {
      toast.error('Please enter challenge data')
      return
    }

    setIsProcessing(true)
    setResults(null)

    // Simulate CTF challenge processing
    setTimeout(() => {
      const mockResults = {
        type: challengeType,
        input: challengeInput,
        findings: [
          'Hidden text found in image metadata',
          'Base64 encoded string detected',
          'Flag pattern identified: HTB{...}',
          'Steganographic data extracted'
        ],
        flag: 'HTB{st3g0_m4st3r_2024}',
        difficulty: 'Medium',
        category: 'Steganography'
      }
      setResults(mockResults)
      setIsProcessing(false)
      toast.success('Challenge processed successfully!')
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">CTF Tools</h1>
        <p className="text-gray-400 mt-1">Capture The Flag challenge analysis tools</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-gray-400" />
              <h3 className="card-title">Challenge Analyzer</h3>
            </div>
          </div>
          <div className="card-content space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Challenge Type
              </label>
              <select
                value={challengeType}
                onChange={(e) => setChallengeType(e.target.value)}
                className="input"
              >
                <option value="steganography">Steganography</option>
                <option value="crypto">Cryptography</option>
                <option value="forensics">Digital Forensics</option>
                <option value="web">Web Exploitation</option>
                <option value="pwn">Binary Exploitation</option>
                <option value="reverse">Reverse Engineering</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Challenge Data
              </label>
              <textarea
                value={challengeInput}
                onChange={(e) => setChallengeInput(e.target.value)}
                placeholder="Enter challenge data, file content, or encoded text..."
                className="textarea min-h-[150px]"
              />
            </div>

            <button
              onClick={handleCTFChallenge}
              disabled={isProcessing}
              className="btn btn-primary w-full"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Analyze Challenge
                </>
              )}
            </button>
          </div>
        </div>

        {results && (
          <div className="card">
            <div className="card-header">
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="card-content space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Type:</span>
                  <span className="text-sm font-medium text-gray-100">{results.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Difficulty:</span>
                  <span className="text-sm font-medium text-gray-100">{results.difficulty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Category:</span>
                  <span className="text-sm font-medium text-gray-100">{results.category}</span>
                </div>
              </div>

              {/* Findings */}
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Findings</h4>
                <div className="space-y-2">
                  {results.findings.map((finding: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-300">{finding}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flag */}
              {results.flag && (
                <div className="p-3 bg-success-600/20 border border-success-600/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-success-400">Flag Found!</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(results.flag)
                        toast.success('Flag copied to clipboard!')
                      }}
                      className="btn btn-ghost btn-sm"
                    >
                      <Code className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm font-mono text-gray-100 mt-1">{results.flag}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">CTF Challenge Categories</h3>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Steganography', icon: Eye, description: 'Hidden data in images/files', status: 'Available' },
              { name: 'Cryptography', icon: Code, description: 'Encryption and encoding', status: 'Available' },
              { name: 'Digital Forensics', icon: Search, description: 'File and memory analysis', status: 'Coming Soon' },
              { name: 'Web Exploitation', icon: Trophy, description: 'Web vulnerabilities', status: 'Coming Soon' },
              { name: 'Binary Exploitation', icon: Zap, description: 'Buffer overflows and pwn', status: 'Coming Soon' },
              { name: 'Reverse Engineering', icon: Hash, description: 'Malware and binary analysis', status: 'Coming Soon' }
            ].map((category, index) => (
              <div key={index} className="p-3 rounded-lg border border-dark-600">
                <div className="flex items-center space-x-3">
                  <category.icon className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-100">{category.name}</div>
                    <div className="text-xs text-gray-400">{category.description}</div>
                    <div className="text-xs text-primary-400 mt-1">{category.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Quick CTF Examples</h3>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { type: 'Steganography', data: 'Hidden message in image metadata', flag: 'HTB{st3g0_h1dd3n}' },
              { type: 'Cryptography', data: 'SGVsbG8gV29ybGQ=', flag: 'HTB{b64_3nc0d3d}' },
              { type: 'Forensics', data: 'File carving challenge', flag: 'HTB{f1l3_c4rv3r}' },
              { type: 'Web', data: 'SQL injection challenge', flag: 'HTB{sql1_3xpl01t}' },
              { type: 'Pwn', data: 'Buffer overflow challenge', flag: 'HTB{b0f_3xpl01t}' },
              { type: 'Reverse', data: 'Malware analysis', flag: 'HTB{r3v3rs3_3ng1n33r}' }
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setChallengeType(example.type.toLowerCase())
                  setChallengeInput(example.data)
                  toast.success(`Loaded ${example.type} example`)
                }}
                className="p-3 rounded-lg border border-dark-600 hover:border-primary-500/50 hover:bg-dark-700/50 transition-all duration-200 text-left"
              >
                <div className="text-sm font-medium text-gray-100">{example.type}</div>
                <div className="text-xs text-gray-400 mt-1">{example.data}</div>
                <div className="text-xs text-primary-400 mt-1">{example.flag}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}