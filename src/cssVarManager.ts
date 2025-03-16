import { ref } from "vue";

class CssVarController {
  private _isDebug = ref(false);
  get isDebug() {
    return this._isDebug.value;
  }
  set isDebug(value: boolean) {
    this._isDebug.value = value;

    document.documentElement.style.setProperty("--debug-border", value ? "1px" : "0px");
  }

  private _bgUrl = ref(`url()`);
  get bgUrl() {
    return this._bgUrl.value;
  }
  set bgUrl(value: string) {
    this._bgUrl.value = value;

    document.documentElement.style.setProperty("--bg-url", `url("${value}")`);
  }
  async setBgUrlAsync(value: string): Promise<void> {
    this._bgUrl.value = value;

    await new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        document.documentElement.style.setProperty("--bg-url", `url("${value}")`);
        resolve();
      };
      img.onerror = reject;
      img.src = value;
    });
  }

  private _bgOpacity = ref(`0`);
  get bgOpacity() {
    return this._bgOpacity.value;
  }
  set bgOpacity(value: string) {
    this._bgOpacity.value = value;

    document.documentElement.style.setProperty("--bg-opacity", value);
  }
}

export const cssVarManager = new CssVarController();
