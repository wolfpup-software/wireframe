/*
	https://www.w3.org/WAI/ARIA/apg/patterns/switch/
*/

// min dom
interface SwitchInterface {
  shouldUpdate: boolean;
}

// add event listeners
// add role
// aria-checked

function swapChecked(el: HTMLElement) {
  let attr = el.getAttribute("aria-checked");
  attr === "false"
    ? el.setAttribute("aria-checked", "true")
    : el.setAttribute("aria-chjecked", "false");
}

function createSwitch(el: HTMLElement) {
  el.setAttribute("role", "switch");

  if (!el.getAttribute("tabindex")) {
    el.setAttribute("tabindex", "0");
  }
}

/*
The controller manages lifecycle and interactions.

Properties and state is apart of the component.

Components are fundamentally stateful (UI state).

They might not be the source of truth but their attributes
are a reflection of the source of truth
*/

/*
	handle aria checked	
	
	UI interactions, multi touch doesn't cause errors or multiple state switches
	Mouse and Keyboard events don't BOTH change state
*/

interface SwitchControllerInterface {
  queued_for_render: boolean;
  attributeChanged(
    el: HTMLElementWithRender,
    name: string,
    oldValue: string,
    newValue: string,
  ): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
}

const switchAttributes = ["aria-checked"];
const switchAttributeSet = new Set(switchAttributes);

/*
	State / the webcomponent will add event listeners.
	The "checked" state is managed by the webcomponent attribute.
	
	The controller cares about updates. Should it try to render or not.
	
	Do not overide initial attributes
	- tabindex
	- aria-checked
*/

interface HTMLElementWithRender extends HTMLElement {
  render(): void;
}

class SwitchController implements SwitchControllerInterface {
  queued_for_render: boolean = false;

  setDefinedAttributes(el: HTMLElement) {
    el.setAttribute("role", "switch");
    if (!el.getAttribute("tabindex")) {
      el.setAttribute("tabindex", "0");
    }
  }

  attributeChanged(
    el: HTMLElementWithRender,
    name: string,
    oldValue: string,
    newValue: string,
  ) {
    // if attribute is in list
    if (this.queued_for_render) return;
    if (switchAttributeSet.has(name) === false) return;

    // add to microtask queue
    this.queued_for_render = true;
    queueMicrotask(() => {
      this.queued_for_render = false;
      // something to render
      el.render();
    });
  }

  connectedCallback() {
    // add keyboard and
  }
  disconnectedCallback() {}
}

export type { SwitchControllerInterface };
export { SwitchController, switchAttributes };
