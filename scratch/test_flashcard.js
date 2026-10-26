const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  await page.goto('http://localhost:8000/Course/A1/session-1.html');
  const card = await page.$('.flashcard');
  console.log('Card before click class:', await card.getAttribute('class'));
  await card.click();
  console.log('Card after click class:', await card.getAttribute('class'));
  const styles = await page.evaluate(() => {
    const front = document.querySelector('.flashcard .card-front');
    const back = document.querySelector('.flashcard .card-back');
    return {
      frontTransform: getComputedStyle(front).transform,
      backTransform: getComputedStyle(back).transform,
      frontZIndex: getComputedStyle(front).zIndex,
      backZIndex: getComputedStyle(back).zIndex,
      frontDisplay: getComputedStyle(front).display,
      backDisplay: getComputedStyle(back).display,
      frontOpacity: getComputedStyle(front).opacity,
      backOpacity: getComputedStyle(back).opacity,
      frontBackface: getComputedStyle(front).backfaceVisibility,
      backBackface: getComputedStyle(back).backfaceVisibility,
      frontWebkitBackface: getComputedStyle(front).webkitBackfaceVisibility,
      backWebkitBackface: getComputedStyle(back).webkitBackfaceVisibility
    };
  });
  console.log('Computed styles after click:', styles);
  await browser.close();
})();
