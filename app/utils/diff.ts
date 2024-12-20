import { diffLines, type Change } from 'diff';

export interface DiffResult {
  changes: Change[];
  additions: number;
  deletions: number;
}

export function calculateDiff(oldContent: string, newContent: string): DiffResult {
  const changes = diffLines(oldContent, newContent);
  let additions = 0;
  let deletions = 0;

  changes.forEach((change) => {
    if (change.added) {
      additions += change.count || 0;
    }
    if (change.removed) {
      deletions += change.count || 0;
    }
  });

  return { changes, additions, deletions };
}
