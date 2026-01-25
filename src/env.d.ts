export const envs = [
  "CI",
  "NEXT_PUBLIC_BASE_URI",
  "NEXT_PUBLIC_GOOGLE_CLIENT_ID",
  "NEXT_PUBLIC_GOOGLE_CLIENT_SECRET",
] as const;

type Envs = (typeof envs)[number];

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Record<Envs, string> {
      readonly CI: string;
      readonly NEXT_PUBLIC_BASE_URI: string;
      readonly NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
      readonly NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string;
    }
  }
}

export {};
