# GitHub Pages Deployment Guide

This guide will help you deploy the voting system to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your computer
- Firebase project set up (see README.md)

## Step 1: Set Up Firebase

Before deploying, make sure you've:
1. Created a Firebase project
2. Enabled Firestore Database
3. Updated `public/firebase-config.js` with your Firebase credentials
4. Set Firestore security rules

See `README.md` for detailed Firebase setup instructions.

## Step 2: Prepare Your Repository

### Option A: Files in Root Directory (Recommended for GitHub Pages)

1. **Move files from `public/` to root:**
   ```bash
   # On Mac/Linux
   mv public/* .
   rmdir public
   
   # On Windows
   move public\* .
   rmdir public
   ```

2. **Update HTML file paths** (if needed):
   - All paths should be relative (e.g., `style.css` not `/style.css`)
   - GitHub Pages serves from root, so paths should work as-is

### Option B: Keep Files in `public/` Folder

1. **Configure GitHub Pages to use `public` folder:**
   - Go to repository Settings → Pages
   - Set source to `/public` folder
   - Note: This may require a custom GitHub Actions workflow

## Step 3: Push to GitHub

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   ```

2. **Add all files:**
   ```bash
   git add .
   ```

3. **Commit:**
   ```bash
   git commit -m "Initial commit - Voting System"
   ```

4. **Create repository on GitHub:**
   - Go to https://github.com/new
   - Create a new repository (e.g., "voting-system")
   - Don't initialize with README (you already have one)

5. **Connect and push:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/voting-system.git
   git branch -M main
   git push -u origin main
   ```

## Step 4: Enable GitHub Pages

1. **Go to your repository on GitHub**
2. **Click "Settings"** (top menu)
3. **Click "Pages"** (left sidebar)
4. **Under "Source":**
   - Select branch: `main` (or `master`)
   - Select folder: `/ (root)` or `/public` (depending on your setup)
5. **Click "Save"**
6. **Wait 1-2 minutes** for GitHub to build your site
7. **Your site will be live at:**
   - `https://YOUR_USERNAME.github.io/voting-system/`

## Step 5: Test Your Deployment

1. **Visit your GitHub Pages URL**
2. **Test voting:**
   - Submit a test vote
   - Check Firebase Console → Firestore Database
   - Verify the vote was saved
3. **Test results page:**
   - Navigate to results page
   - Verify votes are displayed correctly

## Important Notes

### Firebase Configuration

⚠️ **Security Warning:** Your Firebase config will be visible in the browser. This is normal for client-side Firebase apps, but:

- Your API key is restricted by Firebase security rules
- Never commit sensitive data (like service account keys)
- Consider using Firebase App Check for additional protection

### Custom Domain (Optional)

If you want to use a custom domain:

1. In GitHub Pages settings, add your custom domain
2. Update Firebase authorized domains:
   - Firebase Console → Authentication → Settings → Authorized domains
   - Add your custom domain

### Updating Your Site

To update your site:

1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update voting options"
   git push
   ```
3. GitHub Pages will automatically rebuild (takes 1-2 minutes)

## Troubleshooting

### Site not loading
- Check GitHub Pages is enabled in Settings
- Verify branch and folder are correct
- Wait a few minutes for initial build
- Check repository Actions tab for build errors

### Firebase errors
- Verify `firebase-config.js` has correct credentials
- Check browser console for specific errors
- Ensure Firestore is enabled and rules are set
- Verify internet connection (Firebase loads from CDN)

### File paths not working
- Use relative paths (e.g., `style.css` not `/style.css`)
- Check file structure matches GitHub Pages setup
- Verify files are in the correct location

### 404 errors
- Check file names match exactly (case-sensitive on some systems)
- Verify HTML file paths are correct
- Ensure `index.html` exists in root or configured folder

## Mobile Access

- Your GitHub Pages URL works on all devices
- Just share the link: `https://YOUR_USERNAME.github.io/voting-system/`
- No special configuration needed

## Backup

- Your code is backed up on GitHub
- Firebase data is stored in the cloud
- Consider exporting Firebase data periodically for additional backup

## Need Help?

- GitHub Pages Docs: https://docs.github.com/pages
- Firebase Docs: https://firebase.google.com/docs
- Check browser console for specific error messages

