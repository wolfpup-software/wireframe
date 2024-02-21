interface SwitchInterface {
    shouldUpdate: boolean;
}
declare function createSwitch(el: HTMLElement): void;
declare class SwitchController {
}
declare function addEvents(): void;
declare function removeEvents(): void;
declare class WFSwitch extends HTMLElement {
    #private;
    static observedAttributes: string[];
    attributeCallbackChanged(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): void;
}
declare const css = "\n\t:host {}\n\t:host([disabled]) {}\n\t:host([aria-checked]) {}\n\t\n\t:root {\n\t\tdisplay: flex;\n\t\t\n\t}\n";
declare class WireframeSwitch extends WFSwitch {
    constructor();
    render(): void;
}
//# sourceMappingURL=switch.d.ts.map