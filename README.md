# Goodreads Scriptable Widget

A super simple widget designed to display your current reading progress from Goodreads using the Scriptable app on iOS. The widget shows the books you're currently reading on Goodreads, their progress, and the cover images in a ~~beautiful and minimalist~~ _okayish_-looking format.

[![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

### Features and How it works

- Displays the covers of books you're currently reading (up to 3)
- Shows your reading progress as a progress bar
- Opens Goodreads app when clicked (unfortunately not without briefly opening Scriptable on the way :/)

This project pulls data from a user’s Goodreads Recent Updates RSS feed, parses it, and displays it on a Scriptable widget for your iOS home screen.

Because the “scraping” is based on RSS, it doesn’t even need to be your own current reading progress that it pulls. W-O-W! You can finally stalk random people’s book habits straight from your home screen! (for legal reasons that’s a joke lol)

### Background

While I love the idea of Goodreads, I’ve always found it difficult to use it consistently. I’ll use it to track my reading (sparingly) for a few days, then forget about it for many many months (along with reading overall), and then suddenly fall into it again. Rinse, aaaand repeat.

Partly it’s just my laziness, but Goodreads is also kinda really uninspiring, except maybe if you are a consistent reader or (somehow) are into its social features. What I – no, _we_ – need is to be blinded by our shame of pushing up reading and logging, shoved into submission to literature by capitalistic beast/owner Amazon every time we open our phones. Heh.

### To-do

- [ ] switch out sample json books
- [ ] add images to readme head
- [ ] test whether page-based progress even works, as opposed to percentage-based.
- [ ] look into whether it’s possible to streamline opening Goodreads without opening Scriptable on the way.
- [ ] look into adapting the code for the small and big widget sizes.
- [ ] come back to developing an alternative, horizontal widget layout.

## Beginner-friendly Setup

I’m writing this with the utmost detail, just in case. If you’re on GitHub, you probably know how to do all of this already (and locally), but I’m tryna be comprehensive here.

### 1 - Fork!

0. Get a GitHub-account.
1. [Fork.](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo?tool=webui#forking-a-repository)

### 2 - Modify the Script

In order to show _your own_ Goodreads data (instead of mine</3), you need to update the script with your own Goodreads RSS feed URL.

1. Go to your Goodreads Profile. Scroll down to “[Your Name]’s Recent Updates. On the right is a button labelled ```rss```. Right-click/Two-finger-click/Control-click/Whatever on it, and copy the link.

2. Go to your newly forked copy of this project. Click on ```index.js```. Click on the pen on the right of the screen to edit the file. Find this line, high up in the file, and replace my URL with the URL you just copied from Goodreads (be sure to keep the quotes):

```javascript
const rssFeedUrl =
  "https://www.goodreads.com/user/updates_rss/85977318?key=6oekI4LM4irGWk-h0td061HXzYEnTelG4NJtuPBJfhV91lfc";
```

3. Click on “Commit changes...” to save the file.

Now you’ve basically prepared all the code needed to scrape your currently-reading. That was so easy!

### 3 - The Vercel-part

Now, if you were to have cloned your fork to your own computer, you could have navigated to it with the terminal, ran ```node index.js```, opened ```localhost:3000```, and be presented with a clump of confusing data. We do need that data, but in order to deliver it automatically to Scriptable, so that the widget works, we need to build a little bridge first. That bridge is _Vercel_. What Vercel does is that it _deploys_ the code in your fork for you, so that the “clump of data” is prepped and gettable for your widget.

Fortunately for you, I have done all of the preparatory architecting for this to work (_ugh back aches_). The only things you need to do is this:

1. [Sign up to Vercel](https://vercel.com/signup) with your GitHub account.
2. Go to your Overview, and click “Add new...” > Project.

3. “Import” goodreads-scriptable-widget, and click “Deploy”.\
   \
   Note: If you ever update your RSS URL in ```index.js``` over in your fork on GitHub, you won’t have to worry about Vercel. Vercel re-deploys your project any time it is updated.

4. The deploying will take a few seconds, but when it’s over, click “Continue to Dashboard”. Under “Domains” is a, well, domain. This is where you will point Scriptable to, in order for it to transform to a widget. So, note this down.

### 4 - The Scriptable-part

Scriptable can be used for probably billions of things, but for us, it’s, as hinted, what actually interprets the mess scraped from Goodreads into a cute little widget.

There isn’t a lot you’ll have to do here either, so just follow along!

1. Install the [Scriptable app](https://apps.apple.com/us/app/scriptable/id1405459188) on your iOS device.

2. Transfer ```goodreads-scriptable-widget.scriptable```[^1] onto your iOS device. Click the file on the device, and click the “share”-button. Find and click the Scriptable icon to open it in Scriptable. Click “Add to my Scripts”.

[^1]: There’s also the file ```goodreads-scriptable-widget.js```. This is mainly for if you just wanna view the same code outside of the Scriptable app.

3. Now, scroll down all the way to the bottom, and find this code:

```javascript
const url = "https://YOUR-DOMAIN.vercel.app/currently-reading"; // Edit endpoint to "/testTwoItems" or "/testThreeItems" for visual testing
```

4. Replace ```https://YOUR-DOMAIN.vercel.app``` with your own domain from step 3.4. Do not replace ```/currently-reading```, as this is the location of the data.

### 5 - The Finale

OOOOOO exciting!

1. [Add the widget to your home screen.](https://support.apple.com/en-us/118610)

2. Press and hold on the widget. Click “Edit Widget”. Click “Script”, and select “goodreads-scriptable-widget”. Click out of there, and admire the final product on your home screen!

---

## Questions

**Q - How do I change the maximum number of books shown on the widget?**

The default maximum number of books shown is 3. This means that there could be 3, 2, 1, or even 0 books shown on the widget, depending on how few books you’re currently reading.

You may for whatever reason want to display fewer than 3. This won’t look as good visually, in my opinion. But to accomplish this, open the Scriptable script, and find this line of code, and swap the 3 for whatever number:

```javascript
// Change this number to control how many books to show at maximum
const maxBooks = Math.min(3, books.length)
                          ↑
```

(Note: I can almost promise that `4` (or – god forbid – more) will not look good in the least.)

**Q - Can I test what the widget looks like on my home screen before I do all this work?**

Absolutely!

In that case, skip sections 1-3, straight to section 4 - "The Scriptable-part". Perform steps 1-3 normally. Instead of following step 4, replace ```YOUR-DOMAIN``` with ```goodreads-scriptable-widget```, and ```\currently-reading``` with ```/testThreeItems``` (or maybe ```/testTwoItems```).

Ta-da!

## Disclaimers and End-user heroism

This project is provided as is. I don’t even really know what i’m doing here, so unfortunately I probably won’t be able to answer any questions. </3

But feel free to play around with it and change it as much as you want! And if you know how to improve or streamline anything, lmk!

## Footnotes
