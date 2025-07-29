import { useState } from 'react'
import { Copy, Download, Hash, Search, Check, Zap } from 'lucide-react'
import { hashString, analyzeHash, HashAlgorithm } from '../utils/hashing'
import toast from 'react-hot-toast'

const hashAlgorithms: { value: HashAlgorithm; label: string; description: string }[] = [
  { value: 'md5', label: 'MD5', description: '128-bit hash (deprecated)' },
  { value: 'sha1', label: 'SHA1', description: '160-bit hash (deprecated)' },
  { value: 'sha256', label: 'SHA256', description: '256-bit hash (recommended)' },
  { value: 'sha512', label: 'SHA512', description: '512-bit hash (high security)' },
  { value: 'bcrypt', label: 'bcrypt', description: 'Adaptive hash for passwords' },
  { value: 'argon2', label: 'Argon2', description: 'Memory-hard hash function' },
  { value: 'scrypt', label: 'scrypt', description: 'Memory-hard key derivation' }
]

const commonPasswords = [
  'password', '123456', 'admin', 'root', 'user', 'test', 'secret', 'password123',
  'qwerty', 'letmein', 'welcome', 'monkey', 'dragon', 'master', 'hello', 'freedom',
  'whatever', 'qwerty123', 'trustno1', 'jordan', 'harley', 'ranger', 'iwantu',
  'jennifer', 'hunter', 'jessica', 'joshua', 'maggie', 'summer', 'amanda', 'george'
]

