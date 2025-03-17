import { ref, watchEffect } from "vue";
import { utils } from "../utils/utils.ts";

const useSettingsModel = () => {
  const cardCorner = ref(12);
  const cardBlur = ref(10);
  const cardSaturate = ref(150);

  watchEffect(() => utils.setCssVar("--card-corner-radius", `${cardCorner.value}px`));
  watchEffect(() => utils.setCssVar("--card-blur", `blur(${cardBlur.value}px)`));
  watchEffect(() => utils.setCssVar("--card-saturate", `saturate(${cardSaturate.value}%)`));

  return {
    cardCorner,
    cardBlur,
    cardSaturate,
  };
};

export const useSettings = useSettingsModel();
