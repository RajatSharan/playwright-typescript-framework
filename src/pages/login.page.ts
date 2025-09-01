import { Page } from '@playwright/test';

export class LoginPage{


    readonly page:Page;
    readonly usernameInput ="#user-name"
    readonly passwordInput='#password'
    readonly loginButton='#login-button'


constructor(page:Page){

    this.page=page
}

  async navigateTo(pageUrl: string) {
    await this.page.goto(pageUrl);
  }

    async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);

    }

  async clickonLoginButton(){

        await this.page.click(this.loginButton)

  }

}



