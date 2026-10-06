import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
import router from './router'
import { business } from './data/business'
import { faqItems } from './data/faq'
import { serviceCards } from './data/services'

// Used only by scripts/prerender.js at build time
export async function render() {
  const app = createSSRApp(App)
  app.use(router)
  await router.push('/')
  await router.isReady()

  return { html: await renderToString(app), jsonLd: [localBusinessJsonLd(), faqJsonLd()] }
}

function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${business.url}#business`,
    name: business.name,
    url: business.url,
    telephone: business.phoneE164,
    email: business.email,
    logo: `${business.url}og-image.jpg`,
    image: `${business.url}og-image.jpg`,
    description:
      'Mobile repair service for smartphones, tablets, laptops, gaming consoles and other electronics in Hartville, OH and surrounding areas.',
    areaServed: {
      '@type': 'City',
      name: 'Hartville',
      containedInPlace: { '@type': 'State', name: 'Ohio' },
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: business.openingHours.days,
      opens: business.openingHours.opens,
      closes: business.openingHours.closes,
    },
    makesOffer: serviceCards.map((card) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: card.title },
    })),
  }
}

function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a.join(' ') },
    })),
  }
}
