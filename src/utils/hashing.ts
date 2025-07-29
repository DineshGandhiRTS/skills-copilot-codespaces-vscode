import { HashAlgorithm } from '../types'
import CryptoJS from 'crypto-js'

// MD5 hashing
export const md5Hash = (input: string): string => {
  return CryptoJS.MD5(input).toString()
}

// SHA1 hashing
export const sha1Hash = (input: string): string => {
  return CryptoJS.SHA1(input).toString()
}

// SHA256 hashing
export const sha256Hash = (input: string): string => {
  return CryptoJS.SHA256(input).toString()
}

// SHA512 hashing
export const sha512Hash = (input: string): string => {
  return CryptoJS.SHA512(input).toString()
}

// Simple bcrypt-like hashing (for demo purposes)
export const bcryptHash = (input: string, saltRounds: number = 10): string => {
  // This is a simplified version - in production, use a proper bcrypt library
  const salt = CryptoJS.lib.WordArray.random(16).toString()
  const hash = CryptoJS.PBKDF2(input, salt, {
    keySize: 256 / 32,
    iterations: Math.pow(2, saltRounds)
  }).toString()
  return `$2b$${saltRounds}$${salt}$${hash}`
}

// Simple Argon2-like hashing (for demo purposes)
export const argon2Hash = (input: string, salt: string = ''): string => {
  // This is a simplified version - in production, use a proper Argon2 library
  const saltToUse = salt || CryptoJS.lib.WordArray.random(16).toString()
  const hash = CryptoJS.PBKDF2(input, saltToUse, {
    keySize: 256 / 32,
    iterations: 10000
  }).toString()
  return `$argon2id$v=19$m=65536,t=3,p=1$${saltToUse}$${hash}`
}

// Simple scrypt-like hashing (for demo purposes)
export const scryptHash = (input: string, salt: string = ''): string => {
  // This is a simplified version - in production, use a proper scrypt library
  const saltToUse = salt || CryptoJS.lib.WordArray.random(16).toString()
  const hash = CryptoJS.PBKDF2(input, saltToUse, {
    keySize: 256 / 32,
    iterations: 16384
  }).toString()
  return `$scrypt$N=16384,r=8,p=1$${saltToUse}$${hash}`
}

// Hash verification functions
export const verifyHash = (input: string, hash: string, algorithm: HashAlgorithm): boolean => {
  const computedHash = hashString(input, algorithm)
  return computedHash === hash
}

// Main hashing function
export const hashString = (input: string, algorithm: HashAlgorithm, options?: any): string => {
  switch (algorithm) {
    case 'md5':
      return md5Hash(input)
    case 'sha1':
      return sha1Hash(input)
    case 'sha256':
      return sha256Hash(input)
    case 'sha512':
      return sha512Hash(input)
    case 'bcrypt':
      return bcryptHash(input, options?.saltRounds || 10)
    case 'argon2':
      return argon2Hash(input, options?.salt)
    case 'scrypt':
      return scryptHash(input, options?.salt)
    default:
      return sha256Hash(input)
  }
}

// Hash cracking simulation (for demo purposes)
export const crackHash = async (hash: string, wordlist: string[]): Promise<string | null> => {
  const algorithms: HashAlgorithm[] = ['md5', 'sha1', 'sha256', 'sha512']
  
  for (const word of wordlist) {
    for (const algorithm of algorithms) {
      const computedHash = hashString(word, algorithm)
      if (computedHash === hash) {
        return word
      }
    }
  }
  
  return null
}

// Generate rainbow table (for demo purposes)
export const generateRainbowTable = (wordlist: string[], algorithms: HashAlgorithm[] = ['md5', 'sha1', 'sha256']): Record<string, string> => {
  const rainbowTable: Record<string, string> = {}
  
  for (const word of wordlist) {
    for (const algorithm of algorithms) {
      const hash = hashString(word, algorithm)
      rainbowTable[hash] = word
    }
  }
  
  return rainbowTable
}

// Hash analysis
export const analyzeHash = (hash: string): { length: number; charset: string; possibleAlgorithms: HashAlgorithm[] } => {
  const length = hash.length
  const charset = [...new Set(hash)].join('')
  
  const possibleAlgorithms: HashAlgorithm[] = []
  
  // Determine possible algorithms based on hash characteristics
  if (length === 32 && /^[a-f0-9]+$/i.test(hash)) {
    possibleAlgorithms.push('md5')
  }
  
  if (length === 40 && /^[a-f0-9]+$/i.test(hash)) {
    possibleAlgorithms.push('sha1')
  }
  
  if (length === 64 && /^[a-f0-9]+$/i.test(hash)) {
    possibleAlgorithms.push('sha256')
  }
  
  if (length === 128 && /^[a-f0-9]+$/i.test(hash)) {
    possibleAlgorithms.push('sha512')
  }
  
  if (hash.startsWith('$2b$') || hash.startsWith('$2a$')) {
    possibleAlgorithms.push('bcrypt')
  }
  
  if (hash.startsWith('$argon2')) {
    possibleAlgorithms.push('argon2')
  }
  
  if (hash.startsWith('$scrypt$')) {
    possibleAlgorithms.push('scrypt')
  }
  
  return {
    length,
    charset,
    possibleAlgorithms
  }
}