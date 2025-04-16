
/**
 * Returns the redirect URL for authentication callbacks
 */
export const getRedirectUrl = (): string => {
  // Use the current window location to build the callback URL
  return `${window.location.origin}/auth/callback`;
};
