from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:5173/damn-beavers/")

    # Wait for the Village Actions section to be visible
    page.wait_for_selector("text=Village Actions")

    # Check if Gather Berries button is present and click it
    gather_btn = page.locator("button:has-text('Gather Berries')")
    if gather_btn.is_visible():
        print("Gather Berries button is visible")
        gather_btn.click()
        # Wait a bit for potential UI update
        page.wait_for_timeout(500)
    else:
        print("Gather Berries button NOT visible")

    # Take screenshot of the Village Actions area
    # We can try to locate the section by text or class, but full page is fine too
    page.screenshot(path="verification/village_actions.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
