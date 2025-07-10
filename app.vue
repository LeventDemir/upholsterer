<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const showModal = ref(false)
const modalImage = ref('')
function openModal(src) {
  modalImage.value = src
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}

const allProjectsLoaded = ref(true)
function loadMoreProjects() {
  allProjectsLoaded.value = true
}

const faqOpen = ref(null)
function toggleFaq(index) {
  faqOpen.value = faqOpen.value === index ? null : index
}

const testimonials = ref([
  {
    name: "Ahmet Yılmaz",
    comment: "Koltuklarımızı yepyeni yaptılar, çok memnun kaldık. İşçilik ve hizmet çok iyi.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Ayşe Demir",
    comment: "Hızlı teslimat ve uygun fiyat, kesinlikle tavsiye ederim. Çok kaliteli işler.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
  },
  {
    name: "Mehmet Can",
    comment: "Döşeme işinde çok iyiler, salonumuz harika oldu. İlgileri çok iyiydi.",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    rating: 5,
  },
  {
    name: "Elif Karaca",
    comment: "Kumaş seçimi çok zengin, hizmet hızlı ve çok profesyonelce. Çok teşekkür ederim.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
  {
    name: "Serkan Yıldız",
    comment: "Çok memnun kaldım, fiyat performans açısından harika bir ekip.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    rating: 4,
  },
  {
    name: "Derya Çelik",
    comment: "Evime gelen hizmeti çok beğendim, çok nazik ve ilgili çalışanlar var.",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    rating: 5,
  },
])


const faqs = ref([
  { q: "Hangi malzemeleri kullanıyorsunuz?", a: "Sadece kaliteli ve dayanıklı kumaş ve sünger kullanıyoruz." },
  { q: "Teslim süresi ne kadar?", a: "Genellikle 5-7 iş günü içerisinde teslim ediyoruz." },
  { q: "Nakliye hizmetiniz var mı?", a: "Evet, şehir içi ücretsiz nakliye hizmetimiz mevcuttur." },
  { q: "Fiyatlandırma nasıl yapılıyor?", a: "Ürün modeline ve kumaş seçimine göre fiyat belirlenir." },
  { q: "Özel tasarım ürün siparişi verebilir miyim?", a: "Evet, özel tasarım talepleriniz için bizimle iletişime geçebilirsiniz. Size özel çözümler sunuyoruz." },
  { q: "Ödeme seçenekleriniz nelerdir?", a: "Kredi kartı, banka havalesi ve kapıda ödeme seçeneklerimiz mevcuttur." }
])

const projects = ref([
  {
    title: 'Modern Koltuk Döşeme',
    description:
      'Estetik ve dayanıklı kumaş kullanarak salonunuza modern dokunuşlar.',
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    largeImage:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    category: 'Koltuk',
  },
  {
    title: 'Rustik Sandalye Yenileme',
    description:
      'Eski sandalyeleriniz yenileniyor, rustik ve şık tasarımda konfor.',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    largeImage:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    category: 'Sandalye',
  },
  {
    title: 'Cafe İçin Özel Döşeme',
    description:
      'Kafe ve ofis ortamları için dayanıklı, kolay temizlenebilir tasarımlar.',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80',
    largeImage:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    category: 'Cafe',
  },
  {
    title: 'Ofis Koltuğu Yenileme',
    description: 'Ofis koltuklarınızı hem konforlu hem de şık hale getiriyoruz.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    largeImage:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    category: 'Ofis',
  },
  {
    title: 'Modern Koltuk Döşeme',
    description:
      'Estetik ve dayanıklı kumaş kullanarak salonunuza modern dokunuşlar.',
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    largeImage:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    category: 'Koltuk',
  },
  {
    title: 'Cafe İçin Özel Döşeme',
    description:
      'Kafe ve ofis ortamları için dayanıklı, kolay temizlenebilir tasarımlar.',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80',
    largeImage:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    category: 'Cafe',
  },
])

const references = ref([
  { name: "ABC Mobilya", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" },
  { name: "XYZ Cafe", image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80" },
  { name: "Mehmet İnşaat", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80" },
  { name: "Elif Ev Dekorasyon", image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80" },
  { name: "Deniz Mobilya", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80" },
  { name: "Papatya Cafe", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=80" },
  { name: "Moda Mobilya", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" },
])

const scrollContainer = ref(null)
let animationFrameId = null

// Otomatik scroll için kontrol değişkenleri
let autoScrollPaused = false
let pauseTimeoutId = null

function scrollStep() {
  if (!scrollContainer.value) return

  if (!autoScrollPaused) {
    scrollContainer.value.scrollLeft += 1

    // scroll container'ın yarısına gelince başa dön
    if (scrollContainer.value.scrollLeft >= scrollContainer.value.scrollWidth / 0) {
      scrollContainer.value.scrollLeft = 0
    }
  }

  animationFrameId = requestAnimationFrame(scrollStep)
}

onMounted(async () => {
  await nextTick()
  animationFrameId = requestAnimationFrame(scrollStep)
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})

// Butonlara tıklanınca otomatik scroll'u 3 saniye durdur
function pauseAutoScrollTemporarily() {
  autoScrollPaused = true
  if (pauseTimeoutId) clearTimeout(pauseTimeoutId)

  pauseTimeoutId = setTimeout(() => {
    autoScrollPaused = false
  }, 3000) // 3 saniye sonra tekrar otomatik devam
}

function scrollLeft() {
  if (scrollContainer.value) {
    pauseAutoScrollTemporarily()
    scrollContainer.value.scrollBy({ left: -300, behavior: 'smooth' })
  }
}

function scrollRight() {
  if (scrollContainer.value) {
    pauseAutoScrollTemporarily()
    scrollContainer.value.scrollBy({ left: 300, behavior: 'smooth' })
  }
}

const navbarBgColor = ref('transparent')
const navbarTextColorPrimary = ref('#AFB3B7')
const navbarTextColorSecondary = ref('#5A636A')
const isTop = ref(true)

function handleScroll() {
  const scrollY = window.scrollY
  isTop.value = scrollY < 10

  if (isTop.value) {
    navbarBgColor.value = 'transparent'
    navbarTextColorPrimary.value = '#AFB3B7'
    navbarTextColorSecondary.value = '#5A636A'
    return
  }

  const navbarHeight = document.querySelector('header').offsetHeight
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
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Navbar linklerine tıklayınca yumuşak ve kontrollü scroll
function scrollToSection(event, selector) {
  event.preventDefault()
  const element = document.querySelector(selector)
  if (!element) return

  const headerOffset = document.querySelector('header').offsetHeight
  const elementPosition = element.offsetTop
  const offsetPosition = elementPosition - headerOffset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

const menuOpen = ref(false)

// Zıt renk hesaplayıcı fonksiyon
function getContrastColor(hexcolor) {
  hexcolor = hexcolor.replace('#', '');
  if (hexcolor.length === 3) {
    hexcolor = hexcolor.split('').map(c => c + c).join('');
  }
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 125 ? '#000000' : '#FFFFFF';
}

const navbarTextColorComputed = computed(() => getContrastColor(navbarBgColor.value))
</script>

<template>
  <main class="font-sans min-h-screen">

    <!-- Navbar -->
    <header :style="{ backgroundColor: navbarBgColor }"
      class="fixed top-0 left-0 w-full z-40 transition-colors duration-300">
      <div class="max-w-6xl mx-auto flex justify-between items-center p-4 md:p-6">
        <h1 class="text-xl md:text-2xl font-extrabold transition-colors duration-300 select-none"
          :style="{ color: navbarTextColorComputed }">
          Döşemeci
        </h1>

        <!-- Hamburger Button -->
        <button @click="menuOpen = !menuOpen" class="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            :style="{ color: navbarTextColorComputed }">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Desktop Menu -->
        <nav class="hidden md:block">
          <ul :style="{ color: navbarTextColorComputed }"
            class="flex space-x-6 font-medium transition-colors duration-300">
            <li><a href="#hakkimizda" @click="scrollToSection($event, '#hakkimizda')"
                class="hover:opacity-70 transition">Hakkımızda</a></li>
            <li><a href="#hizmetler" @click="scrollToSection($event, '#hizmetler')"
                class="hover:opacity-70 transition">Hizmetler</a></li>
            <li><a href="#projeler" @click="scrollToSection($event, '#projeler')"
                class="hover:opacity-70 transition">Projeler</a></li>
            <li><a href="#referanslar" @click="scrollToSection($event, '#referanslar')"
                class="hover:opacity-70 transition">Referanslar</a></li>
            <li><a href="#yorumlar" @click="scrollToSection($event, '#yorumlar')"
                class="hover:opacity-70 transition">Yorumlar</a></li>
            <li><a href="#sss" @click="scrollToSection($event, '#sss')" class="hover:opacity-70 transition">Sık
                Sorulanlar</a></li>
            <li><a href="#iletisim" @click="scrollToSection($event, '#iletisim')"
                class="hover:opacity-70 transition">İletişim</a></li>
          </ul>
        </nav>
      </div>

      <!-- Mobile Menu -->
      <nav v-if="menuOpen" class="md:hidden" :style="{ backgroundColor: navbarBgColor }">
        <ul :style="{ color: navbarTextColorComputed }"
          class="flex flex-col space-y-4 p-4 font-medium transition-colors duration-300">
          <li><a href="#hakkimizda" @click="scrollToSection($event, '#hakkimizda'); menuOpen = false"
              class="hover:opacity-70 transition">Hakkımızda</a></li>
          <li><a href="#hizmetler" @click="scrollToSection($event, '#hizmetler'); menuOpen = false"
              class="hover:opacity-70 transition">Hizmetler</a></li>
          <li><a href="#projeler" @click="scrollToSection($event, '#projeler'); menuOpen = false"
              class="hover:opacity-70 transition">Projeler</a></li>
          <li><a href="#referanslar" @click="scrollToSection($event, '#referanslar'); menuOpen = false"
              class="hover:opacity-70 transition">Referanslar</a></li>
          <li><a href="#yorumlar" @click="scrollToSection($event, '#yorumlar'); menuOpen = false"
              class="hover:opacity-70 transition">Yorumlar</a></li>
          <li><a href="#sss" @click="scrollToSection($event, '#sss'); menuOpen = false"
              class="hover:opacity-70 transition">Sık Sorulanlar</a></li>
          <li><a href="#iletisim" @click="scrollToSection($event, '#iletisim'); menuOpen = false"
              class="hover:opacity-70 transition">İletişim</a></li>
        </ul>
      </nav>
    </header>

    <!-- Hero -->
    <section data-color="#0D1F23" class="pt-28 h-[110vh] bg-center bg-cover bg-no-repeat"
      style="background-image: url('https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1470&q=80');">
    </section>

    <!-- Hakkımızda -->
    <section id="hakkimizda" data-color="#0D1F23"
      class="flex flex-col justify-center items-center min-h-screen px-6 text-center bg-gradient-to-b from-[#0D1F23] to-[#162A2F] text-[#AFB3B7]">

      <h3
        class="text-4xl md:text-5xl font-bold mb-6 tracking-tight relative text-transparent bg-clip-text bg-gradient-to-r from-[#B58863] to-[#d3a87c]">
        Hakkımızda
        <span class="block w-24 h-[3px] bg-gradient-to-r from-[#B58863] to-[#d3a87c] mx-auto mt-3 rounded-full"></span>
      </h3>

      <p class="max-w-3xl text-lg leading-relaxed mb-10 text-[#AFB3B7]">
        20 yıllık tecrübemizle müşteri memnuniyetini odakta tutuyor, estetik ve konforlu yaşam alanları yaratıyoruz.
        Usta ekiplerimiz ile koltuk, sandalye, ofis ve cafe döşemelerinde modern çözümler sağlıyoruz.
        Her projede kaliteli malzeme, işçilik ve tasarımı bir araya getirerek, alanlarınızı uzun ömürlü, kullanışlı ve
        şık hale getiriyoruz.
        Yıllar içerisinde yüzlerce mutlu müşteri ve proje ile sektörde güvenilir bir marka haline geldik.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl w-full px-2">
        <div class="bg-[#132E35]/80 rounded-2xl p-6 md:p-8 shadow-xl border border-[#1f3b43] backdrop-blur-sm
             transition duration-500 ease-in-out
             hover:-translate-y-2 hover:border-[#B58863] hover:shadow-[0_0_15px_3px_rgba(181,136,99,0.6)]">
          <div class="absolute inset-0 rounded-2xl border border-[#B58863]/20 pointer-events-none"></div>
          <h4 class="text-xl font-semibold mb-2 text-[#B58863]">Misyonumuz</h4>
          <p>
            Müşterilerimizin yaşam alanlarına değer katan, estetik ve konforu bir arada sunan kaliteli döşeme hizmetleri
            sağlamak.
          </p>
        </div>

        <div class="bg-[#132E35]/80 rounded-2xl p-6 md:p-8 shadow-xl border border-[#1f3b43] backdrop-blur-sm
             transition duration-500 ease-in-out
             hover:-translate-y-2 hover:border-[#B58863] hover:shadow-[0_0_15px_3px_rgba(181,136,99,0.6)]">
          <div class="absolute inset-0 rounded-2xl border border-[#B58863]/20 pointer-events-none"></div>
          <h4 class="text-xl font-semibold mb-2 text-[#B58863]">Vizyonumuz</h4>
          <p>
            Türkiye’nin her yerinde güvenilir, modern ve müşteri odaklı döşeme çözümleri ile lider marka olmak.
          </p>
        </div>

        <div class="bg-[#132E35]/80 rounded-2xl p-6 md:p-8 shadow-xl border border-[#1f3b43] backdrop-blur-sm
             transition duration-500 ease-in-out
             hover:-translate-y-2 hover:border-[#B58863] hover:shadow-[0_0_15px_3px_rgba(181,136,99,0.6)]">
          <div class="absolute inset-0 rounded-2xl border border-[#B58863]/20 pointer-events-none"></div>
          <h4 class="text-xl font-semibold mb-2 text-[#B58863]">Değerlerimiz</h4>
          <p>
            Kalite, güven, müşteri memnuniyeti ve sürdürülebilirlik ilkeleri ile hareket ederek her projede yüksek
            standartlar sunmak.
          </p>
        </div>

        <div class="bg-[#132E35]/80 rounded-2xl p-6 md:p-8 shadow-xl border border-[#1f3b43] backdrop-blur-sm
             transition duration-500 ease-in-out
             hover:-translate-y-2 hover:border-[#B58863] hover:shadow-[0_0_15px_3px_rgba(181,136,99,0.6)]">
          <div class="absolute inset-0 rounded-2xl border border-[#B58863]/20 pointer-events-none"></div>
          <h4 class="text-xl font-semibold mb-2 text-[#B58863]">Tecrübemiz</h4>
          <p>
            20 yıllık sektörel tecrübemizle, klasik ve modern döşeme uygulamalarını birleştirerek müşterilerimizin
            taleplerine özel çözümler üretiyoruz.
          </p>
        </div>
      </div>
    </section>

    <!-- Hizmetlerimimz -->
    <section id="hizmetler" data-color="#698180"
      class="flex flex-col justify-center items-center min-h-screen px-6 bg-[#698180] text-[#0D1F23] py-24">

      <h3 class="text-5xl font-extrabold mb-20 text-[#132E35] drop-shadow-lg tracking-wide select-none">
        Hizmetlerimiz
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-20 max-w-7xl w-full">

        <div class="relative bg-[#AFB3B7] rounded-2xl p-10 flex flex-col items-center text-center cursor-pointer shadow-xl border border-[#1f3b43] backdrop-blur-sm
             transition duration-500 ease-in-out
             hover:-translate-y-2 hover:border-[#B58863] hover:shadow-[0_0_15px_3px_rgba(181,136,99,0.6)]">
          <div class="absolute inset-0 rounded-2xl border border-[#B58863]/20 pointer-events-none"></div>
          <div
            class="bg-[#132E35] text-[#B58863] rounded-full p-6 mb-8 flex items-center justify-center w-24 h-24 drop-shadow-xl flex-shrink-0 transition-colors duration-300 group-hover:bg-[#B58863] group-hover:text-[#132E35]"
            style="transform-origin:center center;">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              width="800px" height="800px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve"
              fill="#ae835f" stroke="#ae835f" stroke-width="0.00032" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0,-4)"> <!-- yukarı 2 birim kaydırdım, ihtiyaca göre değiştir -->
                <path
                  d="M29,18.18V15.34A3.35,3.35,0,0,0,25.66,12H18.34A3.34,3.34,0,0,0,16,13a3.34,3.34,0,0,0-2.34-1H6.34A3.35,3.35,0,0,0,3,15.34v2.84A3,3,0,0,0,1,21v7a1,1,0,0,0,1,1H3v1a1,1,0,0,0,2,0V29H27v1a1,1,0,0,0,2,0V29h1a1,1,0,0,0,1-1V21a3,3,0,0,0-2-2.82ZM18.34,14h7.32A1.34,1.34,0,0,1,27,15.34v2.83l-.07,0a2.86,2.86,0,0,0-.43.21l-.15.08a2.68,2.68,0,0,0-.49.4l-.09.12a2.88,2.88,0,0,0-.3.39l-.11.19a2.2,2.2,0,0,0-.17.39.61.61,0,0,0-.05.12h-.08a2.39,2.39,0,0,0-.66-.1H17V15.34A1.34,1.34,0,0,1,18.34,14ZM7,22.6a.6.6,0,0,1,.6-.6H15v1H7ZM17,22h7.4a.6.6,0,0,1,.6.6V23H17ZM5,15.34A1.34,1.34,0,0,1,6.34,14h7.32A1.34,1.34,0,0,1,15,15.34V20H7.6a2.84,2.84,0,0,0-.66.09l-.07,0s0-.07,0-.11a3.89,3.89,0,0,0-.19-.42l-.09-.17a2.93,2.93,0,0,0-.41-.52,2.74,2.74,0,0,0-.5-.4s-.12-.06-.17-.1a3.49,3.49,0,0,0-.39-.19l-.07,0ZM3,21a1,1,0,0,1,1-1,1,1,0,0,1,.71.31A.93.93,0,0,1,5,21v6H3Zm4,4H25v2H7Zm22,2H27V21a1,1,0,0,1,1-1,1,1,0,0,1,.71.31A.93.93,0,0,1,29,21Z" />
              </g>
            </svg>



          </div>
          <h4
            class="text-3xl font-bold mb-6 text-[#132E35] tracking-tight transition-colors duration-300 group-hover:text-[#B58863]">
            Koltuk Döşeme
          </h4>
          <p class="text-[#0D1F23] text-lg mb-10 leading-relaxed max-w-md">
            Koltuklarınızı yenilemek için dayanıklı ve estetik kumaş seçenekleri sunuyor, usta işçilikle uzun ömürlü
            çözümler sağlıyoruz. Konfor ve şıklığı bir arada yakalayın.
          </p>
          <ul class="list-disc list-inside text-[#132E35] max-w-md space-y-3 text-left">
            <li>Özel renk ve doku seçenekleri</li>
            <li>Yüksek kalite kumaş ve sünger</li>
            <li>Garanti kapsamında profesyonel işçilik</li>
          </ul>
        </div>

        <div class="relative bg-[#AFB3B7] rounded-2xl p-10 flex flex-col items-center text-center cursor-pointer shadow-xl border border-[#1f3b43] backdrop-blur-sm
             transition duration-500 ease-in-out
             hover:-translate-y-2 hover:border-[#B58863] hover:shadow-[0_0_15px_3px_rgba(181,136,99,0.6)]">
          <div class="absolute inset-0 rounded-2xl border border-[#B58863]/20 pointer-events-none"></div>
          <div
            class="bg-[#132E35] text-[#B58863] rounded-full p-6 mb-8 flex items-center justify-center w-24 h-24 drop-shadow-xl flex-shrink-0 transition-colors duration-300 group-hover:bg-[#B58863] group-hover:text-[#132E35]"
            style="transform-origin:center center;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"
              class="h-12 w-12 mx-auto block transition-transform duration-300 group-hover:scale-110 group-hover:stroke-[#132E35]"
              viewBox="0 0 24 24" style="transform-origin:center center;">
              <path d="M6 3v13"></path>
              <path d="M18 3v13"></path>
              <path d="M3 16h18"></path>
              <path d="M12 16v5"></path>
              <path d="M8 21h8"></path>
            </svg>
          </div>
          <h4
            class="text-3xl font-bold mb-6 text-[#132E35] tracking-tight transition-colors duration-300 group-hover:text-[#B58863]">
            Sandalye Döşeme
          </h4>
          <p class="text-[#0D1F23] text-lg mb-10 leading-relaxed max-w-md">
            Eski sandalyelerinizi yenilemek için rustik ve modern tarzda döşeme çözümleri sunuyoruz. Konforlu ve şık
            sandalyeler.
          </p>
          <ul class="list-disc list-inside text-[#132E35] max-w-md space-y-3 text-left">
            <li>Özel kumaş ve renk seçenekleri</li>
            <li>Dayanıklı malzeme kullanımı</li>
            <li>Profesyonel işçilik</li>
          </ul>
        </div>

        <div class="relative bg-[#AFB3B7] rounded-2xl p-10 flex flex-col items-center text-center cursor-pointer shadow-xl border border-[#1f3b43] backdrop-blur-sm
             transition duration-500 ease-in-out
             hover:-translate-y-2 hover:border-[#B58863] hover:shadow-[0_0_15px_3px_rgba(181,136,99,0.6)]">
          <div class="absolute inset-0 rounded-2xl border border-[#B58863]/20 pointer-events-none"></div>
          <div
            class="bg-[#132E35] text-[#B58863] rounded-full p-6 mb-8 flex items-center justify-center w-24 h-24 drop-shadow-xl flex-shrink-0 transition-colors duration-300 group-hover:bg-[#B58863] group-hover:text-[#132E35]"
            style="transform-origin:center center;">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              width="800px" height="800px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
              <path fill="#B58863"
                d="M15,15.5c0-0.276,0.224-0.5,0.5-0.5h8c0.276,0,0.5,0.224,0.5,0.5l0,0c0,0.276-0.224,0.5-0.5,0.5h-8C15.224,16,15,15.776,15,15.5L15,15.5z" />
              <path fill="#B58863" d="M22.89,17c-0.51,4.8-2.939,8.08-7.01,8.83c-3.94-0.84-6.29-4.1-6.78-8.83H22.89z" />
              <path fill="#B58863" d="M19.934,3.22c-0.16-0.22-0.469-0.29-0.699-0.14c-0.23,0.16-0.289,0.47-0.141,0.7
                c1.17,1.75,1.121,3.21,0.301,4.17c-0.25,0.3-0.471,0.49-0.811,0.7c-0.459,0.27-0.939,0.56-1.25,1.09c-0.51,0.88-0.43,1.95,0.23,3.02
	              c0.09,0.16,0.25,0.24,0.42,0.24l0.26-0.07c0.24-0.15,0.311-0.46,0.17-0.69c-0.33-0.53-0.631-1.3-0.219-2
	c0.189-0.31,0.52-0.51,0.898-0.73c0.381-0.23,0.701-0.49,1.061-0.91C21.514,7.01,21.094,4.96,19.934,3.22z" />
              <path fill="#B58863"
                d="M14.904,2.21c-0.15-0.22-0.47-0.28-0.69-0.12c-0.23,0.16-0.28,0.47-0.12,0.7c0.5,0.72,1.01,1.84,0.89,2.8
	c-0.13,1.09-0.96,1.33-2.38,1.64c-0.43,0.1-0.86,0.19-1.27,0.33c-1.21,0.42-1.93,1.08-2.19,2.02c-0.31,1.07-0.11,2.36,0.49,3.21
	c0.1,0.14,0.25,0.21,0.41,0.21c0.1,0,0.2-0.03,0.29-0.09c0.23-0.16,0.28-0.47,0.12-0.7c-0.42-0.59-0.57-1.58-0.35-2.36
	c0.17-0.61,0.67-1.04,1.56-1.35c0.35-0.12,0.74-0.2,1.15-0.29c1.33-0.29,2.93-0.65,3.17-2.5C16.165,4.14,15.205,2.63,14.904,2.21z" />
              <path fill="#B58863" d="M18.93,3.22C18.77,3,18.46,2.93,18.23,3.08C18,3.24,17.94,3.55,18.09,3.78c1.17,1.75,1.12,3.21,0.3,4.17
	c-0.25,0.3-0.47,0.49-0.81,0.7c-0.46,0.27-0.94,0.56-1.25,1.09c-0.51,0.88-0.43,1.95,0.23,3.02c0.09,0.16,0.25,0.24,0.42,0.24
	l0.26-0.07c0.24-0.15,0.31-0.46,0.17-0.69c-0.33-0.53-0.63-1.3-0.22-2c0.189-0.31,0.52-0.51,0.899-0.73
	c0.38-0.23,0.7-0.49,1.061-0.91C20.51,7.01,20.09,4.96,18.93,3.22z" />
              <path fill="#B58863"
                d="M13.9,2.21c-0.15-0.22-0.47-0.28-0.69-0.12c-0.23,0.16-0.28,0.47-0.12,0.7c0.5,0.72,1.01,1.84,0.89,2.8
	c-0.13,1.09-0.96,1.33-2.38,1.64c-0.43,0.1-0.86,0.19-1.27,0.33C9.12,7.98,8.4,8.64,8.14,9.58c-0.31,1.07-0.11,2.36,0.49,3.21
	C8.73,12.93,8.88,13,9.04,13c0.1,0,0.2-0.03,0.29-0.09c0.23-0.16,0.28-0.47,0.12-0.7c-0.42-0.59-0.57-1.58-0.35-2.36
	c0.17-0.61,0.67-1.04,1.56-1.35c0.35-0.12,0.74-0.2,1.15-0.29c1.33-0.29,2.93-0.65,3.17-2.5C15.16,4.14,14.2,2.63,13.9,2.21z" />
              <g>
                <path fill="#B58863" d="M23.97,16.01C23.98,15.68,24,15.35,24,15c0-0.55-0.45-1-1-1H5c-0.55,0-1,0.45-1,1c0,5.59,2.08,9.33,5.47,11
		H9c-0.28,0-0.5,0.22-0.5,0.5S8.72,27,9,27h10c0.28,0,0.5-0.22,0.5-0.5S19.28,26,19,26h-0.47c0.56-0.28,1.09-0.61,1.58-1
		c6.83-0.04,7.949-3.72,7.949-5.5C28.06,17.08,26.49,16.07,23.97,16.01z M14,26c-5.8,0-9-4.37-9-11h18c0,1.45-0.15,2.79-0.46,4H16.5
		c-0.28,0-0.5,0.22-0.5,0.5s0.22,0.5,0.5,0.5h5.75c-0.24,0.73-0.55,1.4-0.91,2H17.5c-0.28,0-0.5,0.22-0.5,0.5s0.22,0.5,0.5,0.5h3.16
		C19.14,24.91,16.89,26,14,26z M21.21,23.95c1.46-1.67,2.39-4,2.68-6.95c2.721,0.05,3.051,1.23,3.051,2.5
		C26.94,20.28,26.69,23.48,21.21,23.95z" />
              </g>
              <rect x="5" y="16" fill="#B58863" width="18" height="1" />
            </svg>

          </div>
          <h4
            class="text-3xl font-bold mb-6 text-[#132E35] tracking-tight transition-colors duration-300 group-hover:text-[#B58863]">
            Cafe ve Ofis Döşeme
          </h4>
          <p class="text-[#0D1F23] text-lg mb-10 leading-relaxed max-w-md">
            Kafe, restoran ve ofis koltuklarınızı yenileyerek dayanıklı ve şık tasarımlar sunuyoruz.
          </p>
          <ul class="list-disc list-inside text-[#132E35] max-w-md space-y-3 text-left">
            <li>Kolay temizlenebilir kumaş</li>
            <li>Modern tasarımlar</li>
            <li>Hızlı teslimat</li>
          </ul>
        </div>

      </div>
    </section>

    <!-- Projeler -->
    <section id="projeler" data-color="#132E35"
      class="bg-[#132E35] text-[#B58863] min-h-screen py-24 px-4 sm:px-6 flex flex-col justify-center items-center">

      <h3 class="text-5xl font-extrabold mb-16 select-none">Projelerimiz</h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">

        <div v-for="(project, index) in projects" :key="index"
          class="group relative cursor-pointer overflow-hidden rounded-3xl border border-[#B58863]/30 shadow-lg shadow-black/30
             transition-transform duration-500 ease-in-out
             hover:scale-105 hover:-translate-y-2 hover:border-[#B58863] hover:shadow-[0_0_15px_3px_rgba(181,136,99,0.6)]">

          <!-- Image -->
          <img :src="project.image" :alt="project.title" @click="openModal(project.largeImage)"
            class="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1" />

          <!-- Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
            <div class="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              <span
                class="inline-block bg-[#B58863] text-[#132E35] text-xs font-semibold px-3 py-1 rounded-full mb-2 select-none">
                {{ project.category || 'Kategori' }}
              </span>
              <h4 class="text-lg font-bold text-white">{{ project.title }}</h4>
              <p class="text-sm text-white/80 mt-1 line-clamp-2">{{ project.description }}</p>
              <button @click="openModal(project.largeImage)"
                class="mt-3 bg-[#B58863] hover:bg-[#a67c4f] text-[#132E35] px-4 py-2 rounded-md font-semibold transition-transform transform hover:scale-105">
                İncele
              </button>
            </div>
          </div>
        </div>

      </div>

      <div v-if="!allProjectsLoaded" class="mt-12 text-center">
        <button @click="loadMoreProjects"
          class="bg-[#B58863] hover:bg-[#A67C4F] px-6 py-3 rounded-md font-semibold transition-transform transform hover:scale-105">
          Daha Fazla Yükle
        </button>
      </div>

    </section>

    <!-- Referanslar -->
    <section id="referanslar" class="bg-[#AFB3B7] py-24 px-6 min-h-screen flex flex-col items-center justify-center">
      <div class="max-w-7xl w-full">
        <h3 class="text-4xl sm:text-5xl font-extrabold mb-12 text-[#132E35] select-none text-center">
          Referanslarımız
        </h3>

        <div class="relative">

          <!-- Scrollable Container -->
          <div ref="scrollContainer" class="overflow-x-auto scroll-smooth no-scrollbar py-6" tabindex="0">
            <div class="flex space-x-6">
              <div v-for="(ref, idx) in references" :key="idx"
                class="flex-shrink-0 w-40 sm:w-48 md:w-52 rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                role="img" :aria-label="'Referans ' + ref.name" tabindex="0">
                <img :src="ref.image" :alt="ref.name" class="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>

          <!-- Sol Kaydırma Butonu -->
          <button @click="scrollLeft" aria-label="Sol Kaydır"
            class="absolute top-1/2 left-2 -translate-y-1/2 bg-[#132E35] text-[#B58863] rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-[#B58863] hover:text-[#132E35] transition z-20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Sağ Kaydırma Butonu -->
          <button @click="scrollRight" aria-label="Sağ Kaydır"
            class="absolute top-1/2 right-2 -translate-y-1/2 bg-[#132E35] text-[#B58863] rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-[#B58863] hover:text-[#132E35] transition z-20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>
      </div>
    </section>

    <!-- Yorumlar -->
    <section id="yorumlar" data-color="#132E35"
      class="bg-[#132E35] text-[#D4C495] flex flex-col items-center justify-center min-h-screen py-24 px-6">
      <div class="max-w-7xl w-full">
        <h3 class="text-4xl font-extrabold mb-12 select-none text-center tracking-wide text-[#B58863]">Müşteri Yorumları
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="group relative cursor-pointer overflow-hidden rounded-3xl border border-[#B58863]/30 shadow-lg shadow-black/30
         transition duration-500 ease-in-out
         hover:scale-105 hover:-translate-y-2 hover:border-[#B58863] hover:shadow-[0_0_15px_3px_rgba(181,136,99,0.6)]
         max-w-xs p-5 flex flex-col items-center text-center mx-auto">

            <!-- Profil Fotoğrafı -->
            <img :src="testimonial.image" :alt="testimonial.name"
              class="w-20 h-20 rounded-full object-cover border-2 border-[#B58863] mb-4 shadow-sm" />

            <!-- Yorum Metni -->
            <p class="text-[#D4C495] italic text-sm leading-relaxed mb-5 font-serif select-text">&quot;{{
              testimonial.comment }}&quot;</p>

            <!-- Yıldız Puan -->
            <div class="flex justify-center space-x-1 mb-3">
              <template v-for="starIndex in 5" :key="starIndex">
                <svg v-if="starIndex <= testimonial.rating" xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-[#B58863]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.785.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.957z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#7a6f44]" fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.785.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.957z" />
                </svg>
              </template>
            </div>

            <!-- İsim -->
            <h4 class="text-[#B58863] font-semibold text-base tracking-wide select-text">{{ testimonial.name }}</h4>
          </div>

        </div>
      </div>
    </section>

    <!-- Sıkça Sorulan Sorular -->
    <section id="sss" data-color="#698180"
      class="bg-[#698180] text-[#0D1F23] px-6 flex flex-col items-center pt-24 min-h-screen">
      <h3 class="text-5xl font-extrabold mb-16 select-none">Sıkça Sorulan Sorular</h3>
      <div class="max-w-4xl w-full space-y-6">
        <div v-for="(faq, index) in faqs" :key="index" class="bg-[#AFB3B7] rounded-xl p-6 cursor-pointer select-none"
          @click="toggleFaq(index)" @keyup.enter.space="toggleFaq(index)" tabindex="0" role="button"
          :aria-expanded="faqOpen === index ? 'true' : 'false'">
          <h4 class="font-semibold text-xl mb-2 flex justify-between items-center">
            {{ faq.q }}
            <span class="ml-4 text-[#132E35] transition-transform duration-300"
              :class="{ 'rotate-180': faqOpen === index }" aria-hidden="true">&#x25BC;</span>
          </h4>
          <p v-show="faqOpen === index" class="mt-2 text-[#132E35] leading-relaxed">
            {{ faq.a }}
          </p>
        </div>
      </div>
    </section>


    <!-- İletişim -->
 <section
  id="iletisim"
  data-color="#0D1F23"
  class="bg-[#0D1F23] text-[#AFB3B7] py-24 px-4 min-h-screen flex flex-col justify-center items-center"
>
  <h3 class="text-4xl sm:text-5xl font-extrabold mb-12 select-none text-center">İletişim</h3>

  <div class="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">

    <!-- Bilgi Kartı -->
    <div
      class="bg-[#132E35] rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col justify-center space-y-10
             border border-[#B58863]/30 hover:border-[#B58863] hover:shadow-[0_10px_20px_rgba(181,136,99,0.5)]
             transform transition duration-500 ease-in-out hover:scale-[1.03] cursor-default"
    >
      <div class="flex items-center space-x-6 sm:space-x-8">
        <h4
          class="text-2xl sm:text-3xl font-semibold mb-3 border-b-4 border-[#B58863] inline-block pb-2 w-36 sm:w-40"
        >
          Adres
        </h4>
        <p class="text-base sm:text-lg leading-relaxed max-w-md">
          Atatürk Mah. Döşemeci Sok. No:12, İstanbul, Türkiye
        </p>
      </div>

      <div class="flex items-center space-x-6 sm:space-x-8">
        <h4
          class="text-2xl sm:text-3xl font-semibold mb-3 border-b-4 border-[#B58863] inline-block pb-2 w-36 sm:w-40"
        >
          Telefon
        </h4>
        <a
          href="tel:+905551234567"
          class="inline-block mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#B58863] to-[#a97d45]
                 text-[#132E35] font-semibold shadow-lg hover:from-[#a97d45] hover:to-[#876734]
                 transition duration-300 ease-in-out text-sm sm:text-base"
        >
          +90 555 123 45 67
        </a>
      </div>

      <div class="flex items-center space-x-6 sm:space-x-8">
        <h4
          class="text-2xl sm:text-3xl font-semibold mb-3 border-b-4 border-[#B58863] inline-block pb-2 w-36 sm:w-40"
        >
          E-posta
        </h4>
        <a
          href="mailto:info@dosemeci.com.tr"
          class="inline-block mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#B58863] to-[#a97d45]
                 text-[#132E35] font-semibold shadow-lg hover:from-[#a97d45] hover:to-[#876734]
                 transition duration-300 ease-in-out text-sm sm:text-base"
        >
          info@dosemeci.com.tr
        </a>
      </div>

      <!-- WhatsApp Butonu -->
      <div class="flex items-center space-x-6 sm:space-x-8">
        <h4
          class="text-2xl sm:text-3xl font-semibold mb-3 border-b-4 border-[#B58863] inline-block pb-2 w-36 sm:w-40"
        >
          WhatsApp
        </h4>
        <a
          href="https://wa.me/905551234567"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E]
                 text-white font-semibold shadow-lg hover:from-[#128C7E] hover:to-[#075E54]
                 transition duration-300 ease-in-out text-sm sm:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-3"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M20.52 3.48a11.84 11.84 0 0 0-16.76 0 11.84 11.84 0 0 0-3.48 8.43c0 2.06.52 4.08 1.5 5.9L2 22l4.26-1.2a11.8 11.8 0 0 0 5.93 1.5h.01a11.84 11.84 0 0 0 8.43-3.48 11.87 11.87 0 0 0 3.48-8.44 11.86 11.86 0 0 0-3.49-8.43Zm-8.57 14.67a8.49 8.49 0 0 1-4.56-1.32l-.32-.2-3.04.86.81-3-.21-.31a8.52 8.52 0 0 1 1.24-11.52 8.51 8.51 0 0 1 12.02 0 8.49 8.49 0 0 1 1.23 11.53 8.48 8.48 0 0 1-8.93 2.95Z"
            />
          </svg>
          Mesaj Gönder
        </a>
      </div>
    </div>

    <!-- Harita -->
    <div
      class="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#B58863]/50 hover:border-[#B58863]
             transition-colors duration-400 mt-14 md:mt-0 min-h-[300px] md:min-h-[350px]"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12093.456823108488!2d28.9783584!3d41.0082376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa3556e4c45f5%3A0x1b7e31606bb7e50d!2sAtat%C3%BCrk%20Mahallesi%2C%20D%C3%B6%C5%9Femeci%20Sk.%2C%20%C4%B0stanbul!5e0!3m2!1str!2str!4v1699400000000!5m2!1str!2str"
        width="100%"
        height="100%"
        class="w-full h-full"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</section>



    <!-- WhatsApp Sabit Buton -->
    <a href="https://wa.me/905551234567" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 bg-gradient-to-r from-[#25D366] to-[#128C7E] 
          text-white p-4 rounded-full shadow-lg flex items-center justify-center
          hover:from-[#128C7E] hover:to-[#075E54] transition duration-300" aria-label="WhatsApp ile mesaj gönder">

      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M20.52 3.48a11.84 11.84 0 0 0-16.76 0 11.84 11.84 0 0 0-3.48 8.43c0 2.06.52 4.08 1.5 5.9L2 22l4.26-1.2a11.8 11.8 0 0 0 5.93 1.5h.01a11.84 11.84 0 0 0 8.43-3.48 11.87 11.87 0 0 0 3.48-8.44 11.86 11.86 0 0 0-3.49-8.43Zm-8.57 14.67a8.49 8.49 0 0 1-4.56-1.32l-.32-.2-3.04.86.81-3-.21-.31a8.52 8.52 0 0 1 1.24-11.52 8.51 8.51 0 0 1 12.02 0 8.49 8.49 0 0 1 1.23 11.53 8.48 8.48 0 0 1-8.93 2.95Z" />
      </svg>
    </a>


    <!-- Footer -->
    <footer class="bg-[#132E35] text-[#B58863] py-10 flex flex-col items-center justify-center">
      <p class="mb-2">&copy; 2025 Döşemeci. Tüm hakları saklıdır.</p>
      <p>Designed with ♥ by Lukafencel</p>
    </footer>

    <!-- Modal -->
    <div v-if="showModal" @click.self="closeModal"
      class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer">
      <img :src="modalImage" alt="Büyütülmüş proje" class="max-w-full max-h-full rounded-lg shadow-lg cursor-auto" />
    </div>
  </main>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

/* Tailwind sınıfıyla gradient border için */
.hover\:border-gradient-custom:hover {
  border-image-slice: 1;
  border-width: 2px;
  border-image-source: linear-gradient(90deg, #B58863, #d3a87c);
  border-radius: 1rem;
  border-style: solid;
  border-image-repeat: stretch;
}
</style>
