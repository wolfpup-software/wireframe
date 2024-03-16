/* https://www.w3.org/WAI/ARIA/apg/patterns/switch/ */

import { SwitchController, switchAttributes } from "controllers";

// Think of a classic analogue switch on guitars, on off only one press
// (albiet in opposite directions)
// compared to a toggle (left and right locations to press for state)
// required disabled aria-checked
// this component doesn't really need a controller

// or a render, it's just css
// which makes ssr very easy, same structure and styles

// [[][ ]   ] toggle off
// [[   ][ ]] toggle on

const css = `
	:host {};
`;

function setupWfSwitch(el: HTMLElement) {
  const shadowRoot = el.attachShadow({ mode: "open", delegatesFocus: true });
}

class SwitchWf extends HTMLElement {
  // static formAssociated = true;
  static observedAttributes = switchAttributes;

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

function defineWfSwitch() {
  customElements.define("switch-wf", SwitchWf);
}

export { SwitchWf };
