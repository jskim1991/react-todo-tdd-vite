import { test, expect } from '@playwright/test'
import { randomUUID } from 'node:crypto'

test('has title', async ({ page }) => {
    await page.goto('/')

    expect(await page.title()).toBe('Todo App')
})

test('should display input for new task and save button', async ({ page }) => {
    await page.goto('/')

    const input = page.getByPlaceholder('Enter a new task')
    await expect(input).toBeVisible()

    const saveButton = page.getByRole('button', { name: 'Save' })
    await expect(saveButton).toBeVisible()
    await expect(saveButton).toBeDisabled()
})

test('should display created todo at the bottom of the list', async ({
    page,
}) => {
    await page.goto('/')

    const input = page.getByPlaceholder('Enter a new task')
    const newTask = `Learn ${randomUUID()}`
    await input.fill(newTask)

    const saveButton = page.getByRole('button', { name: 'Save' })
    await saveButton.click()

    await expect(page.getByText(newTask)).toBeVisible()
})
