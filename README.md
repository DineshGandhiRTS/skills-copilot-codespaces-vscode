# HT Tool - HackTheBox Companion

A comprehensive web-based tool suite designed for HackTheBox challenges, penetration testing, and CTF competitions. Built with modern React and TypeScript, featuring a beautiful dark theme UI similar to Keka.

![HT Tool](https://img.shields.io/badge/HT-Tool-00ff00?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Features

### 🔧 Core Tools
- **Encoder/Decoder**: Support for Base64, Base32, Hex, Binary, URL encoding, ROT13, Caesar Cipher, Vigenère Cipher, Morse Code, and Braille
- **Hash Cracker**: Generate, analyze, and crack various hash algorithms (MD5, SHA1, SHA256, SHA512, bcrypt, Argon2, scrypt)
- **Network Tools**: Port scanning, network analysis, and reconnaissance tools
- **Web Tools**: Web application testing, vulnerability scanning, and header analysis
- **CTF Tools**: Specialized tools for Capture The Flag challenges

### 🎨 User Interface
- **Modern Dark Theme**: Beautiful dark UI with custom styling
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Feedback**: Toast notifications and loading states
- **Interactive Components**: Hover effects, animations, and smooth transitions

### 🔒 Security Features
- **Client-side Processing**: All sensitive operations happen locally
- **No Data Storage**: No personal data is stored or transmitted
- **Secure Defaults**: Built with security best practices

## 🛠️ Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/ht-tool.git
cd ht-tool

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with sidebar
│   └── LoadingSpinner.tsx
├── pages/              # Application pages
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Encoder.tsx     # Encoding tools
│   ├── Decoder.tsx     # Decoding tools
│   ├── HashCracker.tsx # Hash analysis
│   ├── NetworkTools.tsx # Network scanning
│   ├── WebTools.tsx    # Web testing
│   ├── CTFTools.tsx    # CTF challenges
│   └── Settings.tsx    # User preferences
├── utils/              # Utility functions
│   ├── encoding.ts     # Encoding/decoding algorithms
│   └── hashing.ts      # Hash functions
├── types/              # TypeScript type definitions
│   └── index.ts
├── assets/             # Static assets
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎯 Usage Examples

### Encoding Text
```typescript
import { encode } from './utils/encoding'

// Base64 encoding
const encoded = encode('Hello World', 'base64')
console.log(encoded) // SGVsbG8gV29ybGQ=

// Caesar cipher with custom shift
const caesar = encode('Hello World', 'caesar', { shift: 3 })
console.log(caesar) // Khoor Zruog
```

### Hash Analysis
```typescript
import { hashString, analyzeHash } from './utils/hashing'

// Generate hash
const hash = hashString('password', 'md5')
console.log(hash) // 5f4dcc3b5aa765d61d8327deb882cf99

// Analyze hash
const analysis = analyzeHash(hash)
console.log(analysis.possibleAlgorithms) // ['md5']
```

## 🎨 Customization

### Themes
The application supports multiple themes:
- **Dark Theme** (Default): Modern dark interface
- **Light Theme**: Clean light interface  
- **Auto Theme**: Follows system preference

### Styling
Built with Tailwind CSS for easy customization:
```css
/* Custom colors */
.primary-500 { @apply bg-blue-500; }
.success-500 { @apply bg-green-500; }
.danger-500 { @apply bg-red-500; }
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_APP_TITLE=HT Tool
VITE_APP_VERSION=1.0.0
```

### Build Configuration
Modify `vite.config.ts` for custom build settings:
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📦 Dependencies

### Core Dependencies
- **React 18**: Modern React with hooks
- **TypeScript**: Type safety and better DX
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons

### Development Dependencies
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **HackTheBox**: For inspiration and challenge types
- **Keka**: For UI/UX inspiration
- **React Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework

## 🐛 Known Issues

- Some advanced CTF tools are simulated (coming in future versions)
- Network scanning is limited to demo purposes
- File upload functionality planned for v2.0

## 🚀 Roadmap

### v1.1 (Next Release)
- [ ] File upload support
- [ ] Advanced steganography tools
- [ ] Real network scanning capabilities
- [ ] User authentication system

### v1.2 (Future)
- [ ] Mobile app version
- [ ] Collaborative features
- [ ] Advanced CTF challenge solver
- [ ] Integration with HackTheBox API

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/ht-tool/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ht-tool/discussions)
- **Email**: support@httool.com

---

**Made with ❤️ for the security community**
