import { useState } from 'react'
import { Copy, Download, RotateCcw, Code, Check } from 'lucide-react'
import { encode, EncodingMethod } from '../utils/encoding'
import toast from 'react-hot-toast'

const encodingMethods: { value: EncodingMethod; label: string; description: string }[] = [
  { value: 'base64', label: 'Base64', description: 'Standard base64 encoding' },
  { value: 'base32', label: 'Base32', description: 'Base32 encoding for binary data' },
  { value: 'hex', label: 'Hexadecimal', description: 'Hex encoding for binary data' },
  { value: 'binary', label: 'Binary', description: 'Binary representation' },
  { value: 'url', label: 'URL Encoding', description: 'URL-safe encoding' },
  { value: 'rot13', label: 'ROT13', description: 'Simple letter substitution' },
  { value: 'caesar', label: 'Caesar Cipher', description: 'Shift cipher with configurable offset' },
  { value: 'vigenere', label: 'Vigenère Cipher', description: 'Polyalphabetic substitution cipher' },
  { value: 'morse', label: 'Morse Code', description: 'Morse code representation' },
  { value: 'braille', label: 'Braille', description: 'Braille character encoding' }
]

export default function Encoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<EncodingMethod>('base64')
  const [options, setOptions] = useState({
    shift: 3,
    key: 'KEY'
  })
  const [copied, setCopied] = useState(false)

  const handleEncode = () => {
    if (!input.trim()) {
      toast.error('Please enter some text to encode')
      return
    }

    try {
      const encoded = encode(input, selectedMethod, options)
      setOutput(encoded)
      toast.success('Text encoded successfully!')
    } catch (error) {
      toast.error('Failed to encode text')
    }
  }

  const handleCopy = async () => {
    if (!output) return
    
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const handleDownload = () => {
    if (!output) return
    
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `encoded_${selectedMethod}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('File downloaded!')
  }

  const handleReset = () => {
    setInput('')
    setOutput('')
    setOptions({ shift: 3, key: 'KEY' })
    toast.success('Reset completed!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Encoder</h1>
        <p className="text-gray-400 mt-1">Encode text using various algorithms and ciphers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-gray-400" />
                <h3 className="card-title">Input Text</h3>
              </div>
            </div>
            <div className="card-content">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to encode..."
                className="textarea min-h-[200px]"
              />
            </div>
          </div>

          {/* Encoding Options */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Encoding Options</h3>
            </div>
            <div className="card-content space-y-4">
              {/* Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Encoding Method
                </label>
                <select
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value as EncodingMethod)}
                  className="input"
                >
                  {encodingMethods.map((method) => (
                    <option key={method.value} value={method.value}>
                      {method.label} - {method.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Caesar Cipher Options */}
              {selectedMethod === 'caesar' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Shift Value
                  </label>
                  <input
                    type="number"
                    value={options.shift}
                    onChange={(e) => setOptions({ ...options, shift: parseInt(e.target.value) || 3 })}
                    className="input"
                    min="1"
                    max="25"
                  />
                </div>
              )}

              {/* Vigenère Cipher Options */}
              {selectedMethod === 'vigenere' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Key
                  </label>
                  <input
                    type="text"
                    value={options.key}
                    onChange={(e) => setOptions({ ...options, key: e.target.value })}
                    className="input"
                    placeholder="Enter encryption key"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={handleEncode}
                  className="btn btn-primary flex-1"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Encode
                </button>
                <button
                  onClick={handleReset}
                  className="btn btn-outline"
                  title="Reset"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-gray-400" />
                  <h3 className="card-title">Encoded Output</h3>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleCopy}
                    disabled={!output}
                    className="btn btn-ghost btn-sm"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="h-4 w-4 text-success-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={!output}
                    className="btn btn-ghost btn-sm"
                    title="Download as file"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="card-content">
              <div className="code-block min-h-[200px] whitespace-pre-wrap break-all">
                {output || 'Encoded text will appear here...'}
              </div>
            </div>
          </div>

          {/* Method Info */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Method Information</h3>
            </div>
            <div className="card-content">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Selected Method:</span>
                  <span className="text-sm font-medium text-gray-100">
                    {encodingMethods.find(m => m.value === selectedMethod)?.label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Input Length:</span>
                  <span className="text-sm font-medium text-gray-100">{input.length} characters</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Output Length:</span>
                  <span className="text-sm font-medium text-gray-100">{output.length} characters</span>
                </div>
                {selectedMethod === 'caesar' && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Shift Value:</span>
                    <span className="text-sm font-medium text-gray-100">{options.shift}</span>
                  </div>
                )}
                {selectedMethod === 'vigenere' && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Key:</span>
                    <span className="text-sm font-medium text-gray-100">{options.key}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Examples */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Quick Examples</h3>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { text: 'Hello World', method: 'base64' as EncodingMethod },
              { text: 'Secret Message', method: 'hex' as EncodingMethod },
              { text: 'CTF Challenge', method: 'rot13' as EncodingMethod },
              { text: 'HackTheBox', method: 'caesar' as EncodingMethod },
              { text: 'Security Test', method: 'morse' as EncodingMethod },
              { text: 'Encoded Data', method: 'binary' as EncodingMethod }
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(example.text)
                  setSelectedMethod(example.method)
                  if (example.method === 'caesar') {
                    setOptions({ ...options, shift: 3 })
                  }
                  toast.success(`Loaded example: ${example.text}`)
                }}
                className="p-3 rounded-lg border border-dark-600 hover:border-primary-500/50 hover:bg-dark-700/50 transition-all duration-200 text-left"
              >
                <div className="text-sm font-medium text-gray-100">{example.text}</div>
                <div className="text-xs text-gray-400 mt-1">{example.method.toUpperCase()}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}