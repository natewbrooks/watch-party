chrome.runtime.onMessage.addListener((msg, sender, reply) => {
  if (msg.id) return reply(sender.tab.id)
  chrome.tabs.sendMessage(+msg.tab, msg.cmd).catch(() => {})
})
