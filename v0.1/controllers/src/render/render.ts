interface HTMLElementWithRender extends HTMLElement {
  render(): void;
}

class QueueRender {
	#queued_for_update:boolean = false;
	#attributes: Set<string>;

	constructor(attributes: Set<string>) {
		this.#attributes = attributes;
	}
	
	attributeChanged(el: HTMLElementWithRender, attribute: string) {
		if (this.#queued_for_update) return;
		if (this.#attributes.has(attribute) == false) return;
		this.queueRender(el);
	}
	
	queueRender(el: HTMLElementWithRender) {
		if (this.#queued_for_update) return;
		this.#queued_for_update = true;
		queueMicrotask(() => {
			this.#queued_for_update = false;
			el.render();
		});
	}
}

export type {HTMLElementWithRender};

export {QueueRender}
