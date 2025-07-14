<script setup>
import { ref, onMounted } from 'vue'

const images = ref([])
const selectedImage = ref(null)

function openImage(src) {
    selectedImage.value = src
}

function closeImage() {
    selectedImage.value = null
}

async function fetchImages() {
    try {
        const response = await fetch('/api/photo/')
        if (!response.ok) throw new Error('API hatası')
        const data = await response.json()
        images.value = data
    } catch (error) {
        console.error('Resimler alınamadı:', error)
    }
}

onMounted(() => {
    fetchImages()
})
</script>

<template>
    <section id="projeler" data-color="#132E35" class="bg-[#132E35] min-h-screen py-24 px-6 flex flex-col items-center">
        <!-- Galeri Başlığı -->
        <h2 class="text-5xl md:text-6xl font-extrabold mb-12 text-[#B58863] select-none text-center">
            Galeri
            <span class="block w-24 h-1.5 bg-[#B58863] mx-auto mt-4 rounded-full"></span>
        </h2>

        <!-- Resim Kutuları -->
        <div class="flex flex-wrap justify-center gap-10 max-w-[1400px] w-full">
            <button v-for="(img, index) in images" :key="index" @click="openImage(img)"
                class="relative bg-[#AFB3B7] rounded-2xl p-0 flex items-center justify-center cursor-pointer shadow-xl border border-[#1f3b43] backdrop-blur-sm
               transition duration-500 ease-in-out
               hover:-translate-y-2 hover:border-[#B58863] hover:shadow-[0_0_15px_3px_rgba(181,136,99,0.6)] w-[320px] h-[280px] overflow-hidden" aria-label="Projeyi büyüt">
                <img :src="img.photo" alt="Proje resmi" class="w-full h-full object-cover select-none" loading="lazy"
                    draggable="false" />
            </button>
        </div>

        <!-- Modal -->
        <transition name="fade">
            <div v-if="selectedImage" class="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center z-50"
                @click.self="closeImage">
                <button @click="closeImage" class="absolute top-5 right-5 text-white text-4xl font-bold z-60">
                    &times;
                </button>
                <img :src="selectedImage.photo" alt="Büyük Proje Resmi" class="rounded-3xl max-w-[90vw] max-h-[90vh]" />
            </div>
        </transition>
    </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
