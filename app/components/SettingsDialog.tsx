import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { settingsStore, updateSettings } from '~/stores/settings';
import { Settings, X } from 'lucide-react';

export default function SettingsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const settings = useStore(settingsStore);
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    updateSettings(localSettings);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Settings className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-[600px] max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold">Project Settings</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="space-y-6">
            <section>
              <h3 className="text-sm font-medium mb-4">Project Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Project Name</label>
                  <input
                    type="text"
                    value={localSettings.name}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      name: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Description</label>
                  <textarea
                    value={localSettings.description}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      description: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    rows={3}
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-medium mb-4">Editor Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localSettings.formatOnSave}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      formatOnSave: e.target.checked
                    })}
                    className="mr-2"
                  />
                  <label>Format on Save</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localSettings.autoSave}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      autoSave: e.target.checked
                    })}
                    className="mr-2"
                  />
                  <label>Auto Save</label>
                </div>
                <div>
                  <label className="block text-sm mb-1">Tab Size</label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={localSettings.tabSize}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      tabSize: parseInt(e.target.value)
                    })}
                    className="w-24 px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-medium mb-4">Theme Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Editor Theme</label>
                  <select
                    value={localSettings.theme.editor}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      theme: { ...localSettings.theme, editor: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="github-dark">GitHub Dark</option>
                    <option value="github-light">GitHub Light</option>
                    <option value="monokai">Monokai</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">UI Theme</label>
                  <select
                    value={localSettings.theme.ui}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      theme: { ...localSettings.theme, ui: e.target.value as 'light' | 'dark' | 'system' }
                    })}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t dark:border-gray-700">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
