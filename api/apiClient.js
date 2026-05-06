let _refresh = null
let _logout  = null

export const registerAuthCallbacks = (refresh, logout) => {
  _refresh = refresh
  _logout  = logout
}

/**
 * Drop-in fetch replacement for authenticated endpoints.
 * On 401: attempts token refresh once, retries with new token.
 * On refresh failure: calls logout and throws so callers handle it.
 */
export const authFetch = async (url, options = {}) => {
  const res = await fetch(url, options)

  if (res.status !== 401) return res

  try {
    const newToken = await _refresh()
    return fetch(url, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${newToken}` },
    })
  } catch {
    _logout?.()
    throw new Error('Session expired. Please log in again.')
  }
}
