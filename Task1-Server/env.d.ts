namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_HOST: string;
    POSTGRES_PORT: number;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DATABASE: string;
    PORT?: number;

    ACCESS_SECRET: string;
    REFRESH_SECRET: string;
    ACCESS_EXPIRATION_TIME: number;
    REFRESH_EXPIRATION_TIME: number;
  }
}
