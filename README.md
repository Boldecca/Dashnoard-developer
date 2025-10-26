# Developer Dashboard

A modern, responsive developer dashboard built with Next.js that displays your GitHub profile statistics and current weather information. Features a clean UI with light/dark mode toggle.

## Features

- **GitHub Profile Card**: Displays real-time GitHub statistics including repositories, followers, and following count
- **Weather Card**: Shows current weather conditions, temperature, wind speed, and local time
- **Theme Toggle**: Switch between light and dark modes with persistent theme storage
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Real-time Data**: Fetches live data from GitHub API and OpenWeatherMap API
- **Loading States**: Elegant loading indicators while fetching data
- **Error Handling**: Graceful error messages if API calls fail

## Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe code
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - UI component library
- **GitHub API** - Fetch user profile data
- **OpenWeatherMap API** - Fetch weather data


5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Information

### GitHub API

- **Endpoint**: `https://github.com/Boldecca`
- **Rate Limit**: 60 requests per hour (unauthenticated)
- **No API key required** for basic usage
- **Customization**: Change the username in `components/github-card.tsx`

### OpenWeatherMap API

- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Free Tier**: 1,000 calls per day
- **Sign up**: [OpenWeatherMap](https://openweathermap.org/api)
- **Customization**: Change the city in `components/weather-card.tsx`

## Project Structure

\`\`\`
developer-dashboard/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles and theme tokens
├── components/
│   ├── github-card.tsx     # GitHub profile statistics card
│   ├── weather-card.tsx    # Current weather card
│   └── theme-toggle.tsx    # Light/Dark mode toggle button
├── components/ui/          # shadcn/ui components
│   ├── card.tsx
│   └── button.tsx
└── README.md
\`\`\`

## Customization

### Change GitHub Username

Edit `components/github-card.tsx`:

\`\`\`tsx
const username = "your-github-username"; // Change this
\`\`\`

### Change Weather Location

Edit `components/weather-card.tsx`:

\`\`\`tsx
const city = "YourCity"; // Change this
const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "demo_key";
\`\`\`

### Modify Theme Colors

Edit `app.css` to customize the color scheme:

\`\`\`css
@theme inline {
  --color-background: 250 250 250;
  --color-foreground: 15 15 15;
  /* Add more custom colors */
}
\`\`\`

## Features Breakdown

### Reusable Components

1. **WeatherCard** - Displays weather data with props for customization
2. **GitHubCard** - Shows GitHub stats with loading and error states
3. **ThemeToggle** - Standalone theme switcher component

### State Management

- Uses React hooks (`useState`, `useEffect`) for local state
- Theme state managed via `next-themes` library
- API data fetched and cached client-side

### Error Handling

- Network error handling with user-friendly messages
- Loading states for better UX
- Fallback UI when data fails to load


### Environment Variables for Production

Add these in your Vercel project settings:

\`\`\`
NEXT_PUBLIC_WEATHER_API_KEY=your_production_api_key
\`\`\`

## Assignment Requirements Met

- ✅ GitHub Profile Card with API integration
- ✅ Current Weather Card with API integration
- ✅ Light/Dark mode toggle
- ✅ Responsive design with Tailwind CSS
- ✅ At least 3 reusable components (WeatherCard, GitHubCard, ThemeToggle)
- ✅ Proper state management with React hooks
- ✅ Error handling and loading states
- ✅ Clean, modern UI design


## Acknowledgments

- 
- [GitHub API](https://github.com/Boldecca/Dashnoard-developer)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [shadcn/ui](https://ui.shadcn.com)
