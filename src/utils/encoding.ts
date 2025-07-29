import { EncodingMethod } from '../types'

// Base64 encoding/decoding
export const base64Encode = (input: string): string => {
  try {
    return btoa(input)
  } catch {
    return ''
  }
}

export const base64Decode = (input: string): string => {
  try {
    return atob(input)
  } catch {
    return ''
  }
}

// Base32 encoding/decoding
const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

export const base32Encode = (input: string): string => {
  let bits = 0
  let value = 0
  let output = ''
  
  for (let i = 0; i < input.length; i++) {
    value = (value << 8) | input.charCodeAt(i)
    bits += 8
    
    while (bits >= 5) {
      output += base32Chars[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }
  
  if (bits > 0) {
    output += base32Chars[(value << (5 - bits)) & 31]
  }
  
  while (output.length % 8 !== 0) {
    output += '='
  }
  
  return output
}

export const base32Decode = (input: string): string => {
  input = input.replace(/=+$/, '')
  let bits = 0
  let value = 0
  let output = ''
  
  for (let i = 0; i < input.length; i++) {
    const char = input[i].toUpperCase()
    const index = base32Chars.indexOf(char)
    if (index === -1) continue
    
    value = (value << 5) | index
    bits += 5
    
    while (bits >= 8) {
      output += String.fromCharCode((value >>> (bits - 8)) & 255)
      bits -= 8
    }
  }
  
  return output
}

// Hex encoding/decoding
export const hexEncode = (input: string): string => {
  return Array.from(input)
    .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('')
}

export const hexDecode = (input: string): string => {
  try {
    return input.match(/.{1,2}/g)?.map(byte => String.fromCharCode(parseInt(byte, 16))).join('') || ''
  } catch {
    return ''
  }
}

// Binary encoding/decoding
export const binaryEncode = (input: string): string => {
  return Array.from(input)
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ')
}

export const binaryDecode = (input: string): string => {
  try {
    return input.split(' ')
      .map(binary => String.fromCharCode(parseInt(binary, 2)))
      .join('')
  } catch {
    return ''
  }
}

// URL encoding/decoding
export const urlEncode = (input: string): string => {
  return encodeURIComponent(input)
}

export const urlDecode = (input: string): string => {
  try {
    return decodeURIComponent(input)
  } catch {
    return ''
  }
}

// ROT13 encoding/decoding
export const rot13Encode = (input: string): string => {
  return input.replace(/[a-zA-Z]/g, (char) => {
    const code = char.charCodeAt(0)
    const isUpperCase = code >= 65 && code <= 90
    const base = isUpperCase ? 65 : 97
    return String.fromCharCode(((code - base + 13) % 26) + base)
  })
}

export const rot13Decode = rot13Encode // ROT13 is symmetric

// Caesar cipher
export const caesarEncode = (input: string, shift: number = 3): string => {
  return input.replace(/[a-zA-Z]/g, (char) => {
    const code = char.charCodeAt(0)
    const isUpperCase = code >= 65 && code <= 90
    const base = isUpperCase ? 65 : 97
    return String.fromCharCode(((code - base + shift + 26) % 26) + base)
  })
}

export const caesarDecode = (input: string, shift: number = 3): string => {
  return caesarEncode(input, -shift)
}

// Vigenère cipher
export const vigenereEncode = (input: string, key: string): string => {
  const keyUpper = key.toUpperCase()
  let keyIndex = 0
  
  return input.replace(/[a-zA-Z]/g, (char) => {
    const code = char.charCodeAt(0)
    const isUpperCase = code >= 65 && code <= 90
    const base = isUpperCase ? 65 : 97
    const keyChar = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65
    keyIndex++
    return String.fromCharCode(((code - base + keyChar) % 26) + base)
  })
}

export const vigenereDecode = (input: string, key: string): string => {
  const keyUpper = key.toUpperCase()
  let keyIndex = 0
  
  return input.replace(/[a-zA-Z]/g, (char) => {
    const code = char.charCodeAt(0)
    const isUpperCase = code >= 65 && code <= 90
    const base = isUpperCase ? 65 : 97
    const keyChar = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65
    keyIndex++
    return String.fromCharCode(((code - base - keyChar + 26) % 26) + base)
  })
}

// Morse code
const morseCode: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  '!': '-.-.--', ' ': '/'
}

const reverseMorseCode: Record<string, string> = Object.fromEntries(
  Object.entries(morseCode).map(([key, value]) => [value, key])
)

export const morseEncode = (input: string): string => {
  return input.toUpperCase()
    .split('')
    .map(char => morseCode[char] || char)
    .join(' ')
}

export const morseDecode = (input: string): string => {
  return input.split(' ')
    .map(code => reverseMorseCode[code] || code)
    .join('')
}

// Braille encoding (basic implementation)
const brailleMap: Record<string, string> = {
  'A': '⠁', 'B': '⠃', 'C': '⠉', 'D': '⠙', 'E': '⠑', 'F': '⠋',
  'G': '⠛', 'H': '⠓', 'I': '⠊', 'J': '⠚', 'K': '⠅', 'L': '⠇',
  'M': '⠍', 'N': '⠝', 'O': '⠕', 'P': '⠏', 'Q': '⠟', 'R': '⠗',
  'S': '⠎', 'T': '⠞', 'U': '⠥', 'V': '⠧', 'W': '⠺', 'X': '⠭',
  'Y': '⠽', 'Z': '⠵', '0': '⠚', '1': '⠁', '2': '⠃', '3': '⠉',
  '4': '⠙', '5': '⠑', '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊'
}

const reverseBrailleMap: Record<string, string> = Object.fromEntries(
  Object.entries(brailleMap).map(([key, value]) => [value, key])
)

export const brailleEncode = (input: string): string => {
  return input.toUpperCase()
    .split('')
    .map(char => brailleMap[char] || char)
    .join('')
}

export const brailleDecode = (input: string): string => {
  return input.split('')
    .map(char => reverseBrailleMap[char] || char)
    .join('')
}

// Main encoding function
export const encode = (input: string, method: EncodingMethod, options?: any): string => {
  switch (method) {
    case 'base64':
      return base64Encode(input)
    case 'base32':
      return base32Encode(input)
    case 'hex':
      return hexEncode(input)
    case 'binary':
      return binaryEncode(input)
    case 'url':
      return urlEncode(input)
    case 'rot13':
      return rot13Encode(input)
    case 'caesar':
      return caesarEncode(input, options?.shift || 3)
    case 'vigenere':
      return vigenereEncode(input, options?.key || 'KEY')
    case 'morse':
      return morseEncode(input)
    case 'braille':
      return brailleEncode(input)
    default:
      return input
  }
}

// Main decoding function
export const decode = (input: string, method: EncodingMethod, options?: any): string => {
  switch (method) {
    case 'base64':
      return base64Decode(input)
    case 'base32':
      return base32Decode(input)
    case 'hex':
      return hexDecode(input)
    case 'binary':
      return binaryDecode(input)
    case 'url':
      return urlDecode(input)
    case 'rot13':
      return rot13Decode(input)
    case 'caesar':
      return caesarDecode(input, options?.shift || 3)
    case 'vigenere':
      return vigenereDecode(input, options?.key || 'KEY')
    case 'morse':
      return morseDecode(input)
    case 'braille':
      return brailleDecode(input)
    default:
      return input
  }
}