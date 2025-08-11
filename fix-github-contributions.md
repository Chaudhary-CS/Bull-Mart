# Fix GitHub Contributions Issue

## Problem
Your GitHub shows 24 contributions but you have 29 commits. This is because your commits are using the wrong email address.

## Current Issue
- Commits using: `kartikchaudhary@Kartiks-MacBook-Pro.local`
- GitHub expects: Your GitHub email address

## Solution Steps

### 1. Find Your GitHub Email
1. Go to GitHub.com → Settings → Emails
2. Copy your primary email or GitHub-provided email

### 2. Configure Git Email
```bash
git config --global user.email "your-github-email@example.com"
```

### 3. Verify Configuration
```bash
git config --global user.name
git config --global user.email
```

### 4. Fix Previous Commits (Optional)
If you want to fix previous commits, you can use:
```bash
git filter-branch --env-filter '
export GIT_AUTHOR_EMAIL="your-github-email@example.com"
export GIT_COMMITTER_EMAIL="your-github-email@example.com"
' --tag-name-filter cat -- --branches --tags
```

### 5. Push Changes
```bash
git push bullmart main
```

## Alternative: Use GitHub CLI
1. Install GitHub CLI: `brew install gh`
2. Login: `gh auth login`
3. This will automatically configure your git email

## Why This Happens
- GitHub only counts contributions when commit email matches your GitHub account
- Local machine emails (like @Kartiks-MacBook-Pro.local) don't count
- You need to use your GitHub email or GitHub-provided email

## Quick Fix Commands
```bash
# Set your GitHub email (replace with your actual email)
git config --global user.email "your-github-email@example.com"

# Commit current changes
git add .
git commit -m "feat: add sample data and fix database connection"

# Push to GitHub
git push bullmart main
```

## Expected Result
After fixing the email, your future commits will count toward GitHub contributions. 