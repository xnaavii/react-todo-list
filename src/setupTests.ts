import "@testing-library/jest-dom";

if (window.HTMLDialogElement && !window.HTMLDialogElement.prototype.showModal) {
  Object.defineProperty(window.HTMLDialogElement.prototype, 'showModal', {
    writable: true,
    value: function showModal() {
      this.open = true;
    },
  });
}


if (window.HTMLDialogElement && !window.HTMLDialogElement.prototype.close) {
  Object.defineProperty(window.HTMLDialogElement.prototype, 'close', {
    writable: true,
    value: function close() {
      this.close = true;
    },
  });
}