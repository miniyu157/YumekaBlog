import router from "@/router";

export const utils = {
  setCssVar: (property: string, value: string) => {
    document.documentElement.style.setProperty(property, value);
  },

  delay: (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  openNewPost: (id: string) => {
    router.push(`/blog/postview?id=${id}`);
  },

  formatDatetime: (originalDatetime: string): string => {
    const date = new Date(originalDatetime);
    const year = date.getUTCFullYear().toString().slice(-2);
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  },

  formatNumber: (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`.replace(/\.0k$/, "k");
    }
    return num.toLocaleString();
  },
};
