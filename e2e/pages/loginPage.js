import BasePage from './basePage';

class LoginPage extends BasePage {

    constructor() {
        super();
        this.siteTitle = element(by.css('[class=ks-header]'));
        this.usernameField = element(by.css('[name=username]'));
        this.passwordField = element(by.css('[name=password]'));
        this.submitButton = element(by.css('[type=submit]'));

        this.url = 'sign_in/';
        this.pageLoaded = this.hasText(this.siteTitle, 'Login');
    }

    loginAs(credentials)  {
        return this.login(credentials.username, credentials.password);
    }

    login(username, password) {
        this.usernameField.sendKeys(username);
        this.passwordField.sendKeys(password);
        return this.submitButton.click();
    }
}
export default new LoginPage();
