import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST() {
  try {
    const dumpDir = path.join(process.cwd(), 'public', 'dump');
    const tableDir = path.join(process.cwd(), 'public', 'table');

    // Create table directory if it doesn't exist
    if (!fs.existsSync(tableDir)) {
      fs.mkdirSync(tableDir, { recursive: true });
    }

    if (!fs.existsSync(dumpDir)) {
      return NextResponse.json({ message: "No dump directory found" });
    }

    const files = fs.readdirSync(dumpDir);
    let copied = 0;

    files.forEach(file => {
      const srcPath = path.join(dumpDir, file);
      const destPath = path.join(tableDir, file);

      // Only copy files
      if (fs.statSync(srcPath).isFile()) {
        fs.copyFileSync(srcPath, destPath);
        copied++;
      }
    });

    return NextResponse.json({ success: true, copied });
  } catch (error) {
    console.error("Failed to copy documents to table", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

