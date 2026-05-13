class AuthPage {

  constructor(page) {

    this.page = page;

    // EMAIL INPUT
    this.emailInput = page.locator(
      'input[type="email"], input[name="email"]'
    ).first();

    // PASSWORD INPUT
    this.passwordInput = page.locator(
      'input[type="password"]'
    ).first();

    // LOGIN BUTTON
    this.loginButton = page.locator(
      'button:has-text("Login"), button:has-text("Sign In"), button[type="submit"]'
    ).first();

    // REGISTER BUTTON
    this.registerButton = page.locator(
      'button:has-text("Register"), button:has-text("Sign Up")'
    ).first();
  }

  // ─────────────────────────────────────────────
  // OPEN LOGIN PAGE
  // ─────────────────────────────────────────────
  async openSignIn() {

    await this.page.goto(
      'https://dev-sphere-phi.vercel.app/login',
      {
        waitUntil: 'domcontentloaded',
        timeout: 60000
      }
    );

    await this.page.waitForTimeout(3000);

    console.log('✅ Login page opened');
  }

  // ─────────────────────────────────────────────
  // OPEN REGISTER PAGE
  // ─────────────────────────────────────────────
  async openSignUp() {

    await this.page.goto(
      'https://dev-sphere-phi.vercel.app/register',
      {
        waitUntil: 'domcontentloaded',
        timeout: 60000
      }
    );

    await this.page.waitForTimeout(3000);

    console.log('✅ Register page opened');
  }

  // ─────────────────────────────────────────────
  // LOGIN FUNCTION
  // ─────────────────────────────────────────────
  async login(email, password) {

    console.log('📌 Filling login form');

    await this.emailInput.waitFor({
      state: 'visible',
      timeout: 15000
    });

    await this.emailInput.fill(email);

    await this.passwordInput.fill(password);

    console.log('✅ Email & Password entered');

    await this.loginButton.waitFor({
      state: 'visible',
      timeout: 15000
    });

    await this.loginButton.click();

    console.log('✅ Login button clicked');

    await this.page.waitForTimeout(5000);
  }

  // Alias
  async signIn(email, password) {
    await this.login(email, password);
  }

  // ─────────────────────────────────────────────
  // SCREENSHOT
  // ─────────────────────────────────────────────
  async screenshot(path) {

    if (this.page.isClosed()) {
      console.log('⚠️ Page already closed');
      return;
    }

    await this.page.screenshot({
      path,
      fullPage: true
    });
  }
}

module.exports = AuthPage;
module.exports.AuthPage = AuthPage;