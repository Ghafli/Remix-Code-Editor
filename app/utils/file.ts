import type { FileNode } from '~/stores/files';
import { filesStore } from '~/stores/files';
import { writeFile, readFile } from './webcontainer';

export async function createFile(path: string, content: string = ''): Promise<void> {
  await writeFile(path, content);
  updateFileTree();
}

export async function createDirectory(path: string): Promise<void> {
  const container = await initializeWebContainer();
  await container.fs.mkdir(path);
  updateFileTree();
}

export async function deleteFileOrDirectory(path: string): Promise<void> {
  const container = await initializeWebContainer();
  await container.fs.rm(path, { recursive: true });
  updateFileTree();
}

export async function renameFileOrDirectory(oldPath: string, newPath: string): Promise<void> {
  const container = await initializeWebContainer();
  const content = await readFile(oldPath);
  await writeFile(newPath, content);
  await container.fs.rm(oldPath);
  updateFileTree();
}

async function updateFileTree() {
  const container = await initializeWebContainer();
  const tree = await buildFileTree(container.fs);
  filesStore.set({ ...filesStore.get(), tree });
}

async function buildFileTree(fs: any, path: string = '/'): Promise<FileNode[]> {
  const entries = await fs.readdir(path, { withFileTypes: true });
  const nodes: FileNode[] = [];

  for (const entry of entries) {
    const fullPath = `${path}${entry.name}`;
    const node: FileNode = {
      id: fullPath,
      name: entry.name,
      type: entry.isDirectory() ? 'directory' : 'file',
      parent: path === '/' ? null : path,
    };

    if (entry.isDirectory()) {
      node.children = await buildFileTree(fs, `${fullPath}/`);
    } else {
      node.content = await readFile(fullPath);
    }

    nodes.push(node);
  }

  return nodes;
}
