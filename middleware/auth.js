export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) {
    return
  }

  const userString = localStorage.getItem('user')
  if (!userString) {
    return navigateTo('/login')
  }

  let username = null
  try {
    const user = JSON.parse(userString)
    username = user.username
  } catch {
    return navigateTo('/login')
  }

  if (!username) {
    return navigateTo('/login')
  }

  try {
    const data = await $fetch('/api/user/isAuth', {
      method: 'POST',
      body: { username }
    })
    if (!data?.auth) {
      return navigateTo('/login')
    }
  } catch (error) {
    return navigateTo('/login')
  }
})
