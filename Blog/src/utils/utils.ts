export const utils = {
  setCssVar: (property: string, value: string) => {
    document.documentElement.style.setProperty(property, value);
  },

  delay: (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};
