import './env';
declare module 'express-session' {
    interface SessionData {
        authenticated: boolean;
    }
}
declare module 'http' {
    interface IncomingMessage {
        rawBody: unknown;
    }
}
