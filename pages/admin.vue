<template>
  <main>

    <Navbar />
    
    <section class="bg-[#0D1F23] min-h-screen flex flex-col items-center justify-start py-12 px-4 sm:px-8 pt-36 sm:pt-60">

      <h1 class="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">📸 Resim Yükleme Paneli</h1>

      <!-- Yükleme Alanı -->
      <div v-if="!selectedImage"
        class="flex flex-col items-center justify-center border-4 border-dashed border-gray-400 rounded-xl p-10 cursor-pointer hover:border-blue-400 transition w-full max-w-2xl"
        @click="$refs.fileInput.click()">
        <p class="text-gray-200 text-lg">Tıkla veya dosya seç</p>
        <input ref="fileInput" type="file" @change="handleFileUpload" accept="image/*" class="hidden" />
      </div>

      <div v-if="selectedImage" class="relative overflow-hidden mt-6 w-full max-w-2xl rounded-xl shadow-lg">
        <img :src="selectedImage.url" alt="Yüklenen Resim"
          class="object-cover w-full h-[400px] rounded-xl border border-gray-600" />
        <button @click="deleteImage"
          class="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow">
          ✕
        </button>
      </div>

      <!-- Yükle Butonu veya Yükleme Animasyonu -->
      <div class="mt-6 w-full max-w-2xl">
        <button v-if="selectedImage && !uploading" @click="upload"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow transition text-lg">
          🚀 Yükle
        </button>

        <div v-if="uploading" class="flex justify-center items-center">
          <svg class="animate-spin h-10 w-10 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
      </div>

      <!-- Mesaj Kutusu -->
      <transition name="fade">
        <div v-if="message" :class="[
          'fixed bottom-8 left-1/2 transform -translate-x-1/2 px-5 py-3 rounded-xl shadow-lg text-white text-center max-w-md',
          messageType === 'success' ? 'bg-green-600' : 'bg-red-600'
        ]">
          {{ message }}
        </div>
      </transition>

      <!-- Kayıtlı Resimler -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-12 w-full max-w-6xl">
        <div v-for="photo in photos" :key="photo._id"
          class="relative rounded-lg overflow-hidden group shadow-lg border border-gray-700 hover:scale-105 transition">
          <img :src="photo.photo" alt="Yüklenen Fotoğraf" class="object-cover w-full h-48 sm:h-52" />

          <!-- Silme butonu -->
          <button @click="deletePhoto(photo._id)"
            class="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow">
            ✕
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { Navbar } from '#components'
import { ref, onMounted } from 'vue'

const selectedImage = ref(null)
const message = ref('')
const messageType = ref('success')
const photos = ref([])
const uploading = ref(false)

let messageTimeout = null

function showMessage(text, type = 'success') {
  message.value = text
  messageType.value = type
  clearTimeout(messageTimeout)
  messageTimeout = setTimeout(() => {
    message.value = ''
  }, 3000)
}

async function upload() {
  try {
    uploading.value = true
    const res = await fetch('/api/photo/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        photo: selectedImage.value.url
      })
    })
    const data = await res.json()
    console.log('Yükleme tamam:', data)
    showMessage('✅ Yükleme başarılı!', 'success')
    await fetchPhotos()
    selectedImage.value = null
  } catch (error) {
    console.error('Yükleme hatası:', error)
    showMessage('❌ Yükleme sırasında hata oluştu.', 'error')
  } finally {
    uploading.value = false
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    selectedImage.value = { url: e.target.result }
  }
  reader.readAsDataURL(file)
  event.target.value = ''
}

function deleteImage() {
  selectedImage.value = null
}

// Sayfa açıldığında fotoğrafları çek
onMounted(() => {
  fetchPhotos()
})

async function fetchPhotos() {
  try {
    const res = await fetch('/api/photo/')
    const data = await res.json()
    photos.value = data.reverse()
  } catch (error) {
    console.error('Fotoğraflar yüklenemedi:', error)
    showMessage('❌ Fotoğraflar yüklenemedi.', 'error')
  }
}

async function deletePhoto(id) {
  if (!confirm('Bu resmi silmek istediğinizden emin misiniz?')) return

  try {
    const res = await fetch(`/api/photo/delete/${id}`)
    const data = await res.json()

    if (data.success) {
      showMessage('✅ Fotoğraf silindi!', 'success')
      await fetchPhotos()
    } else {
      showMessage('❌ Fotoğraf silinemedi.', 'error')
    }
  } catch (error) {
    console.error('Silme hatası:', error)
    showMessage('❌ Fotoğraf silinirken hata oluştu.', 'error')
  }
}

definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
