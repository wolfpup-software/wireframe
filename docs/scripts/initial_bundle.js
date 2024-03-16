/*
    https://www.w3.org/WAI/ARIA/apg/patterns/switch/
*/
function swapChecked(el) {
  let attr = el.getAttribute("aria-checked");
  attr === "false"
    ? el.setAttribute("aria-checked", "true")
    : el.setAttribute("aria-chjecked", "false");
}
const switchAttributes = ["aria-checked"];
new Set(switchAttributes);
class SwitchController {
  keydown = undefined;
  pointerup = undefined;
  setAttributes(el) {
    el.setAttribute("role", "switch");
  }
  // the switch controller doesn't have a need for updating attributes
  // it has a single state that can be visualized through css transitions
  connect(el) {
    this.keydown = function (e) {
      if (e.key !== "enter" && e.key !== "space") return;
      swapChecked(el);
    };
    this.pointerup = function (e) {
      if (e.isPrimary === false) return;
      swapChecked(el);
    };
    if (this.keydown) el.addEventListener("keydown", this.keydown);
    if (this.pointerup) el.addEventListener("pointerup", this.pointerup);
  }
  disconnect(el) {
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

/* https://www.w3.org/WAI/ARIA/apg/patterns/switch/ */
class SwitchWf extends HTMLElement {
  // default settings? Primary only
  #switchController = new SwitchController();
  constructor() {
    super();
  }
  connectedCallback() {
    this.#switchController.connect(this);
  }
  disconnectedCallback() {
    this.#switchController.disconnect(this);
  }
}

const switchComponent = new SwitchWf();
console.log(switchComponent);
