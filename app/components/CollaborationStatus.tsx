import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { getCollaborators, updateUserInfo } from '~/utils/collaboration';

export default function CollaborationStatus() {
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCollaborators(getCollaborators());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateName = () => {
    const name = prompt('Enter your name:');
    if (name) {
      updateUserInfo({
        name,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative"
      >
        <Users className="w-5 h-5" />
        {collaborators.length > 1 && (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {collaborators.length}
          </span>
        )}
      </button>

      {showDetails && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Collaborators</h3>
              <button
                onClick={updateName}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Set Name
              </button>
            </div>
            <div className="space-y-2">
              {collaborators.map((user) => (
                <div key={user.id} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: user.color }}
                  />
                  <span className="text-sm">{user.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
