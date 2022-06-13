import { resolve } from 'path';
import { readdir } from 'fs/promises';
import express from 'express';

import { fileHash } from './utils';
import sequelize from './sql';
import File from './sql/File';

const PORT = 3333;
const ROOT_DIR = process.argv[2];
const INCLUDED_FILETYPES =
  /([a-zA-Z0-9\s_\\.\-\(\):])+(.jpg|.jpeg|.png|.bmp)$/i;

async function main() {
  if (!ROOT_DIR) {
    console.error('No root directory specified.');
    process.exit(1);
  }

  const app = express();
  await sequelize.sync({ alter: true });

  async function* getFiles(dirPath: string, parentId: string): any {
    const dirEntries = await readdir(dirPath, { withFileTypes: true });
    const [file] = await File.findOrCreate({
      where: { path: dirPath },
      defaults: { id: null, path: dirPath, type: 'folder', parent: parentId },
    });
    const dirId = file.id;

    for (const dirent of dirEntries) {
      const path = resolve(dirPath, dirent.name);
      if (dirent.isDirectory()) {
        yield* getFiles(path, dirId);
      } else {
        yield { path, dirId };
      }
    }
  }

  for await (const { path, dirId } of getFiles(ROOT_DIR, 'ROOT_DIR')) {
    const hash = await fileHash(path);
    const [file] = await File.findOrCreate({
      where: { id: hash },
      defaults: { id: hash, type: 'file', path, parent: dirId },
    });
    //file.addParent(parentId);
  }

  app.use('/static', express.static(ROOT_DIR));

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
}

main();
