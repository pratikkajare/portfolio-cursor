# My Portfolio

A modern portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

**Live Demo:** [https://developer-pratik-portfolio.netlify.app/](https://developer-pratik-portfolio.netlify.app/)

## Features

- Modern, responsive design
- Dark mode support
- Smooth animations with Framer Motion
- GitHub stats integration
- Interactive timeline
- Testimonials section
- Blog/Articles section
- Contact form with validation
- SEO optimized

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pratikkajare/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## GitHub Stats Integration

This portfolio includes a feature to display your GitHub statistics, including:
- Repository count
- Star count
- Fork count
- Follower count
- Top languages
- Top repositories

### Updating GitHub Stats

To update your GitHub stats:

1. Make sure you have Python 3 installed.

2. Install the required Python packages:
   ```bash
   pip3 install -r scripts/requirements.txt
   ```

3. Run the update script:
   ```bash
   npm run update-github-stats
   ```

This will fetch your latest GitHub stats and save them to `public/data/github_stats.json`.

### Using a GitHub Token (Optional)

For higher API rate limits, you can use a GitHub personal access token:

1. Create a token at [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens).
2. Set the token as an environment variable:
   ```bash
   export GITHUB_TOKEN=your_token_here
   ```
3. Run the update script.

## Deployment

### Deploying to Netlify

This portfolio is configured for easy deployment to Netlify:

1. Push your code to a GitHub repository.

2. Log in to [Netlify](https://www.netlify.com/).

3. Click "New site from Git" and select your GitHub repository.

4. Use the following settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

5. Click "Deploy site".

Alternatively, you can use the Netlify CLI:

1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build your site:
   ```bash
   npm run build
   ```

3. Deploy to Netlify:
   ```bash
   netlify deploy --prod
   ```

### Environment Variables

If you're using the GitHub stats feature, you'll need to set up the `GITHUB_TOKEN` environment variable in your Netlify dashboard:

1. Go to your site settings in Netlify.
2. Navigate to "Build & deploy" > "Environment".
3. Add the environment variable `GITHUB_TOKEN` with your GitHub personal access token.

## Customization

- Edit `src/app/components/AnimatedPortfolio.tsx` to update content.
- Modify `src/app/components/GitHubStats.tsx` to customize the GitHub stats display.
- Update `tailwind.config.ts` to change the theme colors.

## License

MIT
