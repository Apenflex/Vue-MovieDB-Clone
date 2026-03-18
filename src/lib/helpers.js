export function correctLanguageCode(lang) {
  return lang === 'ua' ? 'uk-UA' : 'en-US'
}

export function calcVoteColor(vote) {
  switch (true) {
    case vote >= 70:
      return { background: `conic-gradient(from 0deg, green 0% ${vote}%, black 10% 100%)` }
    case vote >= 50:
      return { background: `conic-gradient(from 0deg, orange 0% ${vote}%, black 10% 100%)` }
    case vote >= 0:
      return { background: `conic-gradient(from 0deg, red 0% ${vote}%, black 10% 100%)` }
    default:
      return { color: '#fff' }
  }
}

export function calcTabActiveClass(moviesType, variant) {
  return {
    active: moviesType?.variant?.value === variant,
  }
}

