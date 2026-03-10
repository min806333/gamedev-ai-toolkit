# GameDev AI Toolkit

GameDev AI Toolkit is a SaaS web application for indie developers who want to generate game ideas, UI plans, and starter gameplay code with AI.

## Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase Auth + Database
- OpenAI API
- Vercel deployment target

## Features

- Email and Google authentication with Supabase
- User dashboard with usage stats
- Game Idea Generator
- Game UI Generator
- Game Code Generator
- Free plan limit of 5 generations per day
- Pro plan support with unlimited usage

## Environment variables

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
NEXT_PUBLIC_APP_URL=https://gamedev-ai-toolkit.vercel.app
```

## Supabase setup

1. Create a Supabase project.
2. Enable Email auth and Google auth in Authentication > Providers.
3. Run the SQL in `supabase/schema.sql`.
4. Add `https://gamedev-ai-toolkit.vercel.app` and your deployed domain callback URL to Supabase auth redirects.

## Local development

```bash
npm install
npm run dev
```

## Deployment

1. Push the project to GitHub.
2. Import it into Vercel.
3. Add the environment variables in the Vercel project settings.
4. Set `NEXT_PUBLIC_APP_URL` to your production URL.

## Notes

- Billing UI is included, but Stripe subscription management is not wired yet.
- Usage limits are enforced server-side before each generation request.
