import { FirstAngularAppPage } from './app.po';

describe('first-angular-app App', () => {
  let page: FirstAngularAppPage;

  beforeEach(() => {
    page = new FirstAngularAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
