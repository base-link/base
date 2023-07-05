export function agreeGDPR() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('gdpr', JSON.stringify(true))
    window.location.href = '/'
  }
}

export function getGDPR() {
  if (typeof localStorage !== 'undefined') {
    return JSON.parse(localStorage.getItem('gdpr') ?? 'true') as boolean
  } else {
    return true
  }
}

export function toggleGDPR() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('gdpr', JSON.stringify(!getGDPR()))
    window.location.href = '/gdpr/manage'
  }
}
