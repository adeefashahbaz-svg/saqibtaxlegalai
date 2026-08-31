import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

function crc32(buf: Buffer): number {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

const table = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  table[i] = c;
}

function createChunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function generateIconPNG(size: number): Buffer {
  const width = size;
  const height = size;

  // Raw image buffer with filter byte at start of each scanline
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.44;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // Distance from center for squircle shape
      const dx = Math.abs(x - cx);
      const dy = Math.abs(y - cy);
      
      // Rounded rectangle / squircle formula
      const cornerRadius = size * 0.22;
      let inBounds = false;
      let borderDist = 0;

      const rectHalfW = width * 0.44;
      const rectHalfH = height * 0.44;

      const qx = Math.max(dx - (rectHalfW - cornerRadius), 0);
      const qy = Math.max(dy - (rectHalfH - cornerRadius), 0);
      const cornerDist = Math.sqrt(qx * qx + qy * qy);

      if (cornerDist <= cornerRadius) {
        inBounds = true;
        borderDist = cornerRadius - cornerDist;
      }

      if (!inBounds) {
        // Transparent outside
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
        continue;
      }

      // Inside icon background: Gradient from Emerald (#059669) to Dark Forest Slate (#022c22)
      const gradT = (y / height) * 0.8 + (x / width) * 0.2;
      let r = Math.round(5 * (1 - gradT) + 2 * gradT);
      let g = Math.round(150 * (1 - gradT) + 44 * gradT);
      let b = Math.round(105 * (1 - gradT) + 34 * gradT);
      let a = 255;

      // Soft anti-aliased border
      if (borderDist < 2) {
        a = Math.round(255 * (borderDist / 2));
      }

      // Golden outer ring / accent border
      if (borderDist >= 2 && borderDist <= 6) {
        r = 234; g = 179; b = 8; // Gold #eab308
      }

      // Draw Scales of Justice / Monogram in center
      // Normalize coordinate around center -1 to 1
      const nx = (x - cx) / (size * 0.35);
      const ny = (y - cy) / (size * 0.35);

      // Central Pillar (-0.05 to +0.05, -0.6 to +0.7)
      const isCentralPillar = Math.abs(nx) <= 0.04 && ny >= -0.55 && ny <= 0.55;
      
      // Top cross beam (-0.6 to +0.6, -0.45 to -0.38)
      const isCrossBeam = Math.abs(nx) <= 0.65 && Math.abs(ny - (-0.42)) <= 0.035;
      
      // Base pedestal
      const isBase = (Math.abs(nx) <= 0.35 && Math.abs(ny - 0.55) <= 0.05) ||
                     (Math.abs(nx) <= 0.45 && Math.abs(ny - 0.62) <= 0.04);

      // Left pan strings & pan (left at nx = -0.52)
      const leftDx = nx - (-0.52);
      const isLeftString1 = Math.abs(leftDx - (ny - (-0.42)) * 0.4) <= 0.02 && ny >= -0.42 && ny <= 0.05;
      const isLeftString2 = Math.abs(leftDx + (ny - (-0.42)) * 0.4) <= 0.02 && ny >= -0.42 && ny <= 0.05;
      const isLeftPan = Math.abs(leftDx) <= 0.22 && ny >= 0.05 && ny <= 0.12 && (leftDx * leftDx * 4 + (ny - 0.05) * (ny - 0.05) * 60 <= 0.15);

      // Right pan strings & pan (right at nx = 0.52)
      const rightDx = nx - 0.52;
      const isRightString1 = Math.abs(rightDx - (ny - (-0.42)) * 0.4) <= 0.02 && ny >= -0.42 && ny <= 0.05;
      const isRightString2 = Math.abs(rightDx + (ny - (-0.42)) * 0.4) <= 0.02 && ny >= -0.42 && ny <= 0.05;
      const isRightPan = Math.abs(rightDx) <= 0.22 && ny >= 0.05 && ny <= 0.12 && (rightDx * rightDx * 4 + (ny - 0.05) * (ny - 0.05) * 60 <= 0.15);

      // Top Finial
      const isTopFinial = (nx * nx + (ny - (-0.55)) * (ny - (-0.55))) <= 0.005;

      if (isCentralPillar || isCrossBeam || isBase || isLeftString1 || isLeftString2 || isLeftPan || isRightString1 || isRightString2 || isRightPan || isTopFinial) {
        // Gold Scales of Justice color (#FCD34D to #F59E0B)
        r = 252;
        g = 211;
        b = 77;
        if (isLeftPan || isRightPan || isBase) {
          r = 245; g = 158; b = 11;
        }
      }

      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  // Compress IDAT
  const compressed = zlib.deflateSync(rawData);

  // PNG Header
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8 bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // Deflate
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // No interlace

  const ihdrChunk = createChunk('IHDR', ihdr);
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Generate files for root public and frontend/public
const dirs = [
  path.join(process.cwd(), 'public'),
  path.join(process.cwd(), 'frontend', 'public')
];
for (const dir of dirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const icon512 = generateIconPNG(512);
  fs.writeFileSync(path.join(dir, 'icon-512.png'), icon512);
  fs.writeFileSync(path.join(dir, 'icon-512x512.png'), icon512);

  const icon192 = generateIconPNG(192);
  fs.writeFileSync(path.join(dir, 'icon-192.png'), icon192);
  fs.writeFileSync(path.join(dir, 'icon-192x192.png'), icon192);

  const iconMaskable = generateIconPNG(512);
  fs.writeFileSync(path.join(dir, 'icon-maskable-512.png'), iconMaskable);
}

console.log('Icon generation completed successfully in cwd!');
