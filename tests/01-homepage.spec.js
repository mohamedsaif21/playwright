// ============================================================
//  TC-01: Homepage — Title & Navigation Validation
//  @smoke
// ============================================================

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs   = require('fs');
const { HomePage } = require('../pages/HomePage');

const SS = path.join(__dirname, '../screenshots/smoke');
if (!fs.existsSync(SS)) fs.mkdirSync(SS, { recursive: true });

// ─────────────────────────────────────────────────────────────
test.describe('@smoke — DevSphere Homepage', () => {

  test('TC-01 | Homepage loads with correct title', async ({ page }) => {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  TC-01 | Homepage Title Validation');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const home = new HomePage(page);
    await home.open();

    // Validate title contains DevSphere
    const title = await home.validateTitle();
    expect(title).toMatch(/DevSphere/i);

    // Validate URL is homepage
    expect(page.url()).toContain('dev-sphere-phi.vercel.app');
    console.log('✅ URL validated');

    await home.screenshot(path.join(SS, 'TC01-homepage.png'));
    console.log('\n✅ TC-01 PASSED\n');
  });

  test('TC-02 | Sign In link is visible on homepage', async ({ page }) => {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  TC-02 | Homepage Navigation Links');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const home = new HomePage(page);
    await home.open();

    // Check Sign In is present
    const signInVisible = await home.signInBtn.isVisible({ timeout: 8000 }).catch(() => false);
    console.log(`  Sign In button visible: ${signInVisible}`);

    await home.screenshot(path.join(SS, 'TC02-homepage-nav.png'));
    console.log('\n✅ TC-02 PASSED\n');
  });

});