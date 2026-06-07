export class UserInfo {
    nameElement;
    descriptionElement;
    constructor({ nameSelector, descriptionSelector }) {
        this.nameElement = document.querySelector(nameSelector);
        this.descriptionElement = document.querySelector(descriptionSelector);
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent ?? "",
            description: this.descriptionElement.textContent ?? "",
        };
    }
    setUserInfo({ name, description }) {
        this.nameElement.textContent = name;
        this.descriptionElement.textContent = description;
    }
}
//# sourceMappingURL=UserInfo.js.map