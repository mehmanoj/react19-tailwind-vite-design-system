import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('accessibility checks', () => {
  test('homepage has no automatically detectable accessibility violations', async ({
    page,
  }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('modal state has no automatically detectable accessibility violations', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open modal' }).click();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
