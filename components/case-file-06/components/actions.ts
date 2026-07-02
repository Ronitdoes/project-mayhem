"use server";
import fs from 'fs';
import path from 'path';

export async function getTableImages() {
  try {
    const tableDir = path.join(process.cwd(), 'public', 'case-06', 'table');
    if (!fs.existsSync(tableDir)) {
      return [];
    }
    const files = fs.readdirSync(tableDir);
    const images = files.filter(file => /\.(png|jpe?g|gif|svg|webp)$/i.test(file));
    return images;
  } catch (error) {
    console.error("Failed to read table directory in Server Action:", error);
    return [];
  }
}
