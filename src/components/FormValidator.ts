import type { FormConfig } from "../types/types.js";

export class FormValidator {
  private config: FormConfig;
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];
  private submitButton: HTMLButtonElement;

  constructor(config: FormConfig, formElement: HTMLFormElement) {
    this.config = config;
    this.formElement = formElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll<HTMLInputElement>(this.config.inputSelector)
    );
    this.submitButton = this.formElement.querySelector<HTMLButtonElement>(
      this.config.submitButtonSelector
    )!;
  }

  private showInputError(inputElement: HTMLInputElement, errorMessage: string): void {
    const errorElement = this.formElement.querySelector<HTMLElement>(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(this.config.inputErrorClass);

    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this.config.errorClass);
    }
  }

  private hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this.formElement.querySelector<HTMLElement>(
      `.${inputElement.id}-error`
    );

    inputElement.classList.remove(this.config.inputErrorClass);

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(this.config.errorClass);
    }
  }

  private checkInputValidity(inputElement: HTMLInputElement): void {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  private hasInvalidInput(): boolean {
    return this.inputList.some((inputElement) => !inputElement.validity.valid);
  }

  private toggleButtonState(): void {
    if (this.hasInvalidInput()) {
      this.submitButton.disabled = true;
      this.submitButton.classList.add(this.config.inactiveButtonClass);
    } else {
      this.submitButton.disabled = false;
      this.submitButton.classList.remove(this.config.inactiveButtonClass);
    }
  }

  private setEventListeners(): void {
    this.toggleButtonState();

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  public enableValidation(): void {
    this.setEventListeners();
  }

  public resetValidation(): void {
    this.inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });

    this.toggleButtonState();
  }
}