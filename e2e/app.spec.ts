import { expect, test } from '@playwright/test';

test.describe('design system application', () => {
  test('loads the home page and supports core interactions', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: 'Extensive UI foundation for product teams' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Enable dark mode' }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    await page.getByRole('button', { name: 'Open modal' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Promote release candidate?' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Promote' }).click();
    await expect(page.getByRole('status')).toContainText('Release promoted');

    await page.getByRole('button', { name: 'Page 3' }).click();
    await expect(page.getByRole('button', { name: 'Page 3' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });
});
