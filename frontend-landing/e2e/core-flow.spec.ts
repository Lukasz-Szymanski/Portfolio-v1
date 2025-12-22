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
