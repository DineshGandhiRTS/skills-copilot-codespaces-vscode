export interface Tool {
  id: string
  name: string
  description: string
  icon: string
  category: 'encoding' | 'decoding' | 'hashing' | 'network' | 'web' | 'ctf' | 'misc'
  path: string
  color: string
}

export interface EncodingResult {
  input: string
  output: string
  method: string
  timestamp: Date
}

export interface HashResult {
  input: string
  hash: string
  algorithm: string
  timestamp: Date
}

export interface NetworkScan {
  target: string
  ports: number[]
  services: Record<number, string>
  timestamp: Date
}

export interface CTFChallenge {
  id: string
  name: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard' | 'insane'
  description: string
  hints: string[]
  solved: boolean
}

export interface UserSettings {
  theme: 'dark' | 'light' | 'auto'
  autoSave: boolean
  notifications: boolean
  defaultEncoding: string
  defaultHashAlgorithm: string
}

export interface ToolState {
  recentTools: string[]
  favorites: string[]
  settings: UserSettings
}

export type EncodingMethod = 
  | 'base64'
  | 'base32'
  | 'hex'
  | 'binary'
  | 'url'
  | 'rot13'
  | 'caesar'
  | 'vigenere'
  | 'morse'
  | 'braille'

export type HashAlgorithm = 
  | 'md5'
  | 'sha1'
  | 'sha256'
  | 'sha512'
  | 'bcrypt'
  | 'argon2'
  | 'scrypt'

export type NetworkTool = 
  | 'port-scanner'
  | 'ping'
  | 'traceroute'
  | 'dns-lookup'
  | 'whois'
  | 'subdomain-enumeration'

export type WebTool = 
  | 'directory-enumeration'
  | 'subdomain-enumeration'
  | 'port-scanning'
  | 'vulnerability-scanning'
  | 'ssl-checker'
  | 'header-analysis'