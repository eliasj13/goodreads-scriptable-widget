let widget = await createWidget();
if (config.runsInWidget) {
  widget.url = "goodreads://";
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}
Script.complete();

async function createWidget() {
  const books = await fetchBooks();
  const w = new ListWidget();
  w.setPadding(8, 8, 8, 8);
  w.backgroundColor = Color.dynamic(new Color("#EDE8DF"), new Color("#1C1C1E"));

  const stack = w.addStack();
  stack.layoutHorizontally();
  stack.centerAlignContent();
  stack.spacing = 12;

  // Change this number to control how many books to show at maximum
  const maxBooks = Math.min(3, books.length);

  for (let i = 0; i < maxBooks; i++) {
    const book = books[i];
    const bookStack = stack.addStack();
    bookStack.layoutVertically();
    bookStack.backgroundColor = Color.dynamic(
      new Color("#D4CCC0"),
      new Color("#2C2C2E"),
    );
    bookStack.cornerRadius = 12;
    bookStack.setPadding(6, 6, 6, 6);
    bookStack.centerAlignContent();
    bookStack.size = new Size(92, 144);

    const imgReq = new Request(book.coverImage);
    const img = await imgReq.loadImage();
    const imgStack = bookStack.addStack();
    imgStack.centerAlignContent();
    const imgWidget = imgStack.addImage(img);
    imgWidget.imageSize = new Size(80, 120);
    imgWidget.cornerRadius = 8;
    imgWidget.centerAlignImage();

    // Spacer above progress bar
    bookStack.addSpacer(5);

    const progressBar = bookStack.addStack();
    progressBar.size = new Size(80, 6);
    progressBar.backgroundColor = Color.dynamic(
      new Color("#e0e0e0"),
      new Color("#555555"),
    );
    progressBar.cornerRadius = 5;

    const progressFillWidth = Math.floor((book.progress / 100) * 80);
    const fill = progressBar.addStack();
    fill.size = new Size(progressFillWidth, 6);
    fill.backgroundColor = Color.dynamic(
      new Color("#4CAF50"),
      new Color("#7FDB93"),
    );
    fill.cornerRadius = 5;

    // This spacer ensures the progress fill doesn't center
    progressBar.addSpacer();
  }

  return w;
}

async function fetchBooks() {
  const url = "https://YOUR-DOMAIN.vercel.app/currently-reading"; // Edit endpoint to "/testTwoItems" or "/testThreeItems" for visual testing
  try {
    const req = new Request(url);
    const books = await req.loadJSON();
    return books;
  } catch (e) {
    console.error(e);
    return [];
  }
}

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}
