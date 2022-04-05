import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/login-form');
  }

  getParagraphText() {
    return element(by.css('app-root .dx-drawer-content .dx-card p:nth-child(2)')).getText();
  }
}
