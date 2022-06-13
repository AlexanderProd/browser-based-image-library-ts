import { createHash } from 'crypto';
import { createReadStream } from 'fs';

export function fileHash(filename: string, algorithm = 'md5'): Promise<string> {
  return new Promise((resolve, reject) => {
    // Algorithm depends on availability of OpenSSL on platform
    // Another algorithms: 'sha1', 'md5', 'sha256', 'sha512' ...
    const shasum = createHash(algorithm);
    try {
      const stream = createReadStream(filename);
      stream.on('data', data => {
        shasum.update(data);
      });
      // making digest
      stream.on('end', () => {
        const hash = shasum.digest('hex');
        return resolve(hash);
      });
    } catch (error) {
      return reject('creating Hash failed');
    }
  });
}
