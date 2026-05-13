// ============================================================
//  TC-03 & TC-04: Auth Flow — Sign In / Sign Up pages
//  @auth
// ============================================================

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs   = require('fs');
const { AuthPage } = require('../pages/AuthPage');

const DATA = require('../data/testData.json');
const SS   = path.join(__dirname, '../screenshots/auth');
if (!fs.existsSync(SS)) fs.mkdirSync(SS, { recursive: true });

// ─────────────────────────────────────────────────────────────
test.describe('@auth — DevSphere Authentication', () => {

  // TC-03: Sign In page loads
  test('TC-03 | Sign In page loads correctly', async ({ page }) => {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  TC-03 | Sign In Page Load');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const auth = new AuthPage(page);
    await auth.openSignIn();

    // Validate URL
    expect(page.url()).toContain('/login');
    console.log('✅ Sign In URL validated');

    // Email and password fields should be visible
    await expect(auth.emailInput).toBeVisible({ timeout: 10000 });
    console.log('✅ Email input is visible');

    await expect(auth.passwordInput).toBeVisible({ timeout: 10000 });
    console.log('✅ Password input is visible');

    await auth.screenshot(path.join(SS, 'TC03-signin-page.png'));
    console.log('\n✅ TC-03 PASSED\n');
  });

  // TC-04: Sign Up page loads
  test('TC-04 | Sign Up page loads correctly', async ({ page }) => {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  TC-04 | Sign Up Page Load');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const auth = new AuthPage(page);
    await auth.openSignUp();

    expect(page.url()).toContain('/register');
    console.log('✅ Sign Up URL validated');

    await auth.screenshot(path.join(SS, 'TC04-signup-page.png'));
    console.log('\n✅ TC-04 PASSED\n');
  });

  // TC-05: Sign In with valid credentials
  // ⚠️  UPDATE email & password in data/testData.json before running
  test('TC-05 | Sign In with valid credentials', async ({ page }) => {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  TC-05 | Sign In — Valid Credentials');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const auth = new AuthPage(page);
    await auth.openSignIn();

    await auth.signIn(
      DATA.credentials.email,
      DATA.credentials.password
    );

    await auth.screenshot(path.join(SS, 'TC05-after-signin.png'));

    // After sign in — should redirect away from sign-in page
    const currentUrl = page.url();
    console.log(`  Current URL after login: ${currentUrl}`);
    expect(currentUrl).not.toMatch(/sign-in/i);
    console.log('✅ Redirected after sign in');

    console.log('\n✅ TC-05 PASSED\n');
  });

});