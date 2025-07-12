<script setup>
import { ref, onMounted, onUnmounted } from 'vue'


const faqOpen = ref(null)

function toggleFaq(index) {
  faqOpen.value = faqOpen.value === index ? null : index
}

const faqs = ref([
  { q: "Hangi malzemeleri kullanıyorsunuz?", a: "Sadece kaliteli ve dayanıklı kumaş ve sünger kullanıyoruz." },
  { q: "Teslim süresi ne kadar?", a: "Genellikle 5-7 iş günü içerisinde teslim ediyoruz." },
  { q: "Nakliye hizmetiniz var mı?", a: "Evet, şehir içi ücretsiz nakliye hizmetimiz mevcuttur." },
  { q: "Fiyatlandırma nasıl yapılıyor?", a: "Ürün modeline ve kumaş seçimine göre fiyat belirlenir." },
  { q: "Özel tasarım ürün siparişi verebilir miyim?", a: "Evet, özel tasarım talepleriniz için bizimle iletişime geçebilirsiniz. Size özel çözümler sunuyoruz." },
  { q: "Ödeme seçenekleriniz nelerdir?", a: "Kredi kartı, banka havalesi ve kapıda ödeme seçeneklerimiz mevcuttur." }
])

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

  const mobileMenuBgColor = computed(() =>
    navbarBgColor.value === 'transparent' ? '#FFFFFF' : navbarBgColor.value
  )
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

  if (menuOpen.value) {
    // Menü açıksa önce kapat
    menuOpen.value = false

    // Menü animasyonu tamamlanınca scroll yap
    setTimeout(() => {
      const element = document.querySelector(selector)
      if (!element) return

      const headerOffset = document.querySelector('header').offsetHeight
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }, 350) // menünün kapanma animasyon süresi kadar beklet
  } else {
    // Menü kapalıysa hemen scroll yap
    const element = document.querySelector(selector)
    if (!element) return

    const headerOffset = document.querySelector('header').offsetHeight
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}


const menuOpen = ref(false)

