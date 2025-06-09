import React, { useEffect } from 'react';
import EditorCanvas from './components/EditorCanvas';
import { Toolbar } from './components/Toolbar';
import { buildPack } from './modules/PackBuilder';
import { saveState, loadState } from './modules/Persistence';
import useEditorStore, { State } from './store/useEditorStore';

export default function App() {
  const { pixels, tool, color, clear } = useEditorStore(
    state => ({ pixels: state.pixels, tool: state.tool, color: state.color, clear: state.clear })
  );

  // Load saved state on mount
  useEffect(() => {
    (async () => {
      const saved = await loadState();
      if (saved) {
        useEditorStore.setState(saved as Partial<State>);
      }
    })();
  }, []);

  // Auto-save on change
  useEffect(() => {
    saveState({ pixels, tool, color });
  }, [pixels, tool, color]);

  // Export pack
  const handleExport = async () => {
    const blob = await buildPack('my_pack');
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_pack.mcpack';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-4 space-y-4">
      <h1 className="text-2xl font-bold">🎮 Minecraft Skin & Texture Editor 🎨</h1>
      <Toolbar />
      <EditorCanvas />
      <div>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Export Pack
        </button>
        <button
          onClick={clear}
          className="ml-2 px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500"
        >
          Clear Canvas
        </button>
      </div>
    </div>
  );
}