const template = `
    <style>
    </style>
    <div id="pip"></div>
`;

// https://webkit.org/blog/13711/elementinternals-and-form-associated-custom-elements/
class WfSwitch extends HTMLElement {
  static observedAttribtues = ["aria-checked"];

  #internals: ElementInternals;
  #shadowRoot: ShadowRoot;

  constructor() {
    super();

    // add form compatibility
    this.#internals = this.attachInternals();
    // @ts-expect-error (ariaRole exists on ElementInternals)
    this.#internals.ariaRole = "switch";

    const checked = this.getAttribute("aria-checked");
    if (checked !== null) this.#internals.setFormValue(checked);

    // add shadow root
    this.#shadowRoot = this.attachShadow({
      mode: "closed",
      delegatesFocus: true,
    });
    const templateEl = document.createElement("template");
    templateEl.innerHTML = template;
    this.#shadowRoot.appendChild(templateEl.content.cloneNode(true));
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "aria-checked") {
      // could be "" or "any_value"
      let value = newValue === null ? null : "on";
      this.#internals.setFormValue(value);
    }
  }

  formStateRestoreCallback(state, _reason) {
    state === "on"
      ? this.setAttribute("aria-checked", "")
      : this.removeAttribute("aria-checked");
  }
}
