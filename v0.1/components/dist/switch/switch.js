"use strict";
/*
    https://www.w3.org/WAI/ARIA/apg/patterns/switch/
*/
// add event listeners
// add role
// aria-checked
function createSwitch(el) {
    el.setAttribute("role", "switch");
    if (el.getAttribute("tabindex") !== null) {
        el.setAttribute("tabindex", "0");
    }
    el.addEventListener("pointerup", () => {
    });
    el.addEventListener("keydown", (e) => {
        if (document.activeElement !== el)
            return;
        let attr = el.getAttribute("aria-checked");
        attr === "false"
            ? el.setAttribute("true")
            : el.setAttribute("false");
    });
}
// add event listeners
// add role
// aria-checked
class SwitchController {
}
() => {
    #callback;
    connect();
    {
        // add events and attributes
    }
    disconnect();
    {
        // remove event
    }
    update();
    {
        // exec callback that has render functions
    }
};
function addEvents() { }
function removeEvents() { }
class WFSwitch extends HTMLElement {
    static observedAttributes = ["aria-checked"];
    #switchController = new SwitchController();
    // form associated, element internals
    // attributes are updated
    // should update property called
    attributeCallbackChanged() {
        // mark update for the next 
        this.#switchController.update(this);
    }
    connectedCallback() {
        this.#switchController.addEvents(this);
    }
    disconnectedCallback() {
        this.#switchController.removeEvents(this);
    }
    // eventually there needs to be an update or render function to handle shadow dom
    render() { }
}
// if aria-checked
// if active
// if focused
// if disabled
// if required
const css = `
	:host {}
	:host([disabled]) {}
	:host([aria-checked]) {}
	
	:root {
		display: flex;
		
	}
`;
// This reflects experience of the upstream developers
class WireframeSwitch extends WFSwitch {
    constructor() {
        // this.#switchController.init()
        // make shadow dom
        // switch only needs a box and a container
        // host -> one 
    }
    render() {
        let checked = this.getAttribute("aria-checked") === "true";
        // do something about the change
    }
}
