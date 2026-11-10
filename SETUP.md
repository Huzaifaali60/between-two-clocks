# Between Two Clocks: how to put it online

You need two free accounts: **GitHub** (stores your site) and **Netlify** (hosts it). No coding needed.

## 1. Put the files on GitHub
1. Sign up at github.com.
2. Click **New repository**. Name it exactly `between-two-clocks`. Leave everything else as it is and click **Create repository**.
3. On the next page, click **uploading an existing file**.
4. Unzip this folder on your computer. Drag everything inside it into the upload box. Include the `src` folder and `netlify.toml`.
5. Click **Commit changes**.

## 2. Tell the admin panel where your site lives
1. In your repository, open `src/admin/config.yml`.
2. Click the pencil icon to edit.
3. Replace `YOUR-GITHUB-USERNAME` with your GitHub username.
4. Click **Commit changes**.

## 3. Go live on Netlify
1. Sign up at netlify.com using **Sign up with GitHub**.
2. Click **Add new site**, then **Import an existing project**, then **GitHub**.
3. Pick `between-two-clocks`. Netlify reads the settings by itself. Click **Deploy**.
4. Go to **Site configuration**, then **Change site name**, and pick something like `betweentwoclocks`. Your address becomes `https://betweentwoclocks.netlify.app`.

## 4. Write your first entry
1. Visit `https://YOUR-SITE.netlify.app/admin/`.
2. Click **Sign in with Token**. Follow the link it gives you to create a GitHub token for this one repository, with **Contents: Read and write** permission. Paste it in.
3. Open **Diary entries**. The six sample entries are there as drafts. Edit them, delete them, or click **New** to write your own.
4. Click **Save**. Your page goes live in about a minute.

Tip: untick **Keep as a draft** to publish an entry. Drafts never appear on the site.

## 5. Get found on Google
1. Go to search.google.com/search-console and add your site address.
2. Verify it with the **HTML tag** option. Paste that tag into `src/_includes/base.njk`, just under the `<title>` line, and commit.
3. In Search Console, open **Sitemaps** and submit `sitemap.xml`.
4. Do the same at bing.com/webmasters. Bing also feeds ChatGPT search and Copilot.

## Optional: your own domain
Buy a domain such as `huzaifaali.com`. Then, in Netlify, go to **Domain management** and click **Add a domain**. Netlify gives you free HTTPS. The sitemap and links update by themselves on the next build.

## What the site already does for search and AI
- Every entry gets its own page and web address.
- Titles, descriptions, canonical links and social preview tags are on every page.
- Structured data tells Google who you are, links your socials, and marks entries as blog posts.
- `sitemap.xml`, `robots.txt`, an RSS feed at `/feed.xml`, and `llms.txt` for AI tools.
- The admin panel is hidden from search engines.
