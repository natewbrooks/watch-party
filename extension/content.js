// expose tab id as capture handle so the watch page knows which tab it captured
if (window == top) chrome.runtime.sendMessage({ id: 1 }, id => navigator.mediaDevices?.setCaptureHandleConfig?.({ handle: String(id), permittedOrigins: ['*'] }))

// relay from watch page to the captured tab
window.addEventListener('message', e => {
  if (e.source == window && e.data?.watchMedia) chrome.runtime.sendMessage(e.data.watchMedia)
})

chrome.runtime.onMessage.addListener(cmd => {
  const media = [...document.querySelectorAll('video,audio')]
  if (cmd == 'pause') media.forEach(m => m.pause())
  // biggest video is the one being watched
  if (cmd == 'play') media.sort((a, b) => b.offsetWidth * b.offsetHeight - a.offsetWidth * a.offsetHeight)[0]?.play()
})
