import { resolve } from 'path';
import { readdir } from 'fs/promises';
import express from 'express';

import { fileHash, matchInArray } from './utils';
import sequelize from './sql';
import './sql/associations';
import File from './sql/File';

const PORT = 3333;
const ROOT_DIR = process.argv[2];
const INCLUDED_FILETYPES = ['.png', '.jpg', '.jpeg', '.bmp'];

async function main() {
  if (!ROOT_DIR) {
    console.error('No root directory specified.');
    process.exit(1);
  }

  const app = express();
  await sequelize.sync({ alter: false });

  async function* getFiles(dirPath: string, parent?: File): any {
    const dirEntries = await readdir(dirPath, { withFileTypes: true });
    const [file] = await File.findOrCreate({
      where: { path: dirPath },
      defaults: { id: null, path: dirPath, type: 'folder' },
    });
    await parent?.addChildren([file]);

    for (const dirent of dirEntries) {
      const path = resolve(dirPath, dirent.name);
      if (dirent.isDirectory()) {
        yield* getFiles(path, file);
      } else {
        yield { path, parent: file };
      }
    }
  }

  for await (const { path, parent } of getFiles(ROOT_DIR)) {
    if (!matchInArray(path, INCLUDED_FILETYPES)) continue;

    const hash = await fileHash(path);
    const [file] = await File.findOrCreate({
      where: { id: hash },
      defaults: { id: hash, type: 'file', path },
    });

    await parent.addChild(file);
  }

  app.use('/static', express.static(ROOT_DIR));

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
}

main();