export default function HashCracker() {
  const [input, setInput] = useState('')
  const [hash, setHash] = useState('')
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<HashAlgorithm>('md5')
  const [analysis, setAnalysis] = useState<any>(null)
  const [cracked, setCracked] = useState<string | null>(null)
  const [isCracking, setIsCracking] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerateHash = () => {
    if (!input.trim()) {
      toast.error('Please enter some text to hash')
      return
    }

    try {
      const generatedHash = hashString(input, selectedAlgorithm)
      setHash(generatedHash)
      toast.success('Hash generated successfully!')
    } catch (error) {
      toast.error('Failed to generate hash')
    }
  }

  const handleAnalyzeHash = () => {
    if (!hash.trim()) {
      toast.error('Please enter a hash to analyze')
      return
    }

    try {
      const analysisResult = analyzeHash(hash)
      setAnalysis(analysisResult)
      toast.success('Hash analyzed successfully!')
    } catch (error) {
      toast.error('Failed to analyze hash')
    }
  }

  const handleCrackHash = async () => {
    if (!hash.trim()) {
      toast.error('Please enter a hash to crack')
      return
    }

    setIsCracking(true)
    setCracked(null)

    // Simulate cracking process
    setTimeout(() => {
      // Simple cracking simulation
      for (const password of commonPasswords) {
        const testHash = hashString(password, selectedAlgorithm)
        if (testHash === hash) {
          setCracked(password)
          toast.success('Hash cracked successfully!')
          setIsCracking(false)
          return
        }
      }
      
      toast.error('Hash not found in common passwords')
      setIsCracking(false)
    }, 2000)
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Hash Cracker</h1>
        <p className="text-gray-400 mt-1">Generate, analyze, and crack hash values</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hash Generation */}
        <div className="space-y-4">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center space-x-2">
                <Hash className="h-5 w-5 text-gray-400" />
                <h3 className="card-title">Generate Hash</h3>
              </div>
            </div>
            <div className="card-content space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Input Text
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text to hash..."
                  className="textarea min-h-[100px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hash Algorithm
                </label>
                <select
                  value={selectedAlgorithm}
                  onChange={(e) => setSelectedAlgorithm(e.target.value as HashAlgorithm)}
                  className="input"
                >
                  {hashAlgorithms.map((algorithm) => (
                    <option key={algorithm.value} value={algorithm.value}>
                      {algorithm.label} - {algorithm.description}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleGenerateHash}
                className="btn btn-primary w-full"
              >
                <Hash className="h-4 w-4 mr-2" />
                Generate Hash
              </button>
            </div>
          </div>

          {/* Hash Analysis */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-gray-400" />
                <h3 className="card-title">Hash Analysis</h3>
              </div>
            </div>
            <div className="card-content space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hash to Analyze
                </label>
                <input
                  type="text"
                  value={hash}
                  onChange={(e) => setHash(e.target.value)}
                  placeholder="Enter hash to analyze..."
                  className="input"
                />
              </div>

              <button
                onClick={handleAnalyzeHash}
                className="btn btn-outline w-full"
              >
                <Search className="h-4 w-4 mr-2" />
                Analyze Hash
              </button>

              {analysis && (
                <div className="space-y-2 p-3 bg-dark-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Length:</span>
                    <span className="text-sm font-medium text-gray-100">{analysis.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Character Set:</span>
                    <span className="text-sm font-medium text-gray-100">{analysis.charset}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Possible Algorithms:</span>
                    <span className="text-sm font-medium text-gray-100">
                      {analysis.possibleAlgorithms.join(', ')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hash Cracking */}
        <div className="space-y-4">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-gray-400" />
                <h3 className="card-title">Hash Cracking</h3>
              </div>
            </div>
            <div className="card-content space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hash to Crack
                </label>
                <input
                  type="text"
                  value={hash}
                  onChange={(e) => setHash(e.target.value)}
                  placeholder="Enter hash to crack..."
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Algorithm (if known)
                </label>
                <select
                  value={selectedAlgorithm}
                  onChange={(e) => setSelectedAlgorithm(e.target.value as HashAlgorithm)}
                  className="input"
                >
                  {hashAlgorithms.map((algorithm) => (
                    <option key={algorithm.value} value={algorithm.value}>
                      {algorithm.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleCrackHash}
                disabled={isCracking}
                className="btn btn-danger w-full"
              >
                {isCracking ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Cracking...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Crack Hash
                  </>
                )}
              </button>

              {cracked && (
                <div className="p-3 bg-success-600/20 border border-success-600/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-success-400">Cracked!</span>
                    <button
                      onClick={() => handleCopy(cracked)}
                      className="btn btn-ghost btn-sm"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-sm text-gray-100 mt-1">{cracked}</p>
                </div>
              )}
            </div>
          </div>

          {/* Generated Hash Output */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Hash className="h-5 w-5 text-gray-400" />
                  <h3 className="card-title">Generated Hash</h3>
                </div>
                <button
                  onClick={() => handleCopy(hash)}
                  disabled={!hash}
                  className="btn btn-ghost btn-sm"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="h-4 w-4 text-success-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="card-content">
              <div className="code-block min-h-[100px] break-all">
                {hash || 'Generated hash will appear here...'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Hashes Examples */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Common Hash Examples</h3>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { text: 'password', hash: '5f4dcc3b5aa765d61d8327deb882cf99', algorithm: 'md5' as HashAlgorithm },
              { text: 'admin', hash: '21232f297a57a5a743894a0e4a801fc3', algorithm: 'md5' as HashAlgorithm },
              { text: '123456', hash: 'e10adc3949ba59abbe56e057f20f883e', algorithm: 'md5' as HashAlgorithm },
              { text: 'hello', hash: '5d41402abc4b2a76b9719d911017c592', algorithm: 'md5' as HashAlgorithm },
              { text: 'test', hash: '098f6bcd4621d373cade4e832627b4f6', algorithm: 'md5' as HashAlgorithm },
              { text: 'secret', hash: '5ebe2294ecd0e0f08eab7690d2a6ee69', algorithm: 'md5' as HashAlgorithm }
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setHash(example.hash)
                  setSelectedAlgorithm(example.algorithm)
                  toast.success(`Loaded example: ${example.text}`)
                }}
                className="p-3 rounded-lg border border-dark-600 hover:border-primary-500/50 hover:bg-dark-700/50 transition-all duration-200 text-left"
              >
                <div className="text-sm font-medium text-gray-100">{example.text}</div>
                <div className="text-xs text-gray-400 mt-1">{example.hash.substring(0, 16)}...</div>
                <div className="text-xs text-gray-400">{example.algorithm.toUpperCase()}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}