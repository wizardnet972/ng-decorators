import { NgDecoratorsPage } from './app.po';

describe('ng-decorators App', () => {
  let page: NgDecoratorsPage;

  beforeEach(() => {
    page = new NgDecoratorsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
