export const tg = () => window.Telegram?.WebApp
export const tgUser = () => tg()?.initDataUnsafe?.user
export const tgHaptic = () => tg()?.HapticFeedback
export const initTg = () => {
  const w = tg()
  if (!w) return
  w.ready(); w.expand()
  w.setHeaderColor('#030311')
  w.setBackgroundColor('#030311')
}
