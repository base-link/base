const IS_SERVER = typeof window === 'undefined' || 'Deno' in window

export default IS_SERVER
