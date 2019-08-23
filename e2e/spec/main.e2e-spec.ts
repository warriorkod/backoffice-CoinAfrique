import {browser} from 'protractor';

import loginPage from '../pages/loginPage.js';
import dashboardPage from '../pages/dashboardPage.js';
import announcesPage from '../pages/annoncesPage.js';

const admin = require('../config/admin.conf.json');

describe('$> MAIN FLOW', async () => {
  await browser.waitForAngularEnabled(false);

  it('Init Test', () => {
    loginPage.goto();
    expect(loginPage.loaded()).toBe(true);
  });

  it('Login Admin - valid form complete', () => {
    expect(loginPage.loginAs(admin.credentials)).toBe(null); // .click return null
  });

  it('Login Admin - logging', () => {
    expect(dashboardPage.loaded()).toBe(true);
  });

  it('Go to Page - Annonces', () => {
    announcesPage.goto();
    expect(announcesPage.loaded()).toBe(true);
  });

  describe('$> ANNONCES NAVIGATION', () => {
    beforeEach(function() {
      announcesPage.loaded();
      announcesPage.loadedAnnonces();
    });

    it('Loading', () => {
      expect(announcesPage.loadedAnnonces()).toBe(true);
    });

    it('Going on last page', () => {
      announcesPage.gotoNextPage();
      expect(announcesPage.loadedAnnonces()).toBe(true);
    });
  });
});
