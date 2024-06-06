// need to represent states
// base (unhydrated)
// hover?
// focus
// active
// hydrated

const template = `
<style>
  :host {}
  #toggle {}
  :host([aria-checked]) #toggle {}
  :host(:focus) {}
  :host(:active) {}
  :host([disabled]) {}
  :host([ssr]) {}
</style>
<div id="toggle"></div>
`;

const declarativeShadowDom = `
  <template shadowrootmode=closed shadowrootdelegatesfocus>${template}</template>
`

// https://webkit.org/blog/13711/elementinternals-and-form-associated-custom-elements/
// @ ts-expect-error (ariaRole exists on ElementInternals)
// this.#internals.ariaRole = "switch";
// seems to not exist?

// value

// See how callbacks work, does setting state from inside component affect attribute changed callback?


class WfSwitch extends HTMLElement {
  static observedAttribtues = ["aria-checked"];

  #internals: ElementInternals;

  constructor() {
    super();
    // set role
    if (!this.getAttribute("role")) this.setAttribute("role", "switch");

    // add form compatibility
    this.#internals = this.attachInternals();
    this.#update();

    // bind host callbacks
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.addEventListener("keydown", this.onKeyDown);
    this.addEventListener("pointerup", this.onPointerUp);

    // add template to shadow root if none
    if (!this.shadowRoot) {
      let shadowRoot = this.attachShadow({
        mode: "closed",
        delegatesFocus: true,
      });
      const templateEl = document.createElement("template");
      templateEl.innerHTML = template;
      shadowRoot.appendChild(templateEl.content.cloneNode(true));
    };

    this.removeAttribute("ssr");
  }

  // lifecycle
  attributeChangedCallback() {
    this.#update();
  }

  formStateRestoreCallback(state, _reason) {
    // set form state again
    this.#internals.setFormValue(state);
    state === null
      ? this.removeAttribute("aria-checked")
      : this.setAttribute("aria-checked", "");
  }

  // interactions
  onKeyDown(e: Event) {
    if (!(e instanceof KeyboardEvent)) return;
    if (e.repeat) return;
    if (e.key !== " " && e.key !== "Enter") return;
    this.#swapChecked();
  }

  onPointerUp(e: Event) {
    if (!(e instanceof PointerEvent)) return;
    this.#swapChecked();
  }

  // utility
  #swapChecked() {
    this.getAttribute("aria-checked") === null
      ? this.setAttribute("aria-checked", "")
      : this.removeAttribute("aria-checked")
  }

  #update() {
    let valueAttr = this.getAttribute("value") || "on";
    let value = this.getAttribute("aria-checked") === null
      ? null
      : valueAttr;

    this.#internals.setFormValue(value);
  }
}

export { WfSwitch, template }
