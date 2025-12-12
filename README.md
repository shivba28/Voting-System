# Voting System

An online voting system for company competitions: Salsa Competition and Jolly Costume Contest.

## Features

- **Two Separate Voting Forms**: One for Salsa Competition and one for Jolly Costume Contest
- **Real-time Vote Tallying**: Votes are saved to Firebase and automatically tallied
- **Results Page**: View live results with winners highlighted
- **Modern UI**: Beautiful Christmas-themed, responsive design that works on all devices
- **GitHub Pages Ready**: Deploy as static files to GitHub Pages

## Setup Instructions

### 1. Set Up Firebase (Required - 5 minutes)

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Sign in with your Google account (free)

2. **Create a New Project**
   - Click "Add project" or "Create a project"
   - Enter project name: "voting-system" (or any name)
   - Disable Google Analytics (optional, not needed)
   - Click "Create project"

3. **Enable Firestore Database**
   - In your Firebase project, click "Firestore Database" in the left menu
   - Click "Create database"
   - Select "Start in test mode" (for now - you can secure it later)
   - Choose a location (closest to you)
   - Click "Enable"

4. **Get Your Firebase Configuration**
   - Click the gear icon ⚙️ next to "Project Overview"
   - Select "Project settings"
   - Scroll down to "Your apps" section
   - Click the `</>` (web) icon
   - Register app with nickname: "Voting System"
   - Copy the `firebaseConfig` object

5. **Update firebase-config.js**
   - Open `public/firebase-config.js` in your project
   - Replace the placeholder values with your actual Firebase config:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_ACTUAL_API_KEY",
       authDomain: "your-project-id.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project-id.appspot.com",
       messagingSenderId: "123456789",
       appId: "1:123456789:web:abcdef"
     };
     ```

6. **Set Firestore Security Rules (Important!)**
   - In Firebase Console, go to "Firestore Database" → "Rules"
   - Replace the rules with:
     ```javascript
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /votes/{document=**} {
           allow read: if true;
           allow write: if true;
         }
       }
     }
     ```
   - Click "Publish"
   - **Note:** These rules allow anyone to read/write. For production, consider adding authentication.

## Deployment to GitHub Pages

### Step 1: Push to GitHub

1. **Create a GitHub repository** (if you haven't already)
2. **Push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Voting System"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

### Step 2: Enable GitHub Pages

1. Go to your GitHub repository
2. Click "Settings" → "Pages"
3. Under "Source", select:
   - Branch: `main` (or `master`)
   - Folder: `/public` (or `/root` if your files are in root)
4. Click "Save"
5. Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Step 3: Update File Paths (if needed)

If your files are in the `public` folder, GitHub Pages will serve them from the root. You may need to:
- Move files from `public/` to root, OR
- Configure GitHub Pages to use the `public` folder as the source

## File Structure

```
Voting System/
├── public/
│   ├── index.html          # Main voting page
│   ├── salsa.html          # Salsa voting form
│   ├── costume.html         # Costume voting form
│   ├── results.html         # Results display page
│   ├── style.css            # Styling
│   ├── app.js               # Voting form logic (Firebase)
│   ├── results.js            # Results display logic (Firebase)
│   ├── firebase-config.js   # Firebase configuration (UPDATE THIS!)
│   └── christmas.js         # Christmas animations
└── README.md                # This file
```

## How to Use

1. **Voting**: 
   - Fill out the forms for either or both competitions
   - Select your choices for each category
   - Click "Submit" to cast your vote

2. **Viewing Results**:
   - Click the "View Results" link on the main page
   - Winners are highlighted in green
   - All vote counts are displayed for each category

## Updating Options

To update the voting options (currently using placeholder names):

1. Open `public/salsa.html` and `public/costume.html`
2. Find the `<select>` elements for each category
3. Update the `<option>` values with your actual competition entries
4. Make sure the option values match across all categories if needed

## Firebase Free Tier Limits

- **50,000 reads/day** - More than enough for a company event
- **20,000 writes/day** - Plenty for voting
- **1 GB storage** - More than sufficient
- **Free forever** for this use case

## Mobile Access

- Works perfectly on phones - just share your GitHub Pages URL
- No special configuration needed
- Responsive design adapts to all screen sizes

## Troubleshooting

**"Firebase is not defined" error:**
- Check that Firebase SDK scripts are loading (check browser console)
- Verify internet connection (Firebase SDK loads from Google CDN)
- Make sure `firebase-config.js` is loaded before `app.js` and `results.js`

**Votes not saving:**
- Check Firebase Console → Firestore Database to see if data appears
- Verify `firebase-config.js` has correct credentials
- Check browser console for errors
- Verify Firestore security rules allow read/write

**Files not loading on GitHub Pages:**
- Check that files are in the correct folder (root or public)
- Verify GitHub Pages is configured correctly
- Check file paths in HTML (use relative paths)

## Security Notes

**Current setup:** Anyone can vote multiple times (no authentication)

**For production, consider:**
- Adding Firebase Authentication
- Implementing rate limiting
- Using Firebase App Check to prevent abuse
- Updating Firestore security rules

## License

ISC
