'use strict'

chrome.webNavigation.onErrorOccurred.addListener(async (event) => {
  console.log('onErrorOccurred')
  if (/^alice:/.test(event.url)) {
    const param = event.url.match(/^alice:\/\/sign(.*)/)
    const params = getParams(param![1])
    if (params.type !== undefined) {
      await chrome.tabs.sendMessage(event.tabId, {
        action: 'GET_WINDOW',
        data: params,
      })
    }
  }
})

const getParams = (params: string): { [key: string]: string } => {
  const paramsArray = params.slice(1).split('&')
  const paramsObject: { [key: string]: string } = {}
  paramsArray.forEach((param) => {
    paramsObject[param.split('=')[0]] = param.split('=')[1]
  })
  return paramsObject
}
