# Goodreads Scriptable Widget

A simple widget designed to display your current reading progress from Goodreads using the Scriptable app on iOS. The widget shows the books you're currently reading, their percentage progress, and the cover images in a ~~beautiful and minimalist~~ format.

As we all know, the Goodreads app SUCKS. That’s especially bad for me. 

### Background

While I love the idea of Goodreads, I’ve always found it difficult to use it consistently. I’ll use it to track my reading (sparingly) for a few days, then forget about it for many many months (along with reading overall), and then suddenly fall into it again. Rinse and repeat.

A part of it is just my laziness, but Goodreads is also kinda uninspiring, unless you are a consistent reader or (somehow) are into its social features. What I – no, *we* – need is to be blinded by our shame of pushing up reading and logging, shoved into submission to literature by capitalistic beast/owner Amazon every time we open our phones. 


This project pulls data from a user’s Goodreads Recent Updates RSS feed, parses it, and displays it on a Scriptable widget for your iOS home screen.

Because the “scraping” is based on RSS, it doesn’t even need to be your own current reading progress that it pulls. W-O-W! You can finally stalk random people’s book habits straight from your home screen, revolutionary! (for legal reasons that’s a joke lol)

## Features

- Displays the books you're currently reading.
- Shows your reading progress as a percentage.
- Displays book cover images next to their titles.
- Lightweight and easy to integrate with the Scriptable app on iOS.
- Real-time updates as you read more books.

## Requirements

- [Scriptable app](https://apps.apple.com/us/app/scriptable/id1405459188) installed on your iPhone or iPad.
	- *Note: it’s probably super possible to use something else, this is just what I felt worked for me.*
- A Goodreads account (obviously).
  
## Setup

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/goodreads-scriptable-widget.git
cd goodreads-scriptable-widget
```

### 2. Modify the Script
In order to show your personal Goodreads data, you need to update the script with your Goodreads RSS feed URL.

Go to your Goodreads account.
Find your RSS feed URL by visiting your "Reading" page and grabbing the RSS feed URL (usually found in the settings).
Replace the rssFeedUrl in the index.js file with your personalised RSS URL.
const rssFeedUrl = 'YOUR_GOODREADS_RSS_FEED_URL';

### 3. Deploy the Widget
The widget is deployed on Vercel, making it accessible over the web and ensuring it works as expected.

Push the changes to GitHub and deploy your repository to Vercel using their simple deployment process. Vercel will automatically handle your deployment once you push the changes to GitHub.

### 4. Set Up Scriptable Widget
Open Scriptable on your iPhone or iPad.
Create a new script and paste the contents of index.js into the new script.
Save the script.
Add a new widget to your home screen and link it to the script.

### 5. Enjoy Your Goodreads Widget!
Once the widget is deployed and the script is set up on your iPhone/iPad, you'll see the current reading progress and cover images directly on your home screen.




### Customisation Tips

- **Change the Style**: Feel free to modify the script’s visual appearance. The widget can be further customised by changing the CSS or the way books are displayed.
- **Multiple Widgets**: You can create multiple widgets for different reading statuses, such as books you've completed, books you're planning to read, etc.
  
  ---

## Notes and Other stuff
This project is provided as is. I don’t even really know what i’m doing here, so unfortunately I probably won’t be able to answer any questions. </3

But feel free to play around with it and change it as much as you want! And if you know how to improve or streamline anything, lmk!

### License
This project is open-source and available under the MIT License. See LICENSE.txt for more.