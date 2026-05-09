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
      '/images/portrait/44.webp',
      '/images/portrait/48BEC2A5-F1FD-40D7-AFF9-792CCD8E4D67-labbet-app.webp',
      '/images/portrait/50.webp',
      '/images/portrait/51.webp',
      '/images/portrait/829259B2-C5B0-4DD0-A48E-378A65109F79-labbet-app.webp',
      '/images/portrait/95F2A4ED-5EF6-4C7F-AAE9-6599AC27A6D1-labbet-app.webp',
      '/images/portrait/D107CF6E-67F9-4144-AF49-CCD9A0CE26BC-labbet-app.webp',
      '/images/portrait/IMG_4957 2.webp',
      '/images/portrait/IMG_7481 2.webp',
      '/images/portrait/P1011238.webp',
      '/images/portrait/P1280070.webp',
      '/images/portrait/P1280073.webp',
      '/images/portrait/P2200886.webp',
      '/images/portrait/P2200894.webp',
      '/images/portrait/P2200984.webp',
      '/images/portrait/P2201089.webp',
      '/images/portrait/P2201097.webp',
      '/images/portrait/P2201212.webp',
      '/images/portrait/P3061396.webp',
      '/images/portrait/P3061401.webp',
      '/images/portrait/P3221595.webp',
      '/images/portrait/_DSC1979-3.webp',
      '/images/portrait/_DSC2007-2.webp',
      '/images/portrait/_DSC2135.webp',
      '/images/portrait/cover 1.webp',
      '/images/portrait/cover 2.webp',
      '/images/portrait/img20260303_22412412 2.webp',
      '/images/portrait/img20260303_22412412.webp',
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

