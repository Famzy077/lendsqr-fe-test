import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export default async (req, res) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const data = await readFile(path.join(__dirname, 'db.json'), 'utf-8');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).end(data);
};
