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
}

export const cssVarManager = new CssVarController();
