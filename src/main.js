import './style.css'

const categories = {
  commercial: {
    label: 'Commercial',
    cover: '/images/commercial/_DSC6969.webp',
    images: [
      '/images/commercial/_DSC1613-3.webp',
      '/images/commercial/_DSC1636.webp',
      '/images/commercial/_DSC1954-2.webp',
      '/images/commercial/_DSC2016.webp',
      '/images/commercial/_DSC2193-2.webp',
      '/images/commercial/_DSC2842.webp',
      '/images/commercial/_DSC3168-2.webp',
      '/images/commercial/_DSC3525.webp',
      '/images/commercial/_DSC3991.webp',
      '/images/commercial/_DSC4019.webp',
      '/images/commercial/_DSC4390.webp',
      '/images/commercial/_DSC4685-2.webp',
      '/images/commercial/_DSC4899.webp',
      '/images/commercial/_DSC6814.webp',
      '/images/commercial/_DSC6836.webp',
      '/images/commercial/_DSC6840.webp',
      '/images/commercial/_DSC6942.webp',
      '/images/commercial/_DSC6969.webp',
      '/images/commercial/_DSC7999-4.webp',
      '/images/commercial/_DSC9182.webp'
    ]
  },
  event: {
    label: 'Event',
    cover: '/images/event/event cover 1.webp',
    images: [
      '/images/event/_DSC2349.webp',
      '/images/event/_DSC2350.webp',
      '/images/event/_DSC2400.webp',
      '/images/event/_DSC2406.webp',
      '/images/event/_DSC2439.webp',
      '/images/event/_DSC2444.webp',
      '/images/event/_DSC2446.webp',
      '/images/event/_DSC2447.webp',
      '/images/event/_DSC2464 2.webp',
      '/images/event/_DSC2464.webp',
      '/images/event/_DSC2501 2.webp',
      '/images/event/_DSC2501.webp',
      '/images/event/_DSC2511.webp',
      '/images/event/_DSC2530.webp',
      '/images/event/_DSC2556.webp',
      '/images/event/_DSC2558.webp',
      '/images/event/_DSC2560.webp',
      '/images/event/_DSC2563.webp',
      '/images/event/_DSC2583 2.webp',
      '/images/event/_DSC2583 3.webp',
      '/images/event/_DSC2583.webp',
      '/images/event/_DSC2588.webp'
    ]
  },
  portrait: {
    label: 'Portrait',
    cover: '/images/portrait/cover 1.webp',
    images: [
      '/images/portrait/P2200886.webp',
      '/images/portrait/P2200894.webp',
      '/images/portrait/P2200926.webp',
      '/images/portrait/P2200941.webp',
      '/images/portrait/P2200984.webp',
      '/images/portrait/P2201089.webp',
      '/images/portrait/P2201097.webp',
      '/images/portrait/P2201212.webp',
     
      '/images/portrait/IMG_7481 2.webp',
      '/images/portrait/P1280070.webp',
      '/images/portrait/P1280073.webp',
      '/images/portrait/P3061396.webp',
      '/images/portrait/P3061401.webp',
      '/images/portrait/_DSC0991.webp',
      '/images/portrait/_DSC1032.webp',
      '/images/portrait/_DSC1033-3.webp',
      '/images/portrait/_DSC1033-4.webp',
      '/images/portrait/_DSC1039-4.webp',
      '/images/portrait/_DSC1040-2.webp',
      '/images/portrait/_DSC1040-3.webp',
      '/images/portrait/_DSC1053-2.webp',
      '/images/portrait/_DSC2135.webp',
      '/images/portrait/img20260426_18543494.webp'
    ]
  }
}

const categoryOrder = ['commercial', 'event', 'portrait']
const app = document.querySelector('#app')
if (!app) throw new Error('Missing #app')

let homeTimer = null
let homeCategoryIndex = 0

function stopHomeTimer() {
  if (homeTimer) {
    clearInterval(homeTimer)
    homeTimer = null
  }
}

function getCategoryFromHash() {
  const raw = window.location.hash.replace(/^#/, '').trim().toLowerCase()
  if (!raw) return null
  if (!Object.hasOwn(categories, raw)) return null
  return raw
}

function toPublicUrl(path) {
  return encodeURI(path)
}

function renderHome() {
  stopHomeTimer()

  app.innerHTML = `
    <section class="home">
      <button class="cover" type="button" aria-label="Open gallery">
        <span class="cover__bg" aria-hidden="true"></span>
        <span class="cover__overlay" aria-hidden="true"></span>
        <span class="cover__content">
          <span class="cover__kicker">Galleries</span>
          <span class="cover__title" id="coverTitle"></span>
          <span class="cover__hint">Click to open</span>
          <span class="cover__dots" id="coverDots" aria-hidden="true"></span>
        </span>
      </button>
    </section>
  `

  const coverButton = app.querySelector('.cover')
  const bg = app.querySelector('.cover__bg')
  const title = app.querySelector('#coverTitle')
  const dots = app.querySelector('#coverDots')
  if (!coverButton || !bg || !title || !dots) throw new Error('Home UI missing')

  function updateCover() {
    const key = categoryOrder[homeCategoryIndex]
    const category = categories[key]
    const coverUrl = toPublicUrl(category.cover)

    bg.style.backgroundImage = `url("${coverUrl}")`
    title.textContent = category.label
    dots.innerHTML = categoryOrder
      .map((k, idx) =>
        idx === homeCategoryIndex
          ? `<span class="dot dot--active"></span>`
          : `<span class="dot"></span>`
      )
      .join('')

    coverButton.onclick = () => {
      window.location.hash = `#${key}`
    }
  }

  updateCover()
  homeTimer = setInterval(() => {
    homeCategoryIndex = (homeCategoryIndex + 1) % categoryOrder.length
    updateCover()
  }, 4000)
}

function renderGallery(categoryKey) {
  stopHomeTimer()

  const { label, images } = categories[categoryKey]
  const tiles = images
    .map((imgPath) => {
      const url = toPublicUrl(imgPath)
      return `
        <figure class="tile">
          <img src="${url}" alt="${label} photo" loading="lazy" decoding="async" />
        </figure>
      `
    })
    .join('')

  app.innerHTML = `
    <header class="topbar">
      <a class="topbar__home" href="#">Home</a>
      <h1 class="topbar__title">${label}</h1>
    </header>
    <main class="gallery" aria-label="${label} gallery">
      ${tiles}
    </main>
  `
}

function route() {
  const categoryKey = getCategoryFromHash()
  if (categoryKey) renderGallery(categoryKey)
  else renderHome()
}

window.addEventListener('hashchange', route)
route()
