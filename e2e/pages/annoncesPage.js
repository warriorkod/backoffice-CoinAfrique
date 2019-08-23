import BasePage from './basePage';

class AnnoncePage extends BasePage {

    constructor() {
      super();

      this.rowsOnPage = 0;
      this.rowOnLastPage = 0;

      this.pageTitle = element(by.css('[class=ks-title]'));
      this.annoncessEditModal = element(by.css('[class=modal-dialog]'));
      this.annoncesList = element(by.css(`[name=annoncesTable]`));

      this.toModerateAnnoncesCount = element(by.css('[class="badge badge-warning"]'));
      this.pageCount = element(by.css('[name="totalPage"]'));
      this.pageNbInput = element(by.css('input[name="pageNbInput"]'));
      this.pageSubmit = element(by.css('button[name="pageSubmit"]'));
      this.pageNext = element(by.css('a[class="btn btn-bo btn-sm click"]'));

      this.annoncesEditModal_titre = element(by.css('[formcontrolname=titre]'));
      this.annoncesEditModal_prix = element(by.css('[formcontrolname=prix]'));
      this.annoncesEditModal_description = element(by.css('[formcontrolname=description]'));
      this.annoncesEditModal_categorie = element(by.css('[formcontrolname=categorie]'));
      this.annoncesEditModal_message_moderation = element(by.css('[formcontrolname=message_moderation]'));
      this.annoncesEditModal_motif_refus = element(by.css('[formcontrolname=deal_type]'));
      this.annoncesEditModal_validate = element(by.css('[formcontrolname=btn btn-success btn-sm]'));
      this.annoncesEditModal_reject = element(by.css('[formcontrolname=btn btn-danger btn-sm]'));


      this.inputSearchFilter = element(by.css(`[formcontrolname="keyword"]`));
      this.inputCategorieFilter = element(by.css(`[name=categorie]`));
      this.inputCountryFilter = element(by.css(`[formcontrolname="pays"]`));
      this.searchSubmit = element(by.css('button[class="btn btn-primary"]'))

      this.tableLoaded = this.hasText(this.annoncesList, 'Type Occasion');
      this.searchSuccess = this.hasText(this.annoncesList, 'Electronique');

      this.url = 'annonces/';
      this.pageLoaded = this.hasText(this.pageTitle, 'Annonce');
      this.ValidatedTab = element(by.css(`[formcontrolname="keyword"]`));
    }

    getPagesNumbers() {
      return this.pageCount.getText();
    }

    gotoLastPage() {
      this.pageNbInput.sendKeys("12");
      this.pageSubmit.click();
    }

    gotoNextPage() {
      this.pageNext.click();
    }

    loadedAnnonces() {
      return browser.wait(() => {
          return this.tableLoaded();
      }, this.timeout.xxl, 'timeout: waiting for table to load.');
    }

    setupInputFilterForSearch() {
        this.selectDropdownbyNum(this.inputCountryFilter, 18); // Select Senegal
        this.selectDropdownbyNum(this.inputCategorieFilter, 5); // Select Electronic
    }

    performSearch() {
      return this.searchSubmit.click();
    }
}

export default new AnnoncePage();
