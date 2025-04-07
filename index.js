import express from 'express';
import GoodreadsShelf from 'goodreads-bookshelf-api';
import Parser from 'rss-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// RSS feed URL for Goodreads user updates (replace with actual RSS feed URL)
const userStatusRSS = 'https://www.goodreads.com/user/updates_rss/85977318?key=6oekI4LM4irGWk-h0td061HXzYEnTelG4NJtuPBJfhV91lfc';  // Replace USER_ID with actual ID

const parser = new Parser();

app.get('/books', async (req, res) => {
  const shelf = new GoodreadsShelf({
    username: '85977318-elias-johansson',
    shelf: 'currently-reading',
  });

  try {
    const books = await shelf.fetch();
    
    // Fetch the RSS feed to get the user updates and progress
    const feed = await parser.parseURL(userStatusRSS);
    const progressUpdates = feed.items.map(item => {
      const match = item.title.match(/is (\d+)% done with (.+)/); // Extract progress and book title
      if (match) {
        return {
          title: match[2], // Book title
          progress: match[1], // Reading progress (percentage)
          link: item.link,  // Link to the Goodreads user profile or book
          coverImage: item.description.match(/src="([^"]+)"/)[1], // Cover image URL
        };
      }
      return null;
    }).filter(item => item !== null);

    // Map the books to include the necessary data, along with progress
    const bookDetails = books.map((book) => {
      const progress = progressUpdates.find(update => update.title === book.title);
      return {
        title: book.title,
        author: book.author,
        progress: progress ? progress.progress : null, // Use the progress from the RSS feed
        coverImage: book.imageLink,  // Use the cover image from the bookshelf API
        goodreadsUrl: book.bookLink, // Goodreads URL
      };
    });

    res.json(bookDetails);  // Return the enhanced book details with progress
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`📚 Server running at http://localhost:${PORT}`);
});