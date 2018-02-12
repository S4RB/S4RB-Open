import { S4RBOpenPage } from './app.po';

describe('s4-rb-open App', () => {
  let page: S4RBOpenPage;

  beforeEach(() => {
    page = new S4RBOpenPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
