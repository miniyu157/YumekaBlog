const utilsModel = () => {
  const setCssVar = (property: string, value: string) => {
    document.documentElement.style.setProperty(property, value);
  };

  return {
    setCssVar,
  };
};

export const utils = utilsModel();
