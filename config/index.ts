export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME ?? "AetherAirways",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    env: process.env.NODE_ENV ?? "development",
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api",
    timeout: 10_000,
  },
} as const;

export type AppConfig = typeof config;
