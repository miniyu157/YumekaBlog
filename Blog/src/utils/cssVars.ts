import { computed, ref, watch, watchEffect } from "vue";
import { utils } from "../utils/utils.ts";

type ThemeMode = "light" | "dark";

const cssVarsModel = () => {
  // 公共状态
  const bgUrl = ref("");
  const currentTheme = ref<ThemeMode>("light");
  const isDarkTheme = computed(() => currentTheme.value === "dark");

  // 主题配置
  const themes = {
    light: {
      foreColor: "black",
      backImagMask: "rgba(255, 255, 255, 0.7)",
      butBack: "white",
      cardBack: "rgba(255, 255, 255, 0.8)",
      tagButBackSL: "100%, 90%",
      iconSL: "100%, 48%",
      primaryForeColor: "hsl(var(--primary-hue), 100%, 70%)",
      selectionSL: "100%, 60%",
    },
    dark: {
      foreColor: "#f5f5f5",
      backImagMask: "rgba(30, 30, 30, 0.6)",
      butBack: "#262a2b",
      cardBack: "#303436",
      tagButBackSL: "10%, 15%",
      iconSL: "100%, 60%",
      primaryForeColor: "hsl(var(--primary-hue), 100%, 77%)",
      selectionSL: "100%, 80%",
    },
  };

  // 公共样式属性
  const primaryHue = ref("200");
  const butShadow = ref("0 2px 8px 2px hsla(var(--primary-hue), 100%, 80%, 0.5)");
  const smallCorner = ref("4px");
  const mediumCorner = ref("8px");
  const bigCorner = ref("12px");
  const infiniteCorner = ref("99px");
  const cardShadow = ref("0px 3px 10px 2px rgba(0, 0, 0, 0.2)");
  const cardHoverShadow = ref("0px 3px 10px 2px rgba(0, 0, 0, 0.3)");
  const butBorderSL = ref("100%, 70%");
  const avatarBoxSL = ref("100%, 60%");
  const primaryButBorder = ref("hsl(var(--primary-hue), var(--but-border-sl))");

  // 当前主题的样式属性
  const themeProps = ref({ ...themes.light });

  // 初始化主题
  const initTheme = () => {
    const savedTheme = localStorage.getItem("theme") as ThemeMode;
    if (savedTheme) currentTheme.value = savedTheme;
    applyTheme(currentTheme.value);
  };

  // 应用主题
  const applyTheme = (theme: ThemeMode) => {
    const config = themes[theme];
    Object.assign(themeProps.value, config);
    localStorage.setItem("theme", theme);
  };

  // 切换主题
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === "light" ? "dark" : "light";
    applyTheme(currentTheme.value);
  };

  // 设置 CSS 变量
  watchEffect(() => {
    utils.setCssVar("--bg-url", `url(${bgUrl.value})`);

    // 公共变量
    utils.setCssVar("--primary-hue", primaryHue.value);
    utils.setCssVar("--but-shadow", butShadow.value);
    utils.setCssVar("--small-corner", smallCorner.value);
    utils.setCssVar("--medium-corner", mediumCorner.value);
    utils.setCssVar("--infinite-corner", infiniteCorner.value);
    utils.setCssVar("--big-corner", bigCorner.value);
    utils.setCssVar("--card-shadow", cardShadow.value);
    utils.setCssVar("--card-hover-shadow", cardHoverShadow.value);
    utils.setCssVar("--but-border-sl", butBorderSL.value);
    utils.setCssVar("--avatar-box-sl", avatarBoxSL.value);
    utils.setCssVar("--primary-but-border", primaryButBorder.value);

    // 主题相关变量
    utils.setCssVar("--fore-color", themeProps.value.foreColor);
    utils.setCssVar("--back-imag-mask", themeProps.value.backImagMask);
    utils.setCssVar("--but-back", themeProps.value.butBack);
    utils.setCssVar("--card-back", themeProps.value.cardBack);
    utils.setCssVar("--tag-but-back-sl", themeProps.value.tagButBackSL);
    utils.setCssVar("--icon-sl", themeProps.value.iconSL);
    utils.setCssVar("--primary-fore-color", themeProps.value.primaryForeColor);
    utils.setCssVar("--selection-sl", themeProps.value.selectionSL);
  });

  // 初始化
  initTheme();

  return {
    bgUrl,
    currentTheme,
    isDarkTheme,
    toggleTheme,

    primaryHue,
    butShadow,
    smallCorner,
    bigCorner,
    mediumCorner,
    infiniteCorner,
    cardShadow,
    cardHoverShadow,
    butBorderSL,
    avatarBoxSL,

    ...themeProps.value,
  };
};

export const cssVars = cssVarsModel();
