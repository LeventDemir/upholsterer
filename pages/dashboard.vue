<template>
  <section class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Dashboard - Resim Yükleme ve Silme</h1>

    <div v-if="!selectedImage">
      <input type="file" @change="handleFileUpload" accept="image/*" class="mb-4" />
    </div>

    <div v-if="selectedImage" class="relative border rounded-lg overflow-hidden">
      <img :src="selectedImage.url" alt="Yüklenen Resim" class="object-cover w-full h-64" />
      <button @click="deleteImage" class="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1">Sil</button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const selectedImage = ref(null)

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
</script>

<style scoped>
button {
  cursor: pointer;
}
</style>
