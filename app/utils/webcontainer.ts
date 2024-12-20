import { WebContainer } from '@webcontainer/api';
import { filesStore, type FileNode } from '~/stores/files';
import { terminalStore } from '~/stores/terminal';

let webcontainerInstance: WebContainer;

interface FileSystemTree {
  [key: string]: {
    file?: { contents: string };
    directory?: FileSystemTree;
  };
}

export async function initializeWebContainer() {
  if (!webcontainerInstance) {
    webcontainerInstance = await WebContainer.boot();
    
    const files: FileSystemTree = {
      'package.json': {
        file: {
          contents: JSON.stringify({
            name: 'example-project',
            type: 'module',
            dependencies: {},
          }),
        },
      },
    };

    await webcontainerInstance.mount(files);
    
    const terminal = await webcontainerInstance.spawn('node', {
      terminal: {
        cols: 80,
        rows: 24,
      },
    });

    terminal.output.pipeTo(new WritableStream({
      write(data) {
        terminalStore.get().history.push({
          id: crypto.randomUUID(),
          command: '',
          output: data,
          timestamp: Date.now(),
        });
      },
    }));
  }
  return webcontainerInstance;
}

export async function executeCommand(command: string): Promise<string> {
  const container = await initializeWebContainer();
  const process = await container.spawn('sh', {
    args: ['-c', command],
  });
  
  const output: string[] = [];
  process.output.pipeTo(new WritableStream({
    write(data) {
      output.push(data);
    },
  }));

  const exitCode = await process.exit;
  return exitCode === 0 ? output.join('') : Promise.reject(output.join(''));
}

export async function writeFile(path: string, contents: string) {
  const container = await initializeWebContainer();
  await container.fs.writeFile(path, contents);
}

export async function readFile(path: string): Promise<string> {
  const container = await initializeWebContainer();
  const file = await container.fs.readFile(path);
  return new TextDecoder().decode(file);
}
