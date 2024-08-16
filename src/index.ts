const head = document.head
const script = document.createElement('script')
script.src = chrome.runtime.getURL('embed.js')
head.appendChild(script)

chrome.runtime.onMessage.addListener((request) => {
  console.log('onMessage')
  console.log(request.data)
  console.log(window)

  window.postMessage({ type: 'FROM_CONTENT', action: request.action, data: request.data }, '*')
})
