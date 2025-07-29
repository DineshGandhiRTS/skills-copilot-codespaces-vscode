import { useState } from 'react'
import { Copy, Download, RotateCcw, Code, Check, Search } from 'lucide-react'
import { decode, EncodingMethod } from '../utils/encoding'
import toast from 'react-hot-toast'

const decodingMethods: { value: EncodingMethod; label: string; description: string }[] = [
  { value: 'base64', label: 'Base64', description: 'Standard base64 decoding' },
  { value: 'base32', label: 'Base32', description: 'Base32 decoding for binary data' },
  { value: 'hex', label: 'Hexadecimal', description: 'Hex decoding for binary data' },
  { value: 'binary', label: 'Binary', description: 'Binary to text conversion' },
  { value: 'url', label: 'URL Decoding', description: 'URL-safe decoding' },
  { value: 'rot13', label: 'ROT13', description: 'Simple letter substitution' },
  { value: 'caesar', label: 'Caesar Cipher', description: 'Shift cipher with configurable offset' },
  { value: 'vigenere', label: 'Vigenère Cipher', description: 'Polyalphabetic substitution cipher' },
  { value: 'morse', label: 'Morse Code', description: 'Morse code to text' },
  { value: 'braille', label: 'Braille', description: 'Braille character decoding' }
]

export default function Decoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<EncodingMethod>('base64')
  const [options, setOptions] = useState({
    shift: 3,
    key: 'KEY'
  })
  const [copied, setCopied] = useState(false)
  const [autoDetect, setAutoDetect] = useState(false)

  const handleDecode = () => {
    if (!input.trim()) {
      toast.error('Please enter some text to decode')
      return
    }

    try {
      const decoded = decode(input, selectedMethod, options)
      setOutput(decoded)
      toast.success('Text decoded successfully!')
    } catch (error) {
      toast.error('Failed to decode text')
    }
  }

  const handleAutoDetect = () => {
    if (!input.trim()) {
      toast.error('Please enter some text to analyze')
      return
    }

    // Simple auto-detection logic
    const text = input.trim()
    let detectedMethod: EncodingMethod = 'base64'
    let confidence = 0

    // Check for Base64
    if (/^[A-Za-z0-9+/]*={0,2}$/.test(text) && text.length % 4 === 0) {
      detectedMethod = 'base64'
      confidence = 90
    }
    // Check for Hex
    else if (/^[0-9A-Fa-f]+$/.test(text) && text.length % 2 === 0) {
      detectedMethod = 'hex'
      confidence = 85
    }
    // Check for Binary
    else if (/^[01\s]+$/.test(text)) {
      detectedMethod = 'binary'
      confidence = 95
    }
    // Check for Morse
    else if (/^[.\-\s/]+$/.test(text)) {
      detectedMethod = 'morse'
      confidence = 80
    }
    // Check for ROT13
    else if (/^[A-Za-z\s]+$/.test(text)) {
      detectedMethod = 'rot13'
      confidence = 70
    }
    // Check for URL encoding
    else if (/%[0-9A-Fa-f]{2}/.test(text)) {
      detectedMethod = 'url'
      confidence = 90
    }

    setSelectedMethod(detectedMethod)
    toast.success(`Detected: ${detectedMethod.toUpperCase()} (${confidence}% confidence)`)
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
    a.download = `decoded_${selectedMethod}.txt`
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
        <h1 className="text-3xl font-bold text-gray-100">Decoder</h1>
        <p className="text-gray-400 mt-1">Decode text using various algorithms and ciphers</p>
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
                placeholder="Enter encoded text to decode..."
                className="textarea min-h-[200px]"
              />
            </div>
          </div>

          {/* Decoding Options */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Decoding Options</h3>
            </div>
            <div className="card-content space-y-4">
              {/* Auto-detect Button */}
              <div className="flex space-x-2">
                <button
                  onClick={handleAutoDetect}
                  disabled={!input.trim()}
                  className="btn btn-outline flex-1"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Auto Detect
                </button>
              </div>

              {/* Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Decoding Method
                </label>
                <select
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value as EncodingMethod)}
                  className="input"
                >
                  {decodingMethods.map((method) => (
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
                    placeholder="Enter decryption key"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={handleDecode}
                  className="btn btn-primary flex-1"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Decode
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
                  <h3 className="card-title">Decoded Output</h3>
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
                {output || 'Decoded text will appear here...'}
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
                    {decodingMethods.find(m => m.value === selectedMethod)?.label}
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
              { text: 'SGVsbG8gV29ybGQ=', method: 'base64' as EncodingMethod },
              { text: '48656c6c6f20576f726c64', method: 'hex' as EncodingMethod },
              { text: 'URYY JBEX', method: 'rot13' as EncodingMethod },
              { text: 'Khoor Zruog', method: 'caesar' as EncodingMethod },
              { text: '.... . .-.. .-.. --- / .-- --- .-. .-.. -..', method: 'morse' as EncodingMethod },
              { text: '01001000 01100101 01101100 01101100 01101111', method: 'binary' as EncodingMethod }
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(example.text)
                  setSelectedMethod(example.method)
                  if (example.method === 'caesar') {
                    setOptions({ ...options, shift: 3 })
                  }
                  toast.success(`Loaded example: ${example.method.toUpperCase()}`)
                }}
                className="p-3 rounded-lg border border-dark-600 hover:border-primary-500/50 hover:bg-dark-700/50 transition-all duration-200 text-left"
              >
                <div className="text-sm font-medium text-gray-100">{example.text.substring(0, 20)}...</div>
                <div className="text-xs text-gray-400 mt-1">{example.method.toUpperCase()}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}