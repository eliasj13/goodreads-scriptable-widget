import express from 'express';
import axios from 'axios';
import { parseString } from 'xml2js';
import he from 'he';

const app = express();

// Default local port is 3000. Modify this number if you wanna change it.
const port = 3000;

// Replace this with your own Goodreads Updates URL. See README for information.
const feedUrl = 'https://www.goodreads.com/user/updates_rss/85977318?key=6oekI4LM4irGWk-h0td061HXzYEnTelG4NJtuPBJfhV91lfc';

// Function to fetch and parse the RSS feed
async function fetchRSS() {
  try {
    const response = await axios.get(feedUrl);
    const rssData = response.data;
    const parsedData = await new Promise((resolve, reject) => {
      parseString(rssData, { explicitArray: false }, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
    return parsedData.rss.channel.item || [];
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
}

// Function to extract the relevant progress items and book covers
async function processProgressItems() {
  const items = await fetchRSS();

  const progressItems = items.filter(item => {
    // Filter items that match the progress pattern in the title
    const cleanTitle = item.title.replace(/\s+/g, ' ').trim();
    return cleanTitle.includes('is') && cleanTitle.includes('done with');
  });

  // Extract progress, title, and image URL
  const books = progressItems.map(item => {
    try {
      // Clean up the title and match progress
      const cleanTitle = item.title.replace(/\s+/g, ' ').trim();
      const titleMatch = cleanTitle.match(/is (\d+)% done with (.+)/);

      // Decode the description to handle escaped HTML entities
      const rawDesc = item.description || item['content:encoded'] || '';
      const desc = he.decode(rawDesc); // Decode HTML entities

      // Extract the image URL from the decoded description
      const coverMatch = desc.match(/src="([^"]+)"/);

      // If we can't find both a progress match and a cover image, skip this entry
      if (!titleMatch || !coverMatch) {
        console.log('Skipping item (missing match):', { title: cleanTitle, description: desc });
        return null;
      }

      const progress = parseInt(titleMatch[1], 10);
      const title = titleMatch[2].trim();
      const rawCover = coverMatch[1];
      const coverImage = rawCover.replace(/\._S[XY]\d+_/, '._SX200_'); // Update cover size

      return {
        title,
        progress,
        coverImage,
      };
    } catch (err) {
      console.warn(`Skipping item due to error: ${err}`);
      return null;
    }
  }).filter(Boolean);

  return books;
}

// Route to get books data
app.get('/books', async (req, res) => {
  try {
    const books = await processProgressItems();
    console.log('Fetched', books.length, 'items from RSS feed.');
    res.json(books);
  } catch (error) {
    console.error('Error fetching book progress:', error);
    res.status(500).json({ error: 'Failed to fetch book progress' });
  }
});

// Route to return sample data for testing
app.get('/testThree', async (req, res) => {
  const sampleBooks = [
    {
      title: "The Great Gatsby",
      progress: 72,
      coverImage: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1650033243i/41733839._SX150_.jpg",
    },
    {
      title: "1984",
      progress: 54,
      coverImage: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348990566l/5470._SX150_.jpg",
    },
    {
      title: "To Kill a Mockingbird",
      progress: 88,
      coverImage: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1361975680l/2657._SX150_.jpg",
    }
  ];

  res.json(sampleBooks);
});


app.listen(port, () => {
  console.log(`📚 Server running at http://localhost:${port}`);
});
