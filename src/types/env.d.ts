declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_TOGETHER_API_KEY: string;
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string;
        NODE_ENV: 'development' | 'production' | 'test';
    }
} 