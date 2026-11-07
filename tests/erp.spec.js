import { test, expect } from '@playwright/test';

const MODULES = ['Dashboard','Admissions','Students','Lecturers','Streams & Classes','Subjects','Academic Management','Study Materials','Timetable','Attendance','Examinations','Internal Assessment','Results','Fees','Library','Transport','Hostel','HR & Staff','Reports','Notifications','Grievances','Parents Portal','Users & Roles','Role Portals','Settings'];
const nav = (page, name) => page.getByRole('button', { name, exact: true }).first().click();
const rowsText = (page) => page.locator('tbody tr').allInnerTexts();
const uniq = (p) => `${p} ${Date.now().toString().slice(-6)}`;

test.beforeEach(async ({ page }) => {
  page.errors = [];
  page.on('pageerror', e => page.errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error' && !/ERR_NAME_NOT_RESOLVED|ERR_INTERNET_DISCONNECTED/.test(m.text())) page.errors.push(m.text()); });
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});
test.afterEach(async ({ page }) => { expect(page.errors, 'browser console/page errors').toEqual([]); });

async function addStudent(page, name, { year = 'First PUC', stream = 'Science', combination, phone = '9876501234' } = {}) {
  await nav(page, 'Students');
  await page.getByRole('button', { name: /Add New/ }).click();
  await page.getByLabel('Student Name').fill(name);
  await page.getByLabel('PUC Year').selectOption(year);
  await page.getByLabel('Stream', { exact: true }).selectOption(stream);
  if (combination) await page.getByLabel('Combination').selectOption(combination);
  await page.getByLabel('Section').selectOption('B');
  await page.getByLabel('Phone').fill(phone);
  await page.getByLabel('Parent / Guardian').fill('Test Guardian');
  await page.getByRole('button', { name: /Save Record/ }).click();
}

test('loads with Saptham branding, logo and demo banner', async ({ page }) => {
  await expect(page).toHaveTitle(/Saptham PU College/);
  await expect(page.locator('.brand')).toContainText('SAPTHAM');
  await expect(page.locator('.brand img')).toBeVisible();
  expect(await page.locator('.brand img').evaluate(i => i.naturalWidth)).toBeGreaterThan(0);
});

test('all 25 navigation entries open a page with a heading', async ({ page }) => {
  for (const m of MODULES) {
    await nav(page, m);
    await expect(page.locator('h1').first()).toBeVisible();
  }
});

test('no engineering/university terminology anywhere', async ({ page }) => {
  for (const m of MODULES) {
    await nav(page, m);
    const t = (await page.locator('body').innerText()).toLowerCase();
    for (const bad of ['semester', 'cgpa', 'b.e.', 'b.tech', 'engineering', 'placement']) expect(t, `${m} contains ${bad}`).not.toContain(bad);
  }
});

test('dashboard numbers come from the data', async ({ page }) => {
  await expect(page.locator('.stat-card', { hasText: 'Total Students' }).locator('.stat-value')).toHaveText('8');
  await addStudent(page, uniq('Dash Student'), { year: 'Second PUC', stream: 'Arts', combination: 'HEPP' });
  await expect(page.getByText('New record added successfully')).toBeVisible();
  await nav(page, 'Dashboard');
  await expect(page.locator('.stat-card', { hasText: 'Total Students' }).locator('.stat-value')).toHaveText('9');
  await expect(page.locator('.stat-card', { hasText: 'Second PUC Strength' }).locator('.stat-value')).toHaveText('5');
  await expect(page.locator('.activity-panel')).toContainText('Added Students record');
});

test('student add, edit, cancel-delete and delete', async ({ page }) => {
  const name = uniq('E2E Student');
  await addStudent(page, name, { stream: 'Commerce', combination: 'SEBA' });
  await page.getByPlaceholder('Search this page...').fill(name);
  const row = page.locator('tbody tr', { hasText: name });
  await expect(row).toBeVisible();
  await expect(row).toContainText('SEBA');
  await row.getByRole('button', { name: 'Edit record' }).click();
  await page.getByLabel('Student Name').fill(name + ' Updated');
  await page.getByRole('button', { name: /Save Record/ }).click();
  await expect(page.getByText('Record updated successfully')).toBeVisible();
  const upd = page.locator('tbody tr', { hasText: name + ' Updated' });
  await upd.getByRole('button', { name: 'Delete record' }).click();
  await expect(page.getByRole('dialog', { name: 'Confirm delete' })).toBeVisible();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(upd).toBeVisible();
  await upd.getByRole('button', { name: 'Delete record' }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await expect(page.getByText('Record deleted')).toBeVisible();
  await expect(upd).toHaveCount(0);
});

test('form validation: required fields, phone format, PU combination rules', async ({ page }) => {
  await nav(page, 'Students');
  await page.getByRole('button', { name: /Add New/ }).click();
  await page.getByRole('button', { name: /Save Record/ }).click();
  await expect(page.locator('.record-modal')).toBeVisible();          // empty form blocked
  await page.getByLabel('Student Name').fill('Bad Phone');
  await page.getByLabel('Phone').fill('12345');
  await page.getByLabel('Parent / Guardian').fill('G');
  await page.getByRole('button', { name: /Save Record/ }).click();
  await expect(page.locator('.record-modal')).toBeVisible();          // bad phone blocked
  await page.getByLabel('Stream', { exact: true }).selectOption('Science');
  expect(await page.getByLabel('Combination').locator('option').allInnerTexts()).toEqual(['PCMB', 'PCMC', 'PCME', 'PCMS']);
  await page.getByLabel('Stream', { exact: true }).selectOption('Commerce');
  expect(await page.getByLabel('Combination').locator('option').allInnerTexts()).toEqual(['CEBA', 'SEBA', 'HEBA', 'HEPS']);
  await page.getByLabel('Stream', { exact: true }).selectOption('Arts');
  expect(await page.getByLabel('Combination').locator('option').allInnerTexts()).toEqual(['HEPP', 'HEPS', 'HEBA']);
  expect(await page.getByLabel('PUC Year').locator('option').allInnerTexts()).toEqual(['First PUC', 'Second PUC']);
});

test('search, filters, sort and pagination', async ({ page }) => {
  await nav(page, 'Students');
  await expect(page.getByText('Page 1 of 2')).toBeVisible();
  expect(await page.locator('tbody tr').count()).toBe(6);
  await page.getByRole('button', { name: 'Next page' }).click();
  await expect(page.getByText('Page 2 of 2')).toBeVisible();
  expect(await page.locator('tbody tr').count()).toBe(2);
  await page.getByRole('button', { name: 'Previous page' }).click();
  await page.getByPlaceholder('Search this page...').fill('zzz-no-match');
  await expect(page.getByText('No records found')).toBeVisible();
  await page.getByPlaceholder('Search this page...').fill('');
  await page.locator('select').filter({ hasText: 'First PUC' }).first().selectOption('Second PUC');
  for (const t of await rowsText(page)) expect(t).toContain('Second PUC');
  await page.locator('select').filter({ hasText: 'Arts' }).first().selectOption('Arts');
  for (const t of await rowsText(page)) expect(t).toContain('Arts');
  await page.locator('select').filter({ hasText: 'First PUC' }).first().selectOption('All');
  await page.locator('select').filter({ hasText: 'Arts' }).first().selectOption('All');
  await page.locator('th.sortable', { hasText: 'Student Name' }).click();
  const names = (await page.locator('tbody tr td:nth-child(2)').allInnerTexts());
  expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  await page.locator('th.sortable', { hasText: 'Student Name' }).click();
  const desc = (await page.locator('tbody tr td:nth-child(2)').allInnerTexts());
  expect(desc).toEqual([...desc].sort((a, b) => b.localeCompare(a)));
});

test('new student is linked to fees, attendance and parents portal; delete cascades', async ({ page }) => {
  const name = uniq('Linked Student');
  await addStudent(page, name);
  for (const m of ['Fees', 'Attendance', 'Parents Portal']) {
    await nav(page, m);
    await page.getByPlaceholder('Search this page...').fill(name);
    await expect(page.locator('tbody tr', { hasText: name })).toHaveCount(1);
  }
  await nav(page, 'Fees');
  await expect(page.locator('tbody tr', { hasText: name })).toContainText('Pending');
  await nav(page, 'Students');
  await page.getByPlaceholder('Search this page...').fill(name);
  await page.getByRole('button', { name: 'Delete record' }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  for (const m of ['Fees', 'Attendance', 'Parents Portal']) {
    await nav(page, m);
    await page.getByPlaceholder('Search this page...').fill(name);
    await expect(page.locator('tbody tr', { hasText: name })).toHaveCount(0);
  }
});

test('fees: due and status are calculated; paid cannot exceed total', async ({ page }) => {
  await nav(page, 'Fees');
  await page.getByRole('button', { name: /Add New/ }).click();
  await page.getByLabel('Student Name').selectOption('Aarav Shetty');
  await page.getByLabel('Fee Category').fill('Exam fee');
  await page.getByLabel('Total Fee').fill('1000');
  await page.getByLabel('Paid Amount').fill('1500');
  await page.getByRole('button', { name: /Save Record/ }).click();
  await expect(page.getByText('Paid amount cannot exceed total fee')).toBeVisible();
  await page.getByLabel('Paid Amount').fill('400');
  await page.getByRole('button', { name: /Save Record/ }).click();
  const row = page.locator('tbody tr', { hasText: 'Exam fee' });
  await expect(row).toContainText('₹600');
  await expect(row).toContainText('Partial');
});

test('other modules support add (lecturer, library, notification, grievance, internal marks)', async ({ page }) => {
  await nav(page, 'Lecturers');
  await page.getByRole('button', { name: /Add New/ }).click();
  await page.getByLabel('Lecturer Name').fill('Dr. Test Lecturer');
  await page.getByLabel('Subject').fill('Biology');
  await page.getByLabel('Qualification').fill('M.Sc, B.Ed');
  await page.getByLabel('Phone').fill('9876500999');
  await page.getByLabel('Assigned Classes').fill('II PUC Science');
  await page.getByRole('button', { name: /Save Record/ }).click();
  await expect(page.locator('tbody tr', { hasText: 'Dr. Test Lecturer' })).toBeVisible();
  await nav(page, 'Internal Assessment');
  await page.getByRole('button', { name: /Add New/ }).click();
  await page.getByLabel('Subject').fill('Physics');
  await page.getByLabel('Marks (out of 30)').fill('45');
  await page.getByRole('button', { name: /Save Record/ }).click();
  await expect(page.getByText('Internal marks cannot exceed 30')).toBeVisible();
  await page.getByLabel('Marks (out of 30)').fill('27');
  await page.getByRole('button', { name: /Save Record/ }).click();
  await expect(page.getByText('New record added successfully')).toBeVisible();
  await nav(page, 'Grievances');
  await page.getByRole('button', { name: /Add New/ }).click();
  await page.getByLabel('Title').fill('Lab equipment request');
  await page.getByLabel('Date').fill('2026-11-06');
  await page.getByRole('button', { name: /Save Record/ }).click();
  await expect(page.locator('tbody tr', { hasText: 'Lab equipment request' })).toContainText('Open');
});

test('CSV export downloads PU data', async ({ page }) => {
  await nav(page, 'Students');
  const dl = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export CSV' }).click();
  const d = await dl;
  expect(d.suggestedFilename()).toBe('saptham-students.csv');
  const text = await (await import('node:fs/promises')).readFile(await d.path(), 'utf8');
  expect(text).toContain('Aarav Shetty');
  expect(text).toContain('First PUC');
});

test('print button calls window.print', async ({ page }) => {
  await page.evaluate(() => { window.__printed = 0; window.print = () => { window.__printed++; }; });
  await nav(page, 'Students');
  await page.getByRole('button', { name: 'Print' }).click();
  expect(await page.evaluate(() => window.__printed)).toBe(1);
});

test('data persists after reload', async ({ page }) => {
  const name = uniq('Persist Student');
  await addStudent(page, name);
  await page.reload();
  await nav(page, 'Students');
  await page.getByPlaceholder('Search this page...').fill(name);
  await expect(page.locator('tbody tr', { hasText: name })).toBeVisible();
});

test('role switching limits navigation and permissions', async ({ page }) => {
  const sw = page.getByLabel('Switch role');
  expect(await sw.locator('option').count()).toBe(12);
  await sw.selectOption('Student');
  await expect(page.getByRole('button', { name: 'Students', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Users & Roles', exact: true })).toHaveCount(0);
  await nav(page, 'Fees');
  await expect(page.getByRole('button', { name: /Add New/ })).toHaveCount(0);
  await expect(page.getByLabel('Edit record')).toHaveCount(0);
  await expect(page.locator('tbody tr')).toHaveCount(1);              // own fee record only
  await sw.selectOption('Accountant');
  await expect(page.getByRole('button', { name: 'Fees', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Students', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /Add New/ })).toBeVisible();
  await sw.selectOption('Librarian');
  await expect(page.getByRole('button', { name: 'Library', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Fees', exact: true })).toHaveCount(0);
  await sw.selectOption('Admin');
  await expect(page.getByRole('button', { name: 'Users & Roles', exact: true })).toBeVisible();
});

test('settings page and reports page render', async ({ page }) => {
  await nav(page, 'Settings');
  await expect(page.getByLabel('Institution type')).toHaveValue('Pre-University College');
  await nav(page, 'Reports');
  await expect(page.locator('h1')).toContainText('Reports');
});

test('mobile: menu opens, no horizontal overflow, add works', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  const dims = await page.evaluate(() => ({ v: document.documentElement.clientWidth, p: document.documentElement.scrollWidth }));
  expect(dims.p).toBeLessThanOrEqual(dims.v + 1);
  await page.locator('.menu-toggle').click();
  await expect(page.locator('.sidebar')).toHaveClass(/mobile-visible/);
  await nav(page, 'Students');
  await expect(page.locator('.sidebar')).not.toHaveClass(/mobile-visible/);
  const d2 = await page.evaluate(() => ({ v: document.documentElement.clientWidth, p: document.documentElement.scrollWidth }));
  expect(d2.p).toBeLessThanOrEqual(d2.v + 1);
  await page.getByRole('button', { name: /Add New/ }).click();
  await expect(page.locator('.record-modal')).toBeVisible();
});
