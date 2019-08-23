export default class  basePage {
    constructor() {

        this.timeout = {
            'xs': 420,
            's' : 1000,
            'm' : 2000,
            'l' : 5000,
            'xl': 9000,
            'xxl': 15000
        };

        protractor.ElementFinder.prototype.getWidth = function() {
            return this.getSize().then(size => {
                return size.width;
            });
        };


    }

    loaded() {
        return browser.wait(() => {
            return this.pageLoaded();
        }, this.timeout.xxl, 'timeout: waiting for page to load. The url is: ' + this.url);
    }

    goto() {
        browser.get(this.url, this.timeout.xxl);
        return this.loaded();
    }

    isVisible(locator) {
        return protractor.ExpectedConditions.visibilityOf(locator);
    }

    isNotVisible(locator) {
        return protractor.ExpectedConditions.invisibilityOf(locator);
    }

    inDom(locator) {
        return protractor.ExpectedConditions.presenceOf(locator);
    }

    notInDom(locator) {
        return protractor.ExpectedConditions.stalenessOf(locator);
    }

    isClickable(locator) {
        return protractor.ExpectedConditions.elementToBeClickable(locator);
    }

    hasText(locator, text) {
        return protractor.ExpectedConditions.textToBePresentInElement(locator, text);
    }

    getElementText(locator) {
      var elementText;
      locator.getText().then(function(text) {
        elementText = text;
      });
      return elementText;
    }

    selectDropdownbyNum(element, optionNum) {
      if (optionNum) {
        var options = element.all(by.tagName('option')).then(function(options) {
          options[optionNum].click();
        });
      }
    }

    and(arrayOfFunctions) {
        return protractor.ExpectedConditions.and(arrayOfFunctions);
    }

    titleIs(title) {
        return protractor.ExpectedConditions.titleIs(title);
    }

    hasClass(locator, klass) {
        return locator.getAttribute('class').then(classes => {
            return classes.split(' ').indexOf(klass) !== -1;
        });
    }

    hitEnter() {
        return browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }

    switchToWindow(windowHandleIndex, targetPage) {
        let handle = browser.wait(() => {
            return browser.getAllWindowHandles().then(handles => {
                if(handles.length > windowHandleIndex) {
                    return handles[windowHandleIndex];
                } else {
                    throw new Error('window index ' + windowHandleIndex + ' does not exist');
                }
            });
        }, this.timeout.xxl);
        console.log('switching to window ' + windowHandleIndex);
        browser.switchTo().window(handle);
        return targetPage.loaded();
    }

    closeCurrentWindowAndLoadParent(parentPage) {
        return browser.controlFlow().execute(() => {
            return browser.getAllWindowHandles().then(handles => {
                if(handles.length > 1) {
                    browser.close();
                    return this.switchToWindow(handles.length - 2, parentPage);
                } else {
                    this.log('Cannot close parent window ' + handles.length -2);
                }
            });
        });
    }

}
