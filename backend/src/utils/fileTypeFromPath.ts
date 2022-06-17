export const fileTypeFromPath = (fileName: string) =>
  fileName.match(/([^.]+$)/gi)[0];
