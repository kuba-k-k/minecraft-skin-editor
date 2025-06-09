import create from 'zustand';

export type Tool = 'pencil' | 'eraser' | 'fill';
export interface Pixel {
  x: number;
  y: number;
  color: string;
}

interface EditorState {
  width: number;
  height: number;
  pixels: Record<string, string>;
  tool: Tool;
  color: string;
  setTool: (t: Tool) => void;
  setColor: (c: string) => void;
  paintPixel: (x: number, y: number) => void;
  clear: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  width: 64,
  height: 64,
  pixels: {},
  tool: 'pencil',
  color: '#000000',
  setTool: (tool) => set({ tool }),
  setColor: (color) => set({ color }),
  paintPixel: (x, y) => {
    const { tool, color, pixels } = get();
    const key = `${x},${y}`;
    const newPixels = { ...pixels };
    if (tool === 'eraser') delete newPixels[key];
    else if (tool === 'fill') {
      // simple flood fill placeholder
      newPixels[key] = color;
    } else {
      newPixels[key] = color;
    }
    set({ pixels: newPixels });
  },
  clear: () => set({ pixels: {} }),
}));