# GitHub Pages Deployment Instructions

Your project is ready to be deployed! Follow these steps:

## 1. Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `birthday-app` or `bday`).
3. Make it **Public** (required for free GitHub Pages) or Private (if you have Pro).
4. **Do not** initialize with README, .gitignore, or License (we already have them).
5. Click **Create repository**.

## 2. Link & Push
Copy the commands shown on GitHub under "…or push an existing repository from the command line" and run them in your terminal here. They will look like this:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M master
git push -u origin master
```

## 3. Deploy
Once the code is on GitHub, run this command in your terminal:

```bash
npm run deploy
```

## 4. Verify
1. Go to your repository **Settings** > **Pages**.
2. Ensure the source is set to `gh-pages` branch.
3. Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

Enjoy! 🎉