// Zıt renk hesaplayıcı fonksiyon
function getContrastColor(hexcolor) {

  console.log(hexcolor)
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
        <h1
          class="text-xl md:text-2xl font-extrabold transition-colors duration-300 select-none cursor-pointer flex items-center gap-2"
          :style="{ color: navbarTextColorComputed }">
          <img src="/public/muğla döşeme.png" alt="Logo" class="h-9 md:h-12 object-contain" />
          <a href="#top" @click="scrollToSection($event, '#top')" class="hover:opacity-80 transition">Yıldırım
            Döşeme</a>
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
            <!--
                  <li><a href="#referanslar" @click="scrollToSection($event, '#referanslar')"
                    class="hover:opacity-70 transition">Referanslar</a></li>
                    <li><a href="#yorumlar" @click="scrollToSection($event, '#yorumlar')"
                      class="hover:opacity-70 transition">Yorumlar</a></li>
                      -->
            <li><a href="#sss" @click="scrollToSection($event, '#sss')" class="hover:opacity-70 transition">Sık
                Sorulanlar</a></li>
            <li><a href="#iletisim" @click="scrollToSection($event, '#iletisim')"
                class="hover:opacity-70 transition">İletişim</a></li>
          </ul>
        </nav>
      </div>

      <!-- Mobile Menu -->
      <nav v-if="menuOpen" class="md:hidden"
        :style="{ backgroundColor: navbarBgColor === 'transparent' ? '#0D1F23' : navbarBgColor }">
        <ul :style="{ color: navbarTextColorComputed }"
          class="flex flex-col space-y-4 p-4 font-medium transition-colors duration-300">
          <li><a href="#hakkimizda" @click="scrollToSection($event, '#hakkimizda')"
              class="hover:opacity-70 transition">Hakkımızda</a></li>
          <li><a href="#hizmetler" @click="scrollToSection($event, '#hizmetler')"
              class="hover:opacity-70 transition">Hizmetler</a></li>
          <li><a href="#projeler" @click="scrollToSection($event, '#projeler')"
              class="hover:opacity-70 transition">Projeler</a></li>
          <!--
                <li><a href="#referanslar" @click="scrollToSection($event, '#referanslar')"
                  class="hover:opacity-70 transition">Referanslar</a></li>
                  <li><a href="#yorumlar" @click="scrollToSection($event, '#yorumlar')"
                    class="hover:opacity-70 transition">Yorumlar</a></li>
                    -->
          <li><a href="#sss" @click="scrollToSection($event, '#sss')" class="hover:opacity-70 transition">Sık
              Sorulanlar</a></li>
          <li><a href="#iletisim" @click="scrollToSection($event, '#iletisim')"
              class="hover:opacity-70 transition">İletişim</a></li>
        </ul>
      </nav>
    </header>

    <!-- hero -->
    <section id="top" class="relative pt-28 h-[110vh] bg-center bg-cover bg-no-repeat"
      style="background-image: url('/hero.png')">

      <div class="absolute left-6 md:left-4 max-w-2xl" style="top: 280px;">
        <h1 class="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white max-w-[18ch] leading-tight tracking-wide">
          Muğla Yatağan’da Yat, Koltuk ve Araç Döşeme Hizmeti
        </h1>
        <p class="mt-6 text-base md:text-lg lg:text-2xl font-semibold text-[#D4C29A] max-w-2xl leading-relaxed">
          Yıldırım Döşeme olarak Muğla Yatağan’da yat döşeme, koltuk döşeme, araç ve tekne döşeme hizmetlerini kaliteli
          işçilik ve uygun fiyat avantajıyla sunuyoruz. Aracınızı veya teknenizi yenilemek için hemen bizimle iletişime
          geçin.
        </p>
      </div>

      <div class="absolute left-6 md:left-4 flex space-x-4 md:space-x-6 z-10 buttons-container bottom-32 md:bottom-48">
        <a href="#hizmetler"
          class="bg-[#B58863] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#a0774d] transition shadow-lg md:px-8 md:py-5 md:text-lg">
          Hizmetlerimiz
        </a>
        <a href="#iletisim"
          class="bg-[#132E35] text-[#B58863] px-6 py-4 rounded-lg font-semibold border border-[#B58863] hover:bg-[#B58863] hover:text-white transition shadow-lg md:px-8 md:py-5 md:text-lg">
          İletişime Geçin
        </a>
      </div>

    </section>





    <!-- Hakkımızda -->
    <section id="hakkimizda" data-color="#0D1F23" class="flex flex-col justify-center items-center min-h-screen px-6 text-center bg-gradient-to-b from-[#0D1F23] to-[#162A2F] text-[#AFB3B7]
         pt-24 pb-24 sm:pt-0 sm:pb-0">

      <h3
        class="text-4xl md:text-5xl font-bold mb-6 tracking-tight relative text-transparent bg-clip-text bg-gradient-to-r from-[#B58863] to-[#d3a87c]">
        Hakkımızda
        <span class="block w-24 h-[3px] bg-gradient-to-r from-[#B58863] to-[#d3a87c] mx-auto mt-3 rounded-full"></span>
      </h3>

      <p class="max-w-3xl text-lg leading-relaxed mb-10 text-[#AFB3B7]">
        20 yıllık tecrübemizle müşteri memnuniyetini odakta tutuyor, estetik ve konforlu yaşam alanları yaratıyoruz.
        Usta ekiplerimiz ile Yat, Tekne, Tır, Kamyan, Araba, koltuk, sandalye, ofis ve cafe vb. döşemelerinde modern
        çözümler sağlıyoruz.
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
            Yat - Tekne Döşeme
          </h4>
          <p class="text-[#0D1F23] text-lg mb-10 leading-relaxed max-w-md">
            Yat ve tekne koltuklarınızı yenileyerek dayanıklı, estetik ve konforlu döşeme çözümleri sunuyoruz. Usta
            işçilikle uzun ömürlü ve şık bir görünüm sağlıyoruz.
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
            <svg fill="#ae835f" width="800" height="800" viewBox="0 -30.88 122.88 122.88"
              xmlns="http://www.w3.org/2000/svg" style="enable-background:new 0 0 122.88 61.11"
              transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)">
              <g>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M65.22,0h26.54h6.63c0.38,0,0.52,0.34,0.68,0.68l2.66,5.53c0.16,0.34-0.31,0.68-0.68,0.68H55.93
          C52.98,6.9,58.02,0,65.22,0L65.22,0z M23.83,45.74v3.74h3.74C27.12,47.65,25.67,46.19,23.83,45.74L23.83,45.74z
          M27.57,51.93h-3.74v3.74C25.67,55.22,27.12,53.77,27.57,51.93L27.57,51.93z M21.39,55.67v-3.74h-3.74
          C18.1,53.77,19.55,55.22,21.39,55.67L21.39,55.67z M17.64,49.49h3.74v-3.74C19.55,46.2,18.1,47.65,17.64,49.49L17.64,49.49z
          M90.05,45.74v3.74h3.74C93.34,47.65,91.89,46.19,90.05,45.74L90.05,45.74z M93.79,51.93h-3.74v3.74
          C91.89,55.22,93.34,53.77,93.79,51.93L93.79,51.93z M87.61,55.67v-3.74h-3.74C84.31,53.77,85.76,55.22,87.61,55.67L87.61,55.67z
          M83.86,49.49h3.74v-3.74C85.76,46.2,84.31,47.65,83.86,49.49L83.86,49.49z M89.66,12.77h3.52c5.08,0.23,7.17,0.05,9.19,1.59
          c2.5,1.91,3.48,10.35,4.52,14.25c0.07,0.26-0.23,0.5-0.5,0.5H90.88c-0.27,0-0.47-0.22-0.5-0.5l-1.22-15.35
          C89.14,13,89.39,12.77,89.66,12.77L89.66,12.77z M66.09,12.86h-11.5c-5.25,0-13.89,8.63-16.15,15.61
          c-0.11,0.34,0.29,0.65,0.65,0.65h25.18c0.36,0,0.6-0.29,0.65-0.65l1.83-14.96C66.78,13.15,66.44,12.86,66.09,12.86L66.09,12.86z
          M71.07,12.8h14.07c0.27,0,0.48,0.23,0.5,0.5l1.07,15.32c0.02,0.27-0.23,0.5-0.5,0.5H69.24c-0.27,0-0.53-0.23-0.5-0.5l1.83-15.32
          C70.6,13.02,70.79,12.8,71.07,12.8L71.07,12.8z M22.61,40.31c5.74,0,10.4,4.66,10.4,10.4c0,5.74-4.66,10.4-10.4,10.4
          c-5.74,0-10.4-4.66-10.4-10.4C12.21,44.97,16.87,40.31,22.61,40.31L22.61,40.31z M1.81,40.78c0.53-0.24,1.11-0.35,1.74-0.34
          c-0.03-3.28,0.19-6.14,0.95-8.17c0.28-1.17,0.79-2.02,1.47-2.64c2.14-1.91,21.25-3.59,25.28-4.11
          c4.95-4.84,10.46-9.27,16.33-13.46c1.63-1.38,3.96-2.06,6.9-2.13l46.41-0.04c3.51-0.02,6.21,1.48,7.93,4.85l3.87,11.15l0.88-0.24
          v-4.34c-0.16-1.45,0.41-2.17,1.52-2.35h5.2c1.43,0.06,2.44,0.78,2.6,2.85v15.42c0.01,1.59-0.57,2.63-2.04,2.85h-4.83
          c-0.48,0.11-0.33,0.48-0.37,0.99v5.26c-0.35,3.88-1.41,6.88-4.52,7.27h-9.41c0.2-4.56-0.66-8.29-2.75-11.08
          c-7.59-10.14-24.06-4.1-22.95,11.11H35.58c0.34-4.86-0.58-8.55-2.59-11.2c-7.57-9.99-25.18-4.6-23.1,11.51H3.64
          C-0.13,53.94-1.36,42.19,1.81,40.78L1.81,40.78z M88.83,40.31c5.74,0,10.4,4.66,10.4,10.4c0,5.74-4.66,10.4-10.4,10.4
          c-5.74,0-10.4-4.66-10.4-10.4C78.43,44.97,83.08,40.31,88.83,40.31L88.83,40.31z" />
              </g>
            </svg>
          </div>
          <h4
            class="text-3xl font-bold mb-6 text-[#132E35] tracking-tight transition-colors duration-300 group-hover:text-[#B58863]">
            Araç Döşeme
          </h4>
          <p class="text-[#0D1F23] text-lg mb-10 leading-relaxed max-w-md">
            Aracınızın iç mekanını yenileyerek konforlu, modern ve estetik bir görünüm kazandırıyoruz. Kaliteli malzeme
            ve işçilik ile sürüş keyfinizi artırıyoruz.
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
            <svg width="800px" height="800px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#ae835f">

              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

              <g id="SVGRepo_iconCarrier">

                <path fill="#ae835f"
                  d="M256 15.99c-8.8 0-16 14.33-16 32 0 8.47 1.7 16.59 4.7 22.57-4.7.21-9 1.16-13.7 2.43v15.85c17.1-2.42 34.1-2.31 50 0V72.99c-4.5-1.35-9.4-2.11-13.7-2.43 3-5.98 4.7-14.1 4.7-22.57 0-17.67-7.2-32-16-32zM86.23 86.28c-6.25 6.25-1.19 21.42 11.3 33.92 6.07 6 12.97 10.6 19.37 12.7-3.2 3.5-5.6 7.2-8 11.4l11.3 11.2c9.9-13.4 21.9-25.4 35.3-35.3l-11.2-11.3c-4.2 2.2-8 5.2-11.4 8-2.1-6.4-6.7-13.3-12.7-19.3-8-6.21-24.55-20.4-33.97-11.32zm305.57 11.3c-6 6.02-10.6 12.92-12.7 19.32-3.5-3.2-7.2-5.6-11.4-8l-11.2 11.3c13.4 9.9 25.4 21.9 35.3 35.3l11.3-11.2c-2.2-4.2-5.2-8-8-11.4 6.3-2.2 13.2-6.7 19.2-12.7 12.5-12.5 17.6-27.69 11.3-33.93-9.9-7.87-28 5.62-33.8 11.31zm-142.3 7.52c-36.8 1.6-70.2 16.3-95.6 39.6-3.3 3.1-6.6 6.3-9.2 9.2-23.3 25.4-38 58.8-39.6 95.7 0 4.5-.2 9.1.1 13 1.5 36.8 16.2 70.2 39.5 95.6 3.1 3.2 6.4 6.5 9.2 9.2 25.4 23.2 58.8 37.9 95.6 39.5h.2c4.1.2 8.7 0 12.8 0 36.8-1.6 70.2-16.3 95.6-39.6 3.3-3.1 6.6-6.3 9.2-9.2 23.3-25.4 38-58.8 39.6-95.6v-.2c.2-4.2 0-8.7 0-12.8-1.6-36.8-16.3-70.2-39.6-95.6-3.1-3.3-6.3-6.6-9.2-9.2-25.4-23.3-58.8-38-95.6-39.6-4.5-.2-9.1 0-13 0zm6.5 10.7c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8zm6.9 28.4c25.7 1.6 49.1 11.8 67.3 27.9 3.4 3.1 6.7 6.3 9.7 9.7 16.1 18.2 26.3 41.6 27.9 67.4.4 4.6 0 9.2 0 13.7-1.6 25.7-11.8 49.1-27.9 67.3-3.1 3.4-6.3 6.7-9.7 9.7-18.2 16.1-41.6 26.3-67.4 27.9-4.6.1-9.2.4-13.7 0-25.7-1.6-49.1-11.8-67.2-27.9h-.1c-3.4-3-6.6-6.3-9.6-9.7-16.1-18.1-26.4-41.5-28-67.3-.1-4.6-.4-9.1 0-13.6.5-25.8 13.3-50.5 27.9-67.5 3.1-3.4 6.3-6.7 9.7-9.7 18.2-16.1 41.6-26.3 67.4-27.9 4.6-.4 9.2 0 13.7 0zm-94.8 12.6c3.1 3.1 3.1 8.2 0 11.3-3.1 3.1-8.2 3.1-11.3 0-3.1-3.1-3.1-8.2 0-11.3 3.5-2.9 8.2-2.9 11.3 0zm187.1 0c3.1 3.1 3.1 8.2 0 11.3-3.1 3.1-8.2 3.1-11.3 0-3.1-3.1-3.1-8.2 0-11.3 3.5-2.9 8.2-2.9 11.3 0zM240 163.3v8.7c2.5 3.2 4.4 5.5 7.8 6.8-.7 12.4-1.6 25.1-2.8 37.7 7.4-1.9 15.2-2 22.1.1-1.2-12.7-2.2-25.4-2.9-37.9 7.9-2.1 7.8-8.6 7.8-15.4-11-1.7-21.8-1.6-32 0zm-38.3 15.8c-8.7 6.2-16.4 13.9-22.6 22.6l6.2 6.2c4 .5 7 .8 10.3-.7 8.3 9.3 16.6 18.9 24.7 28.7 3.7-6.5 9.1-11.9 15.7-15.6-9.9-8.1-19.5-16.4-28.8-24.7 1.8-3.1 1.3-6.7.7-10.3zm108.6 0l-6.2 6.2c-.7 4-.8 6.9.6 10.3-9.2 8.3-18.9 16.6-28.7 24.7 6.5 3.7 11.9 9.1 15.6 15.7 8.1-9.9 16.5-19.5 24.7-28.8 3.2 1.7 6.7 1.3 10.3.7l6.2-6.2c-6.2-8.7-13.8-16.4-22.5-22.6zM423.1 231c2.5 17.1 2.3 34.1 0 50H439c1.5-4.5 2-9.4 2.3-13.7 6 3 14.2 4.7 22.7 4.7 17.7 0 32-7.2 32-16s-14.3-16-32-16c-8.5 0-16.7 1.7-22.7 4.7-.1-4.7-1-9-2.3-13.7zm-350.07.1c-1.35 4.5-2.11 9.2-2.4 13.6-6.02-3-14.15-4.6-22.6-4.6-17.67 0-32 7.2-32 16s14.33 16 32 16c8.48 0 16.61-1.7 22.6-4.7.15 4.7 1.12 9 2.4 13.7h15.8c-2.38-17.1-2.5-34.1 0-50zM256 233c-12.9 0-23 10.2-23 23s10.1 23 23 23c12.8 0 23-10.2 23-23s-10.2-23-23-23zm84 7c-3.2 2.5-5.5 4.4-6.8 7.8-12.4-.7-25.1-1.6-37.7-2.8 1.9 7.5 1.9 15.2 0 22.1 12.6-1.2 25.2-2.2 37.7-2.9 1 3.5 3.8 5.7 6.8 7.8h8.7c1.7-11 1.6-21.8 0-32zm-176.7.1c-1.7 10.9-1.5 21.8 0 32h8.7c3.1-2.5 5.6-4.3 6.7-7.8 12.5.6 25.1 1.6 37.8 2.8-2-7.5-2-15.2-.1-22.1-12.6 1.2-25.3 2.1-37.7 2.8-.9-3.5-3.8-5.7-6.7-7.7zm224.9 7.9c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8zm-264.4.1c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8zm167.9 28c-3.7 6.5-9.1 11.9-15.7 15.6 9.9 8.1 19.5 16.4 28.8 24.7-1.8 3.1-1.3 6.7-.7 10.3l6.2 6.2c8.7-6.2 16.4-13.9 22.6-22.6l-6.2-6.2c-4-.5-7-.8-10.3.7-8.3-9.3-16.6-18.9-24.7-28.7zm-71.4 0c-8.1 9.8-16.4 19.4-24.7 28.7-3.1-1.8-6.7-1.3-10.2-.7l-6.3 6.2c6.2 8.8 13.9 16.5 22.7 22.6l6.2-6.2c.5-4 .8-7-.7-10.3 9.3-8.3 18.9-16.6 28.7-24.7-6.5-3.7-12-9.1-15.7-15.6zm24.6 19.3c1.2 12.7 2.2 25.4 2.9 37.9-3.5.8-5.8 3.8-7.8 6.7v8.7c11 1.7 21.8 1.6 32 0V340c-2.5-3.2-4.4-5.5-7.8-6.8.7-12.4 1.6-25.1 2.8-37.7-7.7 1.3-15.8 1.7-22.1-.1zm-76.7 48.5c3.1 3.1 3.1 8.2 0 11.3-3.1 3.1-8.2 3.1-11.3 0-3.1-3.1-3.1-8.2 0-11.3 3.5-3 8.2-3 11.3 0zm187 0c3.1 3.1 3.1 8.2 0 11.3-3.1 3.1-8.2 3.1-11.3 0-3.1-3.1-3.1-8.2 0-11.3 3.5-3 8.3-3 11.3 0zm36.6 12.6c-9.9 13.4-21.9 25.4-35.3 35.3l11.2 11.3c4.2-2.2 8-5.2 11.4-8 2.1 6.4 6.7 13.3 12.7 19.3 12.5 12.5 27.6 17.5 33.9 11.3 6.2-6.3 1.2-21.4-11.3-33.9-6-6-12.9-10.6-19.3-12.7 3.2-3.5 5.6-7.2 8-11.4zm-271.6 0L109 367.7c2.3 4.1 5.1 8.2 8 11.4-6.4 2.1-13.3 6.7-19.37 12.7-12.47 12.5-17.52 27.6-11.3 33.9 6.24 6.3 21.47 1.2 33.97-11.3 6-6 10.6-12.9 12.7-19.3 3.5 3.2 7.2 5.6 11.4 8l11.2-11.2c-13.5-10-25.4-21.9-35.4-35.4zM256 380.2c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8zm-25 43V439c4.5 1.4 9.4 2.1 13.7 2.4-3 6-4.7 14.1-4.7 22.6 0 17.7 7.2 32 16 32s16-14.3 16-32c0-8.5-1.7-16.6-4.7-22.6 4.7-.2 9-1.1 13.7-2.4v-15.9c-17.1 2.5-34.1 2.4-50 .1z" />

              </g>

            </svg>

          </div>
          <h4
            class="text-3xl font-bold mb-6 text-[#132E35] tracking-tight transition-colors duration-300 group-hover:text-[#B58863]">
            Ev - Ofis Döşeme
          </h4>
          <p class="text-[#0D1F23] text-lg mb-10 leading-relaxed max-w-md">
            Ev, ofis, kafe ve restoran koltuklarınızı yenileyerek dayanıklı, kolay temizlenebilir ve şık tasarımlar
            sunuyoruz. Mekânınıza yeni bir soluk getiriyoruz.
          </p>
          <ul class="list-disc list-inside text-[#132E35] max-w-md space-y-3 text-left">
            <li>Kolay temizlenebilir kumaş</li>
            <li>Modern tasarımlar</li>
            <li>Hızlı teslimat</li>
          </ul>
        </div>

      </div>
    </section>

    <section id="projeler" data-color="#132E35"
      class="bg-[#132E35] text-[#AFB3B7] min-h-screen py-24 px-6 flex flex-col justify-center items-center">

      <h3 class="text-4xl md:text-5xl font-extrabold mb-10 select-none text-center text-[#B58863]">
        Projelerimiz
        <span class="block w-20 h-[3px] bg-[#B58863] mx-auto mt-4 rounded-full"></span>
      </h3>

      <div class="max-w-3xl space-y-5 text-center text-base md:text-lg leading-relaxed mb-12">
        <p>
          Projelerimizde müşteri memnuniyetini ön planda tutarak mekanlarınıza estetik ve işlevsellik katıyoruz.
          Her projeyi kaliteli malzeme ve usta işçilikle tamamlayarak, uzun ömürlü çözümler sunuyoruz.
        </p>
        <p>
          Tasarım, üretim ve uygulama aşamalarımızda şeffaf iletişim ve zamanında teslim prensipleriyle ilerliyor,
          beklentilerinizi eksiksiz karşılamak için titizlikle çalışıyoruz.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <div class="bg-[#132E35]/80 rounded-2xl p-6 md:p-8 shadow-xl border border-[#1f3b43] backdrop-blur-sm
             transition duration-500 ease-in-out
             hover:-translate-y-2 hover:border-[#B58863] hover:shadow-[0_0_15px_3px_rgba(181,136,99,0.6)]">
          <div class="absolute inset-0 rounded-2xl border border-[#B58863]/20 pointer-events-none"></div>
          <h4 class="text-lg font-semibold mb-2 text-[#B58863]">Planlama</h4>
          <p class="text-sm">
            Müşteri beklentilerini dikkatle analiz ederek en uygun çözümleri planlar, projenizin her adımını şeffaf bir
            şekilde paylaşırız.
          </p>
        </div>

        <div class="bg-[#132E35]/80 rounded-2xl p-6 md:p-8 shadow-xl border border-[#1f3b43] backdrop-blur-sm
             transition duration-500 ease-in-out
             hover:-translate-y-2 hover:border-[#B58863] hover:shadow-[0_0_15px_3px_rgba(181,136,99,0.6)]">
          <div class="absolute inset-0 rounded-2xl border border-[#B58863]/20 pointer-events-none"></div>
          <h4 class="text-lg font-semibold mb-2 text-[#B58863]">Uygulama</h4>
          <p class="text-sm">
            Kaliteli malzeme ve usta işçilikle, projenizi estetik ve fonksiyonel bir şekilde hayata geçirerek uzun
            ömürlü çözümler sunarız.
          </p>
        </div>

        <div class="bg-[#132E35]/80 rounded-2xl p-6 md:p-8 shadow-xl border border-[#1f3b43] backdrop-blur-sm
             transition duration-500 ease-in-out
             hover:-translate-y-2 hover:border-[#B58863] hover:shadow-[0_0_15px_3px_rgba(181,136,99,0.6)]">
          <div class="absolute inset-0 rounded-2xl border border-[#B58863]/20 pointer-events-none"></div>
          <h4 class="text-lg font-semibold mb-2 text-[#B58863]">Teslimat</h4>
          <p class="text-sm">
            Projeyi belirlenen sürede eksiksiz tamamlayarak, kullanımınıza hazır bir şekilde teslim eder ve
            memnuniyetinizi garanti altına alırız.
          </p>
        </div>
      </div>
    </section>

    <!-- Sıkça Sorulan Sorular -->
    <section id="sss" data-color="#698180"
      class="bg-[#698180] text-[#0D1F23] px-6 flex flex-col items-center min-h-screen pt-24 pb-24 sm:pb-0">
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
    <section id="iletisim" data-color="#0D1F23"
      class="bg-[#0D1F23] text-[#AFB3B7] py-24 px-4 min-h-screen flex flex-col justify-center items-center">
      <h3 class="text-4xl sm:text-5xl font-extrabold mb-12 select-none text-center">İletişim</h3>

      <div class="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">

        <!-- Bilgi Kartı -->
        <div class="bg-[#132E35] rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col justify-center space-y-10
             border border-[#B58863]/30 hover:border-[#B58863] hover:shadow-[0_10px_20px_rgba(181,136,99,0.5)]
             transform transition duration-500 ease-in-out hover:scale-[1.03] cursor-default">
          <div class="flex items-center space-x-6 sm:space-x-8">
            <h4
              class="text-2xl sm:text-3xl font-semibold mb-3 border-b-4 border-[#B58863] inline-block pb-2 w-36 sm:w-40">
              Adres
            </h4>
            <p class="text-base sm:text-lg leading-relaxed max-w-md">
              Bayır, Sülün Sk. No:1 z03, 48000 Menteşe/Muğla
            </p>
          </div>

          <div class="flex items-center space-x-6 sm:space-x-8">
            <h4
              class="text-2xl sm:text-3xl font-semibold mb-3 border-b-4 border-[#B58863] inline-block pb-2 w-36 sm:w-40">
              Telefon
            </h4>
            <a href="tel:+905455074037" class="inline-block mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#B58863] to-[#a97d45]
                 text-[#132E35] font-semibold shadow-lg hover:from-[#a97d45] hover:to-[#876734]
                 transition duration-300 ease-in-out text-sm sm:text-base">
              +90 545 507 40 37
            </a>
          </div>

          <div class="flex items-center space-x-6 sm:space-x-8">
            <h4
              class="text-2xl sm:text-3xl font-semibold mb-3 border-b-4 border-[#B58863] inline-block pb-2 w-36 sm:w-40">
              E-posta
            </h4>
            <a href="mailto:info@dosemeci.com.tr" class="inline-block mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#B58863] to-[#a97d45]
                 text-[#132E35] font-semibold shadow-lg hover:from-[#a97d45] hover:to-[#876734]
                 transition duration-300 ease-in-out text-sm sm:text-base">
              info@dosemeci.com.tr
            </a>
          </div>

          <!-- WhatsApp Butonu -->
          <div class="flex items-center space-x-6 sm:space-x-8">
            <h4
              class="text-2xl sm:text-3xl font-semibold mb-3 border-b-4 border-[#B58863] inline-block pb-2 w-36 sm:w-40">
              WhatsApp
            </h4>
            <a href="https://wa.me/905455074037" target="_blank" rel="noopener noreferrer" class="inline-flex items-center mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E]
         text-white font-semibold shadow-lg hover:from-[#128C7E] hover:to-[#075E54]
         transition duration-300 ease-in-out text-sm sm:text-base">

              <!-- Kendi SVG ikonun -->
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"
                class="mr-3">
                <path
                  d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
                  fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                  fill="white" />
              </svg>

              Mesaj Gönder
            </a>

          </div>
        </div>

        <!-- Harita -->
        <div class="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#B58863]/50 hover:border-[#B58863]
             transition-colors duration-400 mt-14 md:mt-0 min-h-[300px] md:min-h-[350px]">

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3175.219012838681!2d28.2095646!3d37.266233299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bf130bc1f6e38b%3A0x44c9249a5df06053!2zbXXEn2xhIFnEsWxkxLFyxLFtIGtvbHR1ayBkw7bFn2VtZQ!5e0!3m2!1str!2str!4v1752247984310!5m2!1str!2str"
            width="100%" height="100%" class="w-full h-full" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>

        </div>
      </div>
    </section>

    <!-- WhatsApp Sabit Buton -->
    <a href="https://wa.me/905455074037" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 bg-gradient-to-r from-[#25D366] to-[#128C7E]
         text-white p-4 rounded-full shadow-lg flex items-center justify-center
         hover:from-[#128C7E] hover:to-[#075E54] transition duration-300" aria-label="WhatsApp ile mesaj gönder">

      <!-- Kendi SVG ikonun -->
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
          fill="white" />
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
          fill="white" />
      </svg>
    </a>


    <!-- Footer -->
    <footer class="bg-[#132E35] text-[#B58863] py-10 flex flex-col items-center justify-center">
      <p class="mb-2">&copy; 2025 Döşemeci. Tüm hakları saklıdır.</p>
    </footer>
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

@media (max-width: 640px) {
  #top {
    background-position: calc(100% + 200px) center !important;
  }
}

@media (max-width: 767px) {
  .buttons-container {
    bottom: 14rem !important;
    /* veya ihtiyacına göre 14rem, 16rem deneyebilirsin */
  }
}

#top>div:first-child {
  top: 280px !important;
}

/* ekran yüksekliği 800px altındaysa */
@media (max-height: 800px) {
  #top>div:first-child {
    top: 180px !important;
  }
}

/* 600px altındaysa */
@media (max-height: 600px) {
  #top>div:first-child {
    top: 100px !important;
  }
}

/* 450px altındaysa */
@media (max-height: 450px) {
  #top>div:first-child {
    top: 40px !important;
  }
}
</style>
