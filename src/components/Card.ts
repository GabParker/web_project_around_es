import type { CardData } from "../types/types.js";

export class Card {
  protected data: CardData;
  protected cardElement!: HTMLElement;

  private templateSelector: string;
  private handleCardClick: (name: string, link: string) => void;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void
  ) {
    this.data = data;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  protected getTemplate(): HTMLElement {
    const cardTemplate = document.querySelector<HTMLTemplateElement>(
      this.templateSelector
    );

    return cardTemplate!.content
      .querySelector(".card")!
      .cloneNode(true) as HTMLElement;
  }

  private handleLikeClick(): void {
    const likeButton =
      this.cardElement.querySelector<HTMLButtonElement>(
        ".card__like-button"
      );

    likeButton?.classList.toggle("card__like-button_is-active");
  }

  private handleDeleteClick(): void {
    this.cardElement.remove();
  }

  private setEventListeners(): void {
    const cardImage =
      this.cardElement.querySelector<HTMLImageElement>(".card__image");

    const likeButton =
      this.cardElement.querySelector<HTMLButtonElement>(
        ".card__like-button"
      );

    const deleteButton =
      this.cardElement.querySelector<HTMLButtonElement>(
        ".card__delete-button"
      );

    cardImage?.addEventListener("click", () => {
      this.handleCardClick(this.data.name, this.data.link);
    });

    likeButton?.addEventListener("click", () => {
      this.handleLikeClick();
    });

    deleteButton?.addEventListener("click", () => {
      this.handleDeleteClick();
    });
  }

  public generateCard(): HTMLElement {
    this.cardElement = this.getTemplate();

    const cardImage =
      this.cardElement.querySelector<HTMLImageElement>(".card__image");

    const cardTitle =
      this.cardElement.querySelector<HTMLHeadingElement>(".card__title");

    if (cardImage) {
      cardImage.src = this.data.link;
      cardImage.alt = this.data.name;
    }

    if (cardTitle) {
      cardTitle.textContent = this.data.name;
    }

    this.setEventListeners();

    return this.cardElement;
  }
}