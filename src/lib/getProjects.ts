import fs from 'fs';
import path from 'path';

export function getProjects() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error("Error reading projects:", error);
  }
  return [];
}
