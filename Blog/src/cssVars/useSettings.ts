import { ref, watchEffect } from "vue";
import { utils } from "../utils/utils.ts";

const useSettingsModel = () => {
  const cardCorner = ref(12);
  const cardBlur = ref(10);
  const cardSaturate = ref(150);
  const cardShadow = ref(0.3);
  const bgBlur = ref(0);
  const bgSaturate = ref(80);
  const bgBrightness = ref(70);

  watchEffect(() => utils.setCssVar("--card-corner-radius", `${cardCorner.value}px`));
  watchEffect(() => utils.setCssVar("--card-blur", `blur(${cardBlur.value}px)`));
  watchEffect(() => utils.setCssVar("--card-saturate", `saturate(${cardSaturate.value}%)`));
  watchEffect(() => {
    utils.setCssVar("--card-shadow", `${cardShadow.value}`);
    utils.setCssVar("--card-hover-shadow", `${cardShadow.value + 0.1}`);
  });
  watchEffect(() => utils.setCssVar("--bg-blur", `blur(${bgBlur.value}px)`));
  watchEffect(() => utils.setCssVar("--bg-saturate", `saturate(${bgSaturate.value}%)`));
  watchEffect(() => utils.setCssVar("--bg-brightness", `brightness(${bgBrightness.value}%)`));

  type Preset = {
    name: string;
    cardCorner: number;
    cardBlur: number;
    cardSaturate: number;
    cardShadow: number;
    bgBlur: number;
    bgSaturate: number;
    bgBrightness: number;
  };

  const presets: Preset[] = [
    {
      name: "Matte Foundation",
      cardCorner: 12,
      cardBlur: 10,
      cardSaturate: 150,
      cardShadow: 0.3,
      bgBlur: 0,
      bgSaturate: 80,
      bgBrightness: 70,
    },
    {
      name: "Frosted Glass",
      cardCorner: 16,
      cardBlur: 24,
      cardSaturate: 120,
      cardShadow: 0.15,
      bgBlur: 20,
      bgSaturate: 130,
      bgBrightness: 85,
    },
    {
      name: "Minimalist Paper",
      cardCorner: 8,
      cardBlur: 4,
      cardSaturate: 90,
      cardShadow: 0.1,
      bgBlur: 2,
      bgSaturate: 100,
      bgBrightness: 80,
    },
    {
      name: "Cyber Neon",
      cardCorner: 20,
      cardBlur: 16,
      cardSaturate: 200,
      cardShadow: 0.4,
      bgBlur: 30,
      bgSaturate: 180,
      bgBrightness: 40,
    },
    {
      name: "Cyber Neon Flat",
      cardCorner: 8,
      cardBlur: 16,
      cardSaturate: 200,
      cardShadow: 0,
      bgBlur: 30,
      bgSaturate: 180,
      bgBrightness: 40,
    },
    {
      name: "Vintage Polaroid",
      cardCorner: 24,
      cardBlur: 6,
      cardSaturate: 110,
      cardShadow: 0.25,
      bgBlur: 8,
      bgSaturate: 90,
      bgBrightness: 85,
    },
    {
      name: "Deep Space",
      cardCorner: 0,
      cardBlur: 18,
      cardSaturate: 140,
      cardShadow: 0.5,
      bgBlur: 40,
      bgSaturate: 60,
      bgBrightness: 30,
    },
    {
      name: "Pastel Dream",
      cardCorner: 20,
      cardBlur: 12,
      cardSaturate: 80,
      cardShadow: 0.18,
      bgBlur: 15,
      bgSaturate: 70,
      bgBrightness: 95,
    },
  ];

  const usePreset = (name: string): void => {
    const selectedPreset = presets.find((p) => p.name === name);

    if (selectedPreset) {
      cardCorner.value = selectedPreset.cardCorner;
      cardBlur.value = selectedPreset.cardBlur;
      cardSaturate.value = selectedPreset.cardSaturate;
      cardShadow.value = selectedPreset.cardShadow;
      bgBlur.value = selectedPreset.bgBlur;
      bgSaturate.value = selectedPreset.bgSaturate;
      bgBrightness.value = selectedPreset.bgBrightness;
    }
  };

  return {
    cardCorner,
    cardBlur,
    cardSaturate,
    cardShadow,
    bgBlur,
    bgSaturate,
    bgBrightness,

    presets,
    usePreset,
  };
};

export const useSettings = useSettingsModel();
