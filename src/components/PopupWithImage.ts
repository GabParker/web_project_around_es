import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  private popupImage: HTMLImageElement;
  private popupCaption: HTMLElement;

  constructor(popupSelector: string) {
    super(popupSelector);

    this.popupImage = this.popupElement.querySelector(
      ".popup__image"
    ) as HTMLImageElement;

    this.popupCaption = this.popupElement.querySelector(
      ".popup__caption"
    ) as HTMLElement;
  }

  public open(name: string, link: string): void {
    this.popupImage.src = link;
    this.popupImage.alt = name;
    this.popupCaption.textContent = name;

    super.open();
  }
}