
/**
 * Returns the redirect URL for authentication callbacks
 */
export const getRedirectUrl = (): string => {
  return `${window.location.origin}/auth/callback`;
};