function getHash() {
  return window.location.hash.replace(/^#/, '').trim().toLowerCase()
}

function isGalleryRoute(hash) {
  return Object.hasOwn(categories, hash)
}

function toPublicUrl(path) {
  return encodeURI(path)
}

function blastConfetti() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.style.position = 'fixed'
  canvas.style.inset = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '9999'

  document.body.appendChild(canvas)

  const dpr = Math.max(1, window.devicePixelRatio || 1)
  const resize = () => {
    canvas.width = Math.floor(window.innerWidth * dpr)
    canvas.height = Math.floor(window.innerHeight * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()

  const colors = ['#cbcfcd', '#7dd3fc', '#34d399', '#fda4af', '#fbbf24']
  const gravity = 0.9
  const drag = 0.985
  const particleCount = 180
  const particles = Array.from({ length: particleCount }, () => {
    const angle = (Math.random() * Math.PI) / 1.8 + Math.PI * 0.1
    const speed = 10 + Math.random() * 10
    return {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.6,
      vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
      vy: -Math.sin(angle) * speed,
      r: 2 + Math.random() * 3,
      w: 6 + Math.random() * 6,
      h: 4 + Math.random() * 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 90 + Math.floor(Math.random() * 40)
    }
  })

  const onResize = () => resize()
  window.addEventListener('resize', onResize)

  let frame = 0
  const tick = () => {
    frame += 1
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    for (const p of particles) {
      if (p.life <= 0) continue
      p.life -= 1

      p.vx *= drag
      p.vy = p.vy * drag + gravity
      p.x += p.vx
      p.y += p.vy
      p.rot += p.vr

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      ctx.globalAlpha = Math.min(1, p.life / 40)
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      ctx.restore()
    }

    if (frame < 160) requestAnimationFrame(tick)
    else cleanup()
  }

  const cleanup = () => {
    window.removeEventListener('resize', onResize)
    canvas.remove()
  }

  requestAnimationFrame(tick)
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function renderShell(mainHtml) {
  const mobileLinks = [
    { id: 'commercial', label: 'Commercial' },
    { id: 'event', label: 'Event' },
    { id: 'portrait', label: 'Portrait' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ]

  app.innerHTML = `
    <div class="page">
      ${mainHtml}
    </div>

    <nav class="site-nav" aria-label="Primary">
      <div class="site-nav__menu-button">
        <button type="button" class="site-nav__home-link" aria-label="Go to home">
          <svg class="site-nav__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V10.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
        </button>
        <button
          type="button"
          class="site-nav__menu-toggle"
          aria-label="Open menu"
          aria-expanded="false"
          aria-controls="mobileNavPanel"
        >
          <span class="site-nav__hamburger" aria-hidden="true">
            <span class="site-nav__bar"></span>
            <span class="site-nav__bar"></span>
          </span>
        </button>
      </div>
    </nav>

    <div class="mobile-nav-panel" id="mobileNavPanel" hidden>
      <div class="mobile-nav-panel__inner">
        <div class="mobile-nav-grid">
          ${mobileLinks
            .map(
              (item) =>
                `<button type="button" class="mobile-nav-link" data-nav="${item.id}">${item.label}</button>`
            )
            .join('')}
        </div>
      </div>
    </div>
  `
}

function bindFloatingNav() {
  const homeBtn = app.querySelector('.site-nav__home-link')
  const toggleBtn = app.querySelector('.site-nav__menu-toggle')
  const panel = app.querySelector('#mobileNavPanel')
  const nav = app.querySelector('.site-nav')

  if (!homeBtn || !toggleBtn || !panel || !nav) throw new Error('Nav UI missing')

  function closeMenu() {
    panel.hidden = true
    toggleBtn.setAttribute('aria-expanded', 'false')
    nav.dataset.menuOpen = 'false'
  }

  function openMenu() {
    panel.hidden = false
    toggleBtn.setAttribute('aria-expanded', 'true')
    nav.dataset.menuOpen = 'true'
  }

  nav.dataset.menuOpen = 'false'

  homeBtn.addEventListener('click', () => {
    closeMenu()
    stopHomeTimer()
    window.location.hash = ''
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  })

  toggleBtn.addEventListener('click', () => {
    if (panel.hidden) openMenu()
    else closeMenu()
  })

  panel.addEventListener('click', (ev) => {
    if (ev.target === panel) closeMenu()
  })

  app.querySelectorAll('[data-nav]').forEach((el) => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-nav')
      if (!id) return
      closeMenu()
      if (isGalleryRoute(id)) {
        window.location.hash = `#${id}`
        return
      }
      window.location.hash = `#${id}`
    })
  })
}

function renderHome() {
  stopHomeTimer()

  renderShell(`
    <section class="home" id="home">
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

    <section class="section" id="about" aria-label="About">
      <div class="section__inner about">
        <div class="about__mosaic" aria-hidden="true">
          <img class="about__img" src="/images/me1.jpg" alt="" loading="lazy" decoding="async" />
          <img class="about__img" src="/images/me2.jpg" alt="" loading="lazy" decoding="async" />
          <img class="about__img" src="/images/mirror.jpg" alt="" loading="lazy" decoding="async" />
          <img class="about__img" src="/images/mirror3.jpg" alt="" loading="lazy" decoding="async" />
          <img class="about__img" src="/images/1E314455-A473-471C-91D4-3E0A0F234574-labbet-app.jpg" alt="" loading="lazy" decoding="async" />
        </div>
        <div class="about__copy">
          <div class="section__kicker">About</div>
          <div class="section__title">Forrest Tindall</div>
          <div class="section__text">
            Boise-based film photographer specializing in film street-style portraiture and film portraits. Available for editorial, personal sessions, and brand work across the Treasure Valley.
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="contact" aria-label="Contact">
      <div class="section__inner">
        <div class="section__kicker">Contact</div>
        <div class="section__title">Let’s work</div>
        <form class="contact-form" id="contactForm">
          <input class="form-input" name="name" type="text" placeholder="Name" required />
          <input class="form-input" name="email" type="email" placeholder="Email" required />
          <textarea class="form-input form-textarea" name="message" placeholder="Message" required></textarea>
          <div class="contact-actions">
            <button class="form-button" type="submit">Send</button>
            <div class="contact-status" id="contactStatus" aria-live="polite"></div>
          </div>
        </form>
      </div>
    </section>
  `)

  bindFloatingNav()

  const coverButton = app.querySelector('.cover')
  const bg = app.querySelector('.cover__bg')
  const title = app.querySelector('#coverTitle')
  const dots = app.querySelector('#coverDots')
  if (!coverButton || !bg || !title || !dots) throw new Error('Home UI missing')

  const contactForm = app.querySelector('#contactForm')
  const contactStatus = app.querySelector('#contactStatus')
  if (!contactForm || !contactStatus) throw new Error('Contact UI missing')

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
  }, 2500)

  contactForm.addEventListener('submit', async (ev) => {
    ev.preventDefault()
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    if (submitBtn && submitBtn.disabled) return

    const fd = new FormData(contactForm)
    const name = String(fd.get('name') || '')
    const email = String(fd.get('email') || '')
    const message = String(fd.get('message') || '')

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_qlqfr28'
    const templateId =
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_cc2wh4f'
    const publicKey =
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'pZtlnSO7NHel0tpbW'

    contactStatus.textContent = '...'
    if (submitBtn) submitBtn.disabled = true

    try {
      const resp = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: name,
            reply_to: email,
            user_email: email,
            subject: 'Contact Inquiry',
            message
          }
        })
      })

      if (!resp.ok) throw new Error('Email failed')
      contactStatus.textContent = ''
      contactForm.reset()
      blastConfetti()
    } catch {
      contactStatus.textContent = 'Error. Try again.'
    } finally {
      if (submitBtn) submitBtn.disabled = false
      setTimeout(() => {
        if (contactStatus.textContent) contactStatus.textContent = ''
      }, 6000)
    }
  })
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

  renderShell(`
    <header class="gallery-header" aria-label="${label}">
      <div class="gallery-header__title">${label}</div>
    </header>
    <main class="gallery" aria-label="${label} gallery">
      ${tiles}
    </main>
  `)

  bindFloatingNav()
}

function route() {
  const hash = getHash()
  if (isGalleryRoute(hash)) {
    renderGallery(hash)
    return
  }

  renderHome()
  if (hash === 'about' || hash === 'contact') {
    requestAnimationFrame(() => scrollToSection(hash))
  }
}

window.addEventListener('hashchange', route)
route()
