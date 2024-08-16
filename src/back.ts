'use strict'
// import { requestSign, setTransactionByPayload } from "sss-module";

// chrome.webRequest.onErrorOccurred.addListener(
//   function (details) {
//     console.log("onErrorOccurred");
//     console.log(details.url);
//   },
//   { urls: ["<all_urls>"] },
//   []
// );

// chrome.webRequest.onBeforeRequest.addListener(
//   function (details) {
//     console.log("onBeforeRequest");
//     console.log(details.url);
//   },
//   { urls: ["<all_urls>"] },
//   []
// );

// chrome.webNavigation.onBeforeNavigate.addListener((event) => {
//   console.log("onBeforeNavigate");
//   console.log(event);
// });

chrome.webNavigation.onErrorOccurred.addListener(async (event) => {
  console.log('onErrorOccurred')
  if (/^alice:/.test(event.url)) {
    const param = event.url.match(/^alice:\/\/sign(.*)/)
    console.log(event.url.match(/^alice:\/\/sign(.*)/))
    console.log(event.url)
    console.log(getParams(param![1]))
    const params = getParams(param![1])
    if (params.data !== undefined) {
      console.log(params.data)
      await chrome.tabs.sendMessage(event.tabId, {
        action: 'GET_WINDOW',
        data: params.data,
      })
      // setTransactionByPayload(params.data);
      // requestSign().then((payload) => {
      //   console.log(payload);
      // });
    }
    // setPopupForTab();
  }
})

// function setPopupForTab() {
//   chrome.windows.create({
//     url: "popup.html?foo=bar",
//     type: "popup",
//     width: 320,
//     height: 480,
//   });
//   // chrome.action.openPopup();
// }

const getParams = (params: string): { [key: string]: string } => {
  const paramsArray = params.slice(1).split('&')
  const paramsObject: { [key: string]: string } = {}
  paramsArray.forEach((param) => {
    paramsObject[param.split('=')[0]] = param.split('=')[1]
  })
  return paramsObject
}
