export const ACCESS_TOKEN_LIFETIME_IN_MS = 60 * 1000 * 60; // 1 hour
export const REFRESH_TOKEN_LIFETIME_IN_SEC = 2 * 30 * 24 * 60 * 60; // 60 days
export const REFRESH_TOKEN_LIFETIME_IN_MS =
  REFRESH_TOKEN_LIFETIME_IN_SEC * 1000; // 60 days

export enum CookieName {
  RefreshToken = 'refresh-token',
}

export enum StrategyName {
  AccessTokenStrategy = 'access_token_strategy',
  RefreshTokenStrategy = 'refresh_token_strategy',
}
