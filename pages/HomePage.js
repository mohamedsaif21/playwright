// ============================================================
//  PAGE OBJECT — HomePage.js
//  URL: https://dev-sphere-phi.vercel.app/
// ============================================================

class HomePage {
  constructor(page) {
    this.page = page;

    // Locators
    this.signInBtn     = page.locator('a[href*="sign-in"], button:has-text("Sign In"), a:has-text("Sign In")').first();
    this.signUpBtn     = page.locator('a[href*="sign-up"], button:has-text("Sign Up"), a:has-text("Sign Up")').first();
    this.compilerBtn   = page.locator('a[href*="compiler"], button:has-text("Compiler"), a:has-text("Start Coding"), a:has-text("Try Now"), a:has-text("Get Started")').first();
    this.heading       = page.locator('h1').first();
  }

  async open() {
  await this.page.goto('https://dev-sphere-phi.vercel.app/');
  await this.page.waitForLoadState('networkidle');

  console.log('✅ Step 1 — HomePage opened');
}

  async validateTitle() {
    await this.page.waitForLoadState('domcontentloaded');
    const title = await this.page.title();
    console.log(`✅ HomePage title: "${title}"`);
    return title;
  }

  async goToSignIn() {
    await this.signInBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.signInBtn.click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to Sign In page');
  }

  async goToCompiler() {
    await this.compilerBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.compilerBtn.click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Navigated to Compiler page');
  }

  async screenshot(filePath) {
    await this.page.screenshot({ path: filePath, fullPage: true });
  }
}

module.exports = { HomePage };