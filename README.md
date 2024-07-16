# Setup

1. Populate `.env` files in `apps/api-go`, `apps/web` with your own values
2. There's not much code. So I recommend to quickly review package.json files to see if you are fine with the libraries used. Then skim through the code and see if you want to change anything

# Structure

## There are two apps: `api-go` and `web`

### The `api-go` is a simple Go API that uses [echo](https://echo.labstack.com/) framework

- `Air` for hot reloading: https://github.com/cosmtrek/air
- `godotenv` for loading environment variables: https://github.com/joho/godotenv

### The `web` is a Next.js app that uses [clerk](https://clerk.com/) for authentication

- `Next.js` for the web framework
- `Clerk` for authentication
- `PostHog` for analytics
- `Sentry` for error monitoring
- `Drizzle ORM` for database access
- `Upstash` for rate limiting
- `shadcn/ui`, `Tailwind CSS`, `lucide-react` for UI components, styling and animations, icons
- `Vercel` for hosting
- and a few more... as usual

TODO:

- [ ] checkout https://zsa.vercel.app/docs/react-query add React Query
- [ ] research ways to reduce usage of React Query and rely more on server actions
- [ ] checkout https://icon-sets.iconify.design/line-md/?category=Animated+Icons
- [ ] more robust error handling in web: https://nextjs.org/learn/dashboard-app/error-handling
