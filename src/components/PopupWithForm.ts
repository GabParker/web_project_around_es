import { Popup } from "./Popup.js";

type SubmitCallback = (inputValues: Record<string, string>) => void;

export class PopupWithForm extends Popup {
  private formElement: HTMLFormElement;
  private handleFormSubmit: SubmitCallback;

  constructor(
    popupSelector: string,
    handleFormSubmit: SubmitCallback
  ) {
    super(popupSelector);

    this.formElement = this.popupElement.querySelector(
      ".popup__form"
    ) as HTMLFormElement;

    this.handleFormSubmit = handleFormSubmit;
  }

  private getInputValues(): Record<string, string> {
    const inputList = Array.from(
      this.formElement.querySelectorAll<HTMLInputElement>(
        ".popup__input"
      )
    );

    const values: Record<string, string> = {};

    inputList.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  public override setEventListeners(): void {
    super.setEventListeners();

    this.formElement.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();

      this.handleFormSubmit(this.getInputValues());
    });
  }

  public override close(): void {
    super.close();
    this.formElement.reset();
  }
}