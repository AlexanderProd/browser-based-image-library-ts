export const matchInArray = (s: string, a: Array<string>) =>
  a.some(elem => {
    return s.toLowerCase().includes(elem);
  });
