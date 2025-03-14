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
}

export const cssVarManager = new CssVarController();
