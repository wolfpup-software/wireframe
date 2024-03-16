interface HTMLElementWithRender extends HTMLElement {
  render(): void;
}

class MicrotaskRender {
  #queued_for_update: boolean = false;

  queueRender(el: HTMLElementWithRender) {
    if (this.#queued_for_update) return;
    this.#queued_for_update = true;

    queueMicrotask(() => {
      this.#queued_for_update = false;
      el.render();
    });
  }
}

export type { HTMLElementWithRender };

export { MicrotaskRender };
