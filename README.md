# Goodreads Scriptable Widget

A simple server to fetch books from the currently reading shelf on Goodreads, along with reading progress information from the Goodreads RSS feed.

## Setup

1. Clone the repository
2. Install dependencies:
	```
	bash
	npm install
	```
2. Run the server:
	```
	node index.js
	```
   
## Endpoint

```/books```: Returns a list of books from the "currently-reading" shelf along with their progress.

## License
MIT