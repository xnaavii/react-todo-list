import "@testing-library/jest-dom";

if (window.HTMLDialogElement && !window.HTMLDialogElement.prototype.showModal) {
  Object.defineProperty(window.HTMLDialogElement.prototype, 'showModal', {
    writable: true,
    value: function showModal() {
      this.open = true;
    },
  });
}