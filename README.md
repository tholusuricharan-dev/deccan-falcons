# Thunder Strikers Cricket Club

This is a ready-to-publish static website for a cricket club. It is designed for a beginner using a phone and it does not require any build tools, login system or paid API.

## Included features

- Premium navy, gold and white theme
- Mobile-friendly responsive layout
- Home page hero and club overview
- Searchable player profiles with role filters
- Editable player cards in the browser
- Fixtures and results tabs
- Sortable points table
- Photo gallery section
- Contact block and working WhatsApp button
- Sample data clearly labelled as editable content

## Files in this project

- `index.html` — website structure
- `styles.css` — design and layout
- `script.js` — sample data, filtering, tabs and editing logic

## How to preview on your phone

### Option 1: Open directly from the browser

1. Open the GitHub repository on your phone.
2. Tap the `index.html` file.
3. Use the browser's "Open in new tab" or "View raw" option.
4. If GitHub opens a raw HTML view, use the browser's share menu and choose "Open in browser".

You can also download the repository ZIP file and open `index.html` in a browser on your phone.

### Option 2: Use GitHub Pages

1. Open the GitHub repository in a browser.
2. Tap Settings.
3. Open Pages from the left menu.
4. Under Source, choose Deploy from a branch.
5. Select `main` and the root folder `/`.
6. Save.
7. GitHub will create a live website URL, such as:
   `https://yourusername.github.io/your-repository-name/`

## How to publish from a phone

1. Make sure the repository is public or you have publishing access.
2. Keep the files `index.html`, `styles.css` and `script.js` in the repository root.
3. Go to the GitHub Pages section in the repository settings.
4. Select the `main` branch and root folder.
5. Wait for GitHub to publish.
6. Share the final Pages URL with your club members.

## How to update the club content

### Edit player profiles

- Open the website in the browser.
- Tap the Edit button on any player card.
- Change name, role, specialty, status or jersey number.
- Save the form.
- The page will update instantly in the browser.

### Change WhatsApp settings

Open `script.js` and update this section:

```javascript
const whatsappConfig = {
  number: "919876543210",
  message: "Hello Thunder Strikers Cricket Club! I would like to know about training, membership and match schedules.",
};
```

Replace the sample number and message with your real club WhatsApp number and message.

### Replace sample data

Update the arrays in `script.js`:

- `defaultPlayers`
- `fixtures`
- `results`
- `pointsTableData`
- `galleryItems`

These are clearly labelled sample entries and can be edited safely.

## Notes

- This site uses only local static files.
- No paid APIs or login systems are required.
- All sample player names, matches and results are placeholder content and should be replaced before launch.

## Recommended next step

Before going live, replace all sample text, numbers and club details with your actual club information, then publish using GitHub Pages.
