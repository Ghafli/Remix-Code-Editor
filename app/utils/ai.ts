import { editorStore } from '~/stores/editor';
import { filesStore } from '~/stores/files';

interface AISuggestion {
  code: string;
  explanation: string;
}

export async function getCodeSuggestion(prompt: string): Promise<AISuggestion> {
  const currentFile = filesStore.get().selectedFile;
  const currentCode = editorStore.get().content;
  
  const context = {
    file: currentFile,
    code: currentCode,
    prompt
  };

  try {
    const response = await fetch('/api/ai/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(context)
    });

    if (!response.ok) throw new Error('AI request failed');
    return await response.json();
  } catch (error) {
    console.error('AI suggestion error:', error);
    throw error;
  }
}

export async function analyzeCode(code: string): Promise<string> {
  try {
    const response = await fetch('/api/ai/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });

    if (!response.ok) throw new Error('Code analysis failed');
    return await response.json();
  } catch (error) {
    console.error('Code analysis error:', error);
    throw error;
  }
}
