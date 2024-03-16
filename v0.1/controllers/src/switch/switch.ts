/*
	https://www.w3.org/WAI/ARIA/apg/patterns/switch/
*/

interface SwitchControllerInterface {
  setAttributes(el: HTMLElement): void;
  connect(el: HTMLElement): void;
  disconnect(el: HTMLElement): void;
}

// these could be somewhere else
type KeyboardEventListener = (event: KeyboardEvent) => void;
type PointerEventListener = (event: PointerEvent) => void;

const switchAttributes = ["aria-checked"];
const switchAttributeSet = new Set(switchAttributes);

function swapChecked(el: HTMLElement) {
  el.getAttribute("aria-checked") === "false"
    ? el.setAttribute("aria-checked", "true")
    : el.setAttribute("aria-chjecked", "false");
}

function createSwitch(el: HTMLElement) {
  el.setAttribute("role", "switch");
}

class SwitchController implements SwitchControllerInterface {
  keydown: KeyboardEventListener | undefined = undefined;
  pointerup: PointerEventListener | undefined = undefined;

  setAttributes(el: HTMLElement) {
    el.setAttribute("role", "switch");
  }

  // the switch controller doesn't have a need for updating attributes
  // it has a single state that can be visualized through css transitions
  connect(el: HTMLElement) {
    this.keydown = function (e: KeyboardEvent) {
      if (e.key !== "enter" && e.key !== "space") return;
      swapChecked(el);
    };

    this.pointerup = function (e: PointerEvent) {
      if (e.isPrimary === false) return;
      swapChecked(el);
    };

    if (this.keydown) el.addEventListener("keydown", this.keydown);
    if (this.pointerup) el.addEventListener("pointerup", this.pointerup);
  }

  disconnect(el: HTMLElement) {
    if (this.keydown) {
      el.removeEventListener("keydown", this.keydown);
      this.keydown = undefined;
    }
    if (this.pointerup) {
      el.removeEventListener("pointerup", this.pointerup);
      this.pointerup = undefined;
    }
  }
}

export type { SwitchControllerInterface };
export { SwitchController, switchAttributes };
