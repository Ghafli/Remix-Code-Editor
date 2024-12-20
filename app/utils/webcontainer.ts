import { WebContainer } from '@webcontainer/api';

let webcontainerInstance: WebContainer | null = null;

export async function getWebContainer(): Promise<WebContainer> {
  if (webcontainerInstance) {
      return webcontainerInstance;
  }
  const wc = await WebContainer.boot();
   webcontainerInstance = wc;
    return wc;
}