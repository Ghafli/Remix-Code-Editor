import { useMemo } from 'react';
import { calculateDiff } from '~/utils/diff';

interface DiffViewProps {
  oldContent: string;
  newContent: string;
}

export default function DiffView({ oldContent, newContent }: DiffViewProps) {
  const diff = useMemo(() => calculateDiff(oldContent, newContent), [oldContent, newContent]);

  return (
    <div className="font-mono text-sm">
      <div className="flex items-center gap-4 p-2 border-b dark:border-gray-700">
        <span className="text-green-500">+{diff.additions} additions</span>
        <span className="text-red-500">-{diff.deletions} deletions</span>
      </div>
      <div className="p-4">
        {diff.changes.map((change, index) => (
          <pre
            key={index}
            className={`whitespace-pre-wrap ${
              change.added
                ? 'bg-green-100 dark:bg-green-900'
                : change.removed
                ? 'bg-red-100 dark:bg-red-900'
                : ''
            }`}
          >
            {change.value}
          </pre>
        ))}
      </div>
    </div>
  );
}
