<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const menuOpen = ref(false)
const isTop = ref(true)
const navbarBgColor = ref('transparent')
const navbarTextColorPrimary = ref('#AFB3B7')
const navbarTextColorSecondary = ref('#5A636A')

function handleScroll() {
  if (route.path !== '/') {
    navbarBgColor.value = '#0D1F23'
    navbarTextColorPrimary.value = '#AFB3B7'
    navbarTextColorSecondary.value = '#5A636A'
    return
  }

  const scrollY = window.scrollY
  isTop.value = scrollY < 10

  if (isTop.value) {
    navbarBgColor.value = 'transparent'
    navbarTextColorPrimary.value = '#AFB3B7'
    navbarTextColorSecondary.value = '#5A636A'
    return
  }

  const navbarHeight = document.querySelector('header')?.offsetHeight || 0
  const sections = Array.from(document.querySelectorAll('section[data-color]'))
  const scrollPosition = scrollY + navbarHeight + 5

  let currentSection = sections.find(section => {
    const top = section.offsetTop
    const bottom = top + section.offsetHeight
    return scrollPosition >= top && scrollPosition < bottom
  })

  if (!currentSection) {
    navbarBgColor.value = 'transparent'
    navbarTextColorPrimary.value = '#AFB3B7'
    navbarTextColorSecondary.value = '#5A636A'
  } else {
    const bg = currentSection.getAttribute('data-color')
    navbarBgColor.value = bg

    switch (bg) {
      case '#0D1F23':
      case '#132E35':
      case '#2D4A59':
        navbarTextColorPrimary.value = '#AFB3B7'
        navbarTextColorSecondary.value = (bg === '#132E35' || bg === '#2D4A59') ? '#B58863' : '#5A636A'
        break
      case '#698180':
      case '#AFB3B7':
        navbarTextColorPrimary.value = '#132E35'
        navbarTextColorSecondary.value = '#5A636A'
        break
      default:
        navbarTextColorPrimary.value = '#AFB3B7'
        navbarTextColorSecondary.value = '#5A636A'
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()

  const urlParams = new URLSearchParams(window.location.search)
  const sectionId = urlParams.get('scrollTo')
  if (sectionId && route.path === '/') {
    setTimeout(() => {
      scrollToSectionDirect(`#${sectionId}`)
    }, 300)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function scrollToSection(event, selector) {
  if (event) event.preventDefault()
  if (menuOpen.value) {
    menuOpen.value = false
    setTimeout(() => scrollToSectionDirect(selector), 350)
  } else {
    scrollToSectionDirect(selector)
  }
}

function scrollToSectionDirect(selector) {
  const element = document.querySelector(selector)
  if (!element) return
  const headerOffset = document.querySelector('header')?.offsetHeight || 0
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - headerOffset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

function handleLink(section) {
  if (route.path === '/') {
    scrollToSection(null, `#${section}`)
  } else {
    menuOpen.value = false
    router.push({ path: '/', query: { scrollTo: section } })
  }
}

function handleLogoClick() {
  if (route.path === '/dashboard') {
    router.push('/')
  } else {
    scrollToSection(null, '#top')
  }
}

function getContrastColor(hexcolor) {
  hexcolor = hexcolor.replace('#', '')
  if (hexcolor.length === 3) hexcolor = hexcolor.split('').map(c => c + c).join('')
  const r = parseInt(hexcolor.substr(0, 2), 16)
  const g = parseInt(hexcolor.substr(2, 2), 16)
  const b = parseInt(hexcolor.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 125 ? '#000000' : '#FFFFFF'
}

const navbarTextColorComputed = computed(() => getContrastColor(navbarBgColor.value))

// Mobil menü açıkken section rengiyle aynı, sadece en üstteyken sabit siyah (#0D1F23)
const mobileMenuBgColor = computed(() => {
  if (!menuOpen.value) return navbarBgColor.value
  if (isTop.value) return '#0D1F23'
  return navbarBgColor.value
})
const mobileMenuTextColor = computed(() => menuOpen.value ? '#FFFFFF' : navbarTextColorComputed.value)
</script>

<template>
  <header
    :style="{ backgroundColor: navbarBgColor }"
    class="fixed top-0 left-0 w-full z-40 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto flex justify-between items-center p-4 md:p-6">
      <!-- Logo -->
      <div
        class="flex items-center gap-3 cursor-pointer select-none"
        @click="handleLogoClick"
      >
        <img src="/muğla döşeme.png" alt="Logo" class="h-9 md:h-12 object-contain" />
        <span :style="{ color: navbarTextColorComputed }" class="text-lg md:text-2xl font-bold">Yıldırım Döşeme</span>
      </div>

      <!-- Hamburger -->
      <button
        @click="menuOpen = !menuOpen"
        class="md:hidden"
        :style="{ color: navbarTextColorComputed }"
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Desktop Menu -->
      <nav class="hidden md:flex gap-8 font-medium">
        <button @click="handleLink('hakkimizda')" :style="{ color: navbarTextColorComputed }" class="hover:text-gray-300 transition">Hakkımızda</button>
        <button @click="handleLink('hizmetler')" :style="{ color: navbarTextColorComputed }" class="hover:text-gray-300 transition">Hizmetler</button>
        <button @click="handleLink('projeler')" :style="{ color: navbarTextColorComputed }" class="hover:text-gray-300 transition">Projeler</button>
        <button @click="handleLink('sss')" :style="{ color: navbarTextColorComputed }" class="hover:text-gray-300 transition">SSS</button>
        <button @click="handleLink('iletisim')" :style="{ color: navbarTextColorComputed }" class="hover:text-gray-300 transition">İletişim</button>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <nav
      v-if="menuOpen"
      class="md:hidden px-4 pb-4 transition-colors duration-300"
      :style="{ backgroundColor: mobileMenuBgColor, color: mobileMenuTextColor }"
    >
      <ul class="flex flex-col gap-4 font-medium">
        <li><button @click="handleLink('hakkimizda')" class="text-left hover:text-gray-300 transition">Hakkımızda</button></li>
        <li><button @click="handleLink('hizmetler')" class="text-left hover:text-gray-300 transition">Hizmetler</button></li>
        <li><button @click="handleLink('projeler')" class="text-left hover:text-gray-300 transition">Projeler</button></li>
        <li><button @click="handleLink('sss')" class="text-left hover:text-gray-300 transition">SSS</button></li>
        <li><button @click="handleLink('iletisim')" class="text-left hover:text-gray-300 transition">İletişim</button></li>
      </ul>
    </nav>
  </header>
</template>
