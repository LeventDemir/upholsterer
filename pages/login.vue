<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

const router = useRouter()

async function handleLogin() {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (data.success) {
      // Kullanıcı bilgilerini localStorage'a kaydet
      localStorage.setItem('user', JSON.stringify(data.user))
      // Başarılı girişte anasayfaya yönlendir
      router.push('/admin')
    } else {
      // API'den dönen mesajı göster
      error.value = data.message || 'Giriş başarısız.'
    }
  } catch (err) {
    error.value = 'Bir hata oluştu.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#0D1F23] flex items-center justify-center px-4">
    <div class="bg-[#132E35] p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-md">
      <h1 class="text-3xl md:text-4xl font-bold text-[#B58863] text-center mb-8">Giriş Yap</h1>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-[#AFB3B7] mb-1" for="username">Kullanıcı Adı</label>
          <input v-model="username" type="text" id="username"
            class="w-full rounded-lg border border-[#1f3b43] bg-[#0D1F23] text-[#AFB3B7] p-3 focus:outline-none focus:ring-2 focus:ring-[#B58863] transition"
            required />
        </div>

        <div>
          <label class="block text-[#AFB3B7] mb-1" for="password">Şifre</label>
          <input v-model="password" type="password" id="password"
            class="w-full rounded-lg border border-[#1f3b43] bg-[#0D1F23] text-[#AFB3B7] p-3 focus:outline-none focus:ring-2 focus:ring-[#B58863] transition"
            required />
        </div>

        <button type="submit" :disabled="loading"
          class="w-full bg-[#B58863] hover:bg-[#9f704e] text-[#0D1F23] font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
          {{ loading ? 'Giriş Yapılıyor...' : 'Giriş Yap' }}
        </button>

        <p v-if="error" class="text-red-500 text-center mt-2">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
