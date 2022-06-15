export const fileNameFromPath = (fileName: string) =>
  fileName.match(/([^/]+$)/gi)[0];
