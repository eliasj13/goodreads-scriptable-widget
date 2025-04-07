export default function handler(req, res) {
  const sampleBooks = [
    {
      title: "The Great Gatsby",
      progress: 72,
      coverImage: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1441913873l/4671._SX200_.jpg",
    },
    {
      title: "1984",
      progress: 54,
      coverImage: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348990566l/5470._SX200_.jpg",
    },
    {
      title: "To Kill a Mockingbird",
      progress: 88,
      coverImage: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1361975680l/2657._SX200_.jpg",
    }
  ];

  res.status(200).json(sampleBooks);
}