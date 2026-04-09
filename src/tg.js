// Telegram WebApp helpers

const tg = () => window.Telegram?.WebApp

export const tgHaptic = (type) => {
  try {
    const haptic = tg()?.HapticFeedback
    if (!haptic) return
    if (type === 'light' || type === 'medium' || type === 'heavy') {
      haptic.impactOccurred(type)
    } else if (type === 'success' || type === 'error' || type === 'warning') {
      haptic.notificationOccurred(type)
    } else {
      haptic.impactOccurred('light')
    }
  } catch (e) {
    // silently ignore in non-Telegram environments
  }
}

export const tgReady = () => {
  try { tg()?.ready() } catch(e) {}
}

export const tgExpand = () => {
  try { tg()?.expand() } catch(e) {}
}

export const tgClose = () => {
  try { tg()?.close() } catch(e) {}
}

export const tgTheme = () => tg()?.themeParams || {}

export const tgUser = () => tg()?.initDataUnsafe?.user || null
