/* Service worker для web-push уведомлений (Push API). Регистрируется в корне (scope '/')
   из composables/usePushNotifications.ts при включении уведомлений пользователем.
   Полезная нагрузка — JSON { title, body, url } (см. бэкенд WebPushSender). */

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('push', (event) => {
  let payload = {}
  try {
    payload = event.data ? event.data.json() : {}
  } catch (e) {
    payload = { body: event.data ? event.data.text() : '' }
  }

  const title = payload.title || 'GPT Chat'
  const options = {
    body: payload.body || '',
    icon: '/android-chrome-192x192.png',
    badge: '/android-chrome-192x192.png',
    tag: payload.tag || 'gpt-chat-task',
    data: { url: payload.url || '/' }
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const target = new URL(event.notification.data?.url || '/', self.location.origin)
  if (!['http:', 'https:'].includes(target.protocol)) { return }

  event.waitUntil((async () => {
    if (target.origin === self.location.origin) {
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      const client = clients.find(item => 'navigate' in item && 'focus' in item)
      if (client) {
        try {
          await client.navigate(target.href)
          return await client.focus()
        } catch {
          // Вкладка могла закрыться во время перехода.
        }
      }
    }
    return self.clients.openWindow(target.href)
  })())
})
