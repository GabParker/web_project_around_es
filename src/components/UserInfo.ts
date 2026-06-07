type UserInfoSelectors = {
  nameSelector: string;
  descriptionSelector: string;
};

type UserData = {
  name: string;
  description: string;
};

export class UserInfo {
  private nameElement: HTMLElement;
  private descriptionElement: HTMLElement;

  constructor({ nameSelector, descriptionSelector }: UserInfoSelectors) {
    this.nameElement = document.querySelector(nameSelector) as HTMLElement;
    this.descriptionElement = document.querySelector(
      descriptionSelector
    ) as HTMLElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this.nameElement.textContent ?? "",
      description: this.descriptionElement.textContent ?? "",
    };
  }

  public setUserInfo({ name, description }: UserData): void {
    this.nameElement.textContent = name;
    this.descriptionElement.textContent = description;
  }
}