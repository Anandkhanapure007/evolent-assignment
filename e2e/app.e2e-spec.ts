import { InsuranceProjectPage } from './app.po';

describe('insurance-project App', () => {
  let page: InsuranceProjectPage;

  beforeEach(() => {
    page = new InsuranceProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
