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
  const targetUrl = (event.notification.data && event.notification.data.url) || '/'

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        // Уже открытая вкладка сайта — переиспользуем её.
        if ('focus' in client) {
          if ('navigate' in client) {
            try { client.navigate(targetUrl) } catch (e) { /* кросс-origin — игнорируем */ }
          }
          return client.focus()
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl)
      }
      return undefined
    })
  )
})
