export class Popup {
  protected popupElement: HTMLElement;

  constructor(popupSelector: string) {
    this.popupElement = document.querySelector(
      popupSelector
    ) as HTMLElement;
  }

  private handleEscClose = (evt: KeyboardEvent): void => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  public open(...args: unknown[]): void {
    this.popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this.handleEscClose);
  }

  public close(): void {
    this.popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this.handleEscClose);
  }

  public setEventListeners(): void {
    const closeButton =
      this.popupElement.querySelector<HTMLButtonElement>(
        ".popup__close"
      );

    closeButton?.addEventListener("click", () => {
      this.close();
    });

    this.popupElement.addEventListener("mousedown", (evt: MouseEvent) => {
      if (evt.target === this.popupElement) {
        this.close();
      }
    });
  }
}