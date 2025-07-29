import { useState } from 'react'
import { Settings, Moon, Sun, Monitor, Bell, Save, Palette, Shield } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Settings() {
  const [settings, setSettings] = useState({
    theme: 'dark',
    autoSave: true,
    notifications: true,
    defaultEncoding: 'base64',
    defaultHashAlgorithm: 'sha256',
    securityLevel: 'medium'
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSaveSettings = () => {
    // In a real app, this would save to localStorage or backend
    toast.success('Settings saved successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Settings</h1>
        <p className="text-gray-400 mt-1">Configure your HT Tool preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center space-x-2">
              <Palette className="h-5 w-5 text-gray-400" />
              <h3 className="card-title">Appearance</h3>
            </div>
          </div>
          <div className="card-content space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Theme
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'light', icon: Sun, label: 'Light' },
                  { value: 'dark', icon: Moon, label: 'Dark' },
                  { value: 'auto', icon: Monitor, label: 'Auto' }
                ].map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => handleSettingChange('theme', theme.value)}
                    className={`p-3 rounded-lg border transition-all ${
                      settings.theme === theme.value
                        ? 'border-primary-500 bg-primary-500/20'
                        : 'border-dark-600 hover:border-primary-500/50'
                    }`}
                  >
                    <theme.icon className="h-5 w-5 mx-auto mb-2 text-gray-400" />
                    <span className="text-xs text-gray-300">{theme.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-gray-400" />
              <h3 className="card-title">General</h3>
            </div>
          </div>
          <div className="card-content space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-300">Auto Save</label>
                <p className="text-xs text-gray-400">Automatically save your work</p>
              </div>
              <button
                onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoSave ? 'bg-primary-600' : 'bg-dark-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-300">Notifications</label>
                <p className="text-xs text-gray-400">Show toast notifications</p>
              </div>
              <button
                onClick={() => handleSettingChange('notifications', !settings.notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications ? 'bg-primary-600' : 'bg-dark-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Default Settings */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Default Settings</h3>
          </div>
          <div className="card-content space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Default Encoding Method
              </label>
              <select
                value={settings.defaultEncoding}
                onChange={(e) => handleSettingChange('defaultEncoding', e.target.value)}
                className="input"
              >
                <option value="base64">Base64</option>
                <option value="hex">Hexadecimal</option>
                <option value="binary">Binary</option>
                <option value="url">URL Encoding</option>
                <option value="rot13">ROT13</option>
                <option value="caesar">Caesar Cipher</option>
                <option value="morse">Morse Code</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Default Hash Algorithm
              </label>
              <select
                value={settings.defaultHashAlgorithm}
                onChange={(e) => handleSettingChange('defaultHashAlgorithm', e.target.value)}
                className="input"
              >
                <option value="md5">MD5</option>
                <option value="sha1">SHA1</option>
                <option value="sha256">SHA256</option>
                <option value="sha512">SHA512</option>
                <option value="bcrypt">bcrypt</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-gray-400" />
              <h3 className="card-title">Security</h3>
            </div>
          </div>
          <div className="card-content space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Security Level
              </label>
              <select
                value={settings.securityLevel}
                onChange={(e) => handleSettingChange('securityLevel', e.target.value)}
                className="input"
              >
                <option value="low">Low - Basic security</option>
                <option value="medium">Medium - Standard security</option>
                <option value="high">High - Enhanced security</option>
                <option value="paranoid">Paranoid - Maximum security</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Session Timeout</span>
                <span className="text-gray-100">30 minutes</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Data Encryption</span>
                <span className="text-success-400">Enabled</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Audit Logging</span>
                <span className="text-success-400">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Data Management</h3>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-dark-600 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-success-500"></div>
                <span className="text-sm font-medium text-gray-100">Recent Activity</span>
              </div>
              <p className="text-xs text-gray-400">47 entries</p>
              <button className="btn btn-outline btn-sm mt-2 w-full">Clear</button>
            </div>

            <div className="p-4 border border-dark-600 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-warning-500"></div>
                <span className="text-sm font-medium text-gray-100">Cached Data</span>
              </div>
              <p className="text-xs text-gray-400">2.3 MB</p>
              <button className="btn btn-outline btn-sm mt-2 w-full">Clear</button>
            </div>

            <div className="p-4 border border-dark-600 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-danger-500"></div>
                <span className="text-sm font-medium text-gray-100">All Data</span>
              </div>
              <p className="text-xs text-gray-400">5.7 MB</p>
              <button className="btn btn-outline btn-sm mt-2 w-full">Clear All</button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="btn btn-primary"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  )
}