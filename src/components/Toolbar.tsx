import React from 'react';
import useEditorStore, { Tool } from '../store/useEditorStore';
import { Menu } from '@headlessui/react';

const tools: Tool[] = ['pencil', 'eraser', 'fill'];

export function Toolbar() {
  const tool = useEditorStore(state => state.tool);
  const setTool = useEditorStore(state => state.setTool);
  const color = useEditorStore(state => state.color);
  const setColor = useEditorStore(state => state.setColor);

  return (
    <div className="flex space-x-2">
      {tools.map(t => (
        <button
          key={t}
          className={`px-2 py-1 border ${tool === t ? 'bg-blue-200' : ''}`}
          onClick={() => setTool(t)}
        >
          {t}
        </button>
      ))}
      <input
        type="color"
        value={color}
        onChange={e => setColor(e.target.value)}
        className="w-8 h-8 p-0 border"
      />
    </div>
  );
}