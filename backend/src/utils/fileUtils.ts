import * as fs from 'node:fs';

const createDirectoryIfNotFound = (path: string) => {
  if (!fs.existsSync(path)) fs.mkdirSync(path);
};

export { createDirectoryIfNotFound };
