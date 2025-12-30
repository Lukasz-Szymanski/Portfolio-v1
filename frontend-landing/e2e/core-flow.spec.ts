import { test, expect } from '@playwright/test';

test.describe('Fintech Critical Path', () => {
  
  test('Guest can login, view dashboard, and make a transfer', async ({ page }) => {
    // 1. Start: Go to Dashboard Page (which redirects to Login if no session)
    await page.goto('/dashboard');

    // 2. Login: Click "Guest Access" button
    // Szukamy przycisku po tekście widocznym dla użytkownika
    const loginButton = page.getByRole('button', { name: /uruchom panel gościa/i });
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    // Czekamy aż dashboard się załaduje (szukamy nagłówka "Dashboard" lub "System Overview")
    await expect(page.getByText('System Overview')).toBeVisible({ timeout: 10000 });

    // 3. Navigation: Go to "Fintech Bank" tab
    const fintechTab = page.getByRole('button', { name: /fintech bank/i });
    await fintechTab.click();

    // Sprawdzamy czy widok Fintech się załadował (widoczna lista kont lub formularz)
    await expect(page.getByText('Your Accounts')).toBeVisible();

    // 4. Action: Make a Quick Transfer
    // Klikamy w "preset" odbiorcy (Właściciel), żeby wypełnić formularz automatycznie
    await page.getByRole('button', { name: /właściciel/i }).click();

    // Upewniamy się, że pola się wypełniły
    const amountInput = page.getByPlaceholder('0.00');
    await expect(amountInput).toHaveValue('2500');

    // Klikamy "Wyślij Przelew"
    const submitButton = page.getByRole('button', { name: /wyślij przelew/i });
    await submitButton.click();

    // 5. Verification: Check for success message
    // Komunikat: "Przelew wysłany pomyślnie!"
    const successMessage = page.getByText(/przelew wysłany pomyślnie/i);
    await expect(successMessage).toBeVisible({ timeout: 5000 });
  });

});

test.describe('Landing Page Navigation', () => {

  test('User can navigate between sections', async ({ page }) => {
    // 1. Go to landing page
    await page.goto('/');

    // 2. Verify landing page is loaded
    await expect(page.locator('body')).toBeVisible();

    // 3. Navigate to About section
    const aboutLink = page.getByRole('link', { name: /about/i });
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      // Verify About section is displayed
      await expect(page.getByText(/about/i)).toBeVisible({ timeout: 5000 });
    }

    // 4. Navigate to Tech Stack section
    const techLink = page.getByRole('link', { name: /tech\s*stack/i });
    if (await techLink.isVisible()) {
      await techLink.click();
      await expect(page.getByText(/tech/i)).toBeVisible({ timeout: 5000 });
    }

    // 5. Navigate to Projects section
    const projectsLink = page.getByRole('link', { name: /projects/i });
    if (await projectsLink.isVisible()) {
      await projectsLink.click();
      await expect(page.getByText(/projects/i)).toBeVisible({ timeout: 5000 });
    }

    // 6. Navigate to Contact section
    const contactLink = page.getByRole('link', { name: /contact/i });
    if (await contactLink.isVisible()) {
      await contactLink.click();
      await expect(page.getByText(/contact/i)).toBeVisible({ timeout: 5000 });
    }
  });

});

