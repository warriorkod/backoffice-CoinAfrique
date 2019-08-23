import BasePage from './basePage';

class DashBoardPage extends BasePage {

    constructor() {
        super();
        this.pageTitle = element(by.css('[class=ks-title]'));
        this.url = 'app/';
        this.pageLoaded = this.hasText(this.pageTitle, 'Dashboard');
    }
}
export default new DashBoardPage();
