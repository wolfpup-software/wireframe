/*
	https://www.w3.org/WAI/ARIA/apg/patterns/switch/
*/

import type { HTMLElementWithRender } from "../render/render.ts";

function swapChecked(el: HTMLElement) {
  let attr = el.getAttribute("aria-checked");
  attr === "false"
    ? el.setAttribute("aria-checked", "true")
    : el.setAttribute("aria-chjecked", "false");
}

function createSwitch(el: HTMLElement) {
  el.setAttribute("role", "switch");
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
  setAttributes(el: HTMLElement): void;
  attributeChanged(
    el: HTMLElementWithRender,
    name: string,
    oldValue: string,
    newValue: string,
  ): void;
  connect(el: HTMLElement): void;
  disconnect(el: HTMLElement): void;
}

const switchAttributes = ["aria-checked"];
const switchAttributeSet = new Set(switchAttributes);

// basic interaction
function onKeyDown(e: KeyboardEvent) {
  if (e.key !== "enter" && e.key !== "space") return;
  // swapChecked(el);
}

function onPointerDown(e: PointerEvent) {
  if (e.isPrimary === false) return;
  // swapChecked(el);
}

class SwitchController implements SwitchControllerInterface {
  setAttributes(el: HTMLElement) {
    el.setAttribute("role", "switch");
  }

  attributeChanged(
    el: HTMLElementWithRender,
    name: string,
    oldValue: string,
    newValue: string,
  ) {}

  // the switch controller doesn't have a need for updating attributes
  // it has a single state that can be visualized through css transitions
  connect(el: HTMLElement) {
    // add keyboard event
    // add mouse event
  }

  disconnect(el: HTMLElement) {
    // remove keyboard events
  }
}

export type { SwitchControllerInterface };
export { SwitchController, switchAttributes };