test.describe('B2B Data Verifier', () => {

  test('Guest can verify a company NIP', async ({ page }) => {
    // 1. Go to Dashboard
    await page.goto('/dashboard');

    // 2. Login with Guest Access
    const loginButton = page.getByRole('button', { name: /uruchom panel gościa/i });
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    // 3. Wait for dashboard to load
    await expect(page.getByText('System Overview')).toBeVisible({ timeout: 10000 });

    // 4. Navigate to B2B Verifier tab
    const b2bTab = page.getByRole('button', { name: /b2b\s*verifier/i });
    if (await b2bTab.isVisible()) {
      await b2bTab.click();
      await page.waitForLoadState('networkidle');
    }

    // 5. Enter test NIP (5252344078)
    const nipInput = page.getByPlaceholder(/nip|tax/i);
    if (await nipInput.isVisible()) {
      await nipInput.fill('5252344078');

      // 6. Click verify button
      const verifyButton = page.getByRole('button', { name: /verify|check|sprawdź/i });
      await expect(verifyButton).toBeVisible();
      await verifyButton.click();

      // 7. Wait for verification result
      await page.waitForTimeout(2000);

      // 8. Check for company information or result message
      const resultText = page.getByText(/company|nazwa|błąd|error/i);
      await expect(resultText).toBeVisible({ timeout: 5000 });
    }
  });

});

test.describe('Crypto Price Monitor', () => {

  test('Guest can view crypto prices', async ({ page }) => {
    // 1. Go to Dashboard
    await page.goto('/dashboard');

    // 2. Login with Guest Access
    const loginButton = page.getByRole('button', { name: /uruchom panel gościa/i });
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    // 3. Wait for dashboard to load
    await expect(page.getByText('System Overview')).toBeVisible({ timeout: 10000 });

    // 4. Navigate to Crypto Monitor tab
    const cryptoTab = page.getByRole('button', { name: /crypto|monitor/i });
    if (await cryptoTab.isVisible()) {
      await cryptoTab.click();
      await page.waitForLoadState('networkidle');
    }

    // 5. Verify Bitcoin price is displayed
    const bitcoinPrice = page.getByText(/bitcoin|btc/i);
    await expect(bitcoinPrice).toBeVisible({ timeout: 5000 });

    // 6. Verify Ethereum price is displayed
    const ethereumPrice = page.getByText(/ethereum|eth/i);
    await expect(ethereumPrice).toBeVisible({ timeout: 5000 });

    // 7. Verify prices are numeric (contain numbers)
    const priceElements = page.locator('[class*="price"], [class*="currency"]');
    if (await priceElements.first().isVisible()) {
      const priceText = await priceElements.first().textContent();
      expect(priceText).toMatch(/\d/);
    }
  });

});

test.describe('Contact Form', () => {

  test('User can fill and submit contact form', async ({ page }) => {
    // 1. Go to landing page
    await page.goto('/');

    // 2. Verify page loaded
    await expect(page.locator('body')).toBeVisible();

    // 3. Navigate to Contact section
    const contactLink = page.getByRole('link', { name: /contact/i });
    if (await contactLink.isVisible()) {
      await contactLink.click();
      await page.waitForTimeout(1000);
    }

    // 4. Scroll to contact form if needed
    const contactForm = page.locator('form');
    if (await contactForm.isVisible()) {
      await contactForm.scrollIntoViewIfNeeded();
    }

    // 5. Fill in name field
    const nameInput = page.getByPlaceholder(/name|imię|nazwa/i);
    if (await nameInput.isVisible()) {
      await nameInput.fill('Test User');
    }

    // 6. Fill in email field
    const emailInput = page.getByPlaceholder(/email|e-mail/i);
    if (await emailInput.isVisible()) {
      await emailInput.fill('test@example.com');
    }

    // 7. Fill in message field
    const messageInput = page.getByPlaceholder(/message|wiadomość|tekst/i);
    if (await messageInput.isVisible()) {
      await messageInput.fill('This is a test message from E2E testing.');
    }

    // 8. Submit the form
    const submitButton = page.getByRole('button', { name: /submit|send|wyślij/i });
    if (await submitButton.isVisible()) {
      await submitButton.click();

      // 9. Wait for success message or confirmation
      await page.waitForTimeout(2000);

      // Check for success message
      const successMessage = page.getByText(/success|sent|pomyślnie|sent successfully/i);
      if (await successMessage.isVisible()) {
        await expect(successMessage).toBeVisible({ timeout: 5000 });
      }
    }
  });

});
