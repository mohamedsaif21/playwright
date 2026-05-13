// ============================================================
//  PAGE OBJECT — CompilerPage.js
//  Handles CodeEditor, Run, Debug, Save, Terminal interactions
// ============================================================

class CompilerPage {
  constructor(page) {
    this.page = page;

    // Editor area — Monaco editor (used by most online compilers)
    this.editorArea      = page.locator('.monaco-editor, [class*="editor"], [class*="CodeEditor"], .cm-editor').first();
    this.editorContent   = page.locator('.monaco-editor textarea, .view-lines, [class*="editor"] textarea').first();

    // Header / toolbar buttons
    this.runBtn          = page.locator('button:has-text("Run"), button:has-text("Compile"), button[class*="run"], button[class*="Run"]').first();
    this.debugBtn        = page.locator('button:has-text("Debug"), button[class*="debug"]').first();
    this.saveBtn         = page.locator('button:has-text("Save"), button[class*="save"]').first();
    this.languageSelect  = page.locator('select, [class*="language"], [class*="Language"]').first();

    // Terminal / Output panel
    this.terminalPanel   = page.locator('[class*="terminal"], [class*="Terminal"], [class*="output"], [class*="Output"]').first();
    this.terminalOutput  = page.locator('[class*="terminal"] pre, [class*="output"] pre, [class*="terminal"] code').first();

    // Status bar
    this.statusBar       = page.locator('[class*="status"], [class*="Status"], [class*="StatusBar"]').first();

    // Save modal
    this.saveModal       = page.locator('[class*="modal"], [class*="Modal"], [role="dialog"]').first();
    this.saveModalInput  = page.locator('[class*="modal"] input, [role="dialog"] input').first();
    this.saveModalBtn    = page.locator('[class*="modal"] button:has-text("Save"), [role="dialog"] button:has-text("Save")').first();

    // Toast notifications
    this.toast           = page.locator('[class*="toast"], [class*="Toast"], [class*="notification"]').first();
  }

  async open() {
    await this.page.goto(
  'https://dev-sphere-phi.vercel.app/compiler',
  {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  }
);

await this.page.waitForTimeout(4000);

console.log('✅ Compiler page opened');
  }

  async validateCompilerLoaded() {
    // Check any one of: editor, run button, or terminal is visible
    try {
      await this.editorArea.waitFor({ state: 'visible', timeout: 15000 });
      console.log('✅ Code editor loaded');
      return true;
    } catch {
      console.log('⚠️  Editor not found with default selectors');
      return false;
    }
  }

  async typeCode(code) {
    // Click the editor first to focus it
    try {
      await this.editorArea.click();
      await this.page.waitForTimeout(500);

      // Select all existing code and replace
      await this.page.keyboard.press('Control+a');
      await this.page.waitForTimeout(300);
      await this.page.keyboard.type(code);
      console.log('✅ Code typed in editor');
    } catch {
      console.log('⚠️  Could not type directly — trying keyboard shortcut');
      await this.page.keyboard.press('Control+a');
      await this.page.keyboard.type(code);
    }
  }

  async clickRun() {

  const runButton = this.page.locator(
    'button:has-text("Run"), button:has-text("Compile")'
  ).first();

  await runButton.waitFor({
    state: 'visible',
    timeout: 15000
  });

  await runButton.click();

  console.log('✅ Run button clicked');

  await this.page.waitForTimeout(5000);
}
  async clickDebug() {
    try {
      await this.debugBtn.waitFor({ state: 'visible', timeout: 5000 });
      await this.debugBtn.click();
      await this.page.waitForTimeout(3000);
      console.log('✅ Debug button clicked');
    } catch {
      console.log('ℹ️  Debug button not found — skipping');
    }
  }

  async openSaveModal() {
    await this.saveBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.saveBtn.click();
    await this.page.waitForTimeout(2000);
    console.log('✅ Save modal opened');
  }

  async saveProject(projectName) {
    try {
      await this.saveModalInput.waitFor({ state: 'visible', timeout: 8000 });
      await this.saveModalInput.fill(projectName);
      await this.saveModalBtn.click();
      await this.page.waitForTimeout(3000);
      console.log(`✅ Project saved as "${projectName}"`);
    } catch {
      console.log('⚠️  Save modal input not found');
    }
  }

  async getTerminalOutput() {
    try {
      const text = await this.terminalOutput.textContent({ timeout: 10000 });
      console.log(`✅ Terminal output: "${text?.trim()}"`);
      return text;
    } catch {
      console.log('⚠️  Terminal output not readable');
      return '';
    }
  }

  async screenshot(filePath) {
    if (this.page.isClosed()) {
      console.log('⚠️ Page already closed');
      return;
    }

    await this.page.screenshot({
      path: filePath,
      fullPage: true
    });
    console.log(`✅ Screenshot → ${filePath}`);
  }
}

module.exports = CompilerPage;
module.exports.CompilerPage = CompilerPage;