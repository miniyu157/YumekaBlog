import { ref, watchEffect } from "vue";
import { utils } from "../utils/utils.ts";

const defSettingsModel = () => {
  const isDebug = ref(false);
  const bgUrl = ref("/src/assets/images/yumeka.jpg");
  const maskOpacity = ref<Number>(100);

  watchEffect(() => utils.setCssVar("--debug-border", isDebug.value ? "1px" : "0px"));
  watchEffect(() => utils.setCssVar("--bg-url", `url("${bgUrl.value}")`));
  watchEffect(() => utils.setCssVar("--mask-opacity", `${maskOpacity.value}%`));

  const setBgUrlAsync = async (value: string) => {
    const newUrl = value;
    await new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        bgUrl.value = newUrl;
        resolve();
      };
      img.onerror = reject;
      img.src = newUrl;
    });
  };

  return {
    isDebug,
    bgUrl,
    maskOpacity,

    setBgUrlAsync,
  };
};

export const defSettings = defSettingsModel();
