import JSZip from 'jszip';
import { v4 as uuidv4 } from 'uuid';
import useEditorStore from '../store/useEditorStore';

export async function buildPack(name: string): Promise<Blob> {
  const zip = new JSZip();
  const pack = zip.folder(name)!;

  // manifest.json
  const manifest = {
    format_version: 2,
    header: {
      uuid: uuidv4(),
      name: `${name} Resource Pack`,
      version: [1, 0, 0]
    },
    modules: [{
      type: 'resources',
      uuid: uuidv4(),
      version: [1, 0, 0]
    }]
  };
  pack.file('manifest.json', JSON.stringify(manifest, null, 2));

  // textures folder
  const textures = pack.folder('textures')!;
  const { pixels, width, height } = useEditorStore.getState();

  // render PNG from pixels
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  Object.entries(pixels).forEach(([key, color]) => {
    const [x, y] = key.split(',').map(Number);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  });
  const dataUrl = canvas.toDataURL().split(',')[1];
  textures.file('skin.png', dataUrl, { base64: true });

  return zip.generateAsync({ type: 'blob' });
}