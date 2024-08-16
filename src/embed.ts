import { requestSign, setTransactionByPayload } from 'sss-module'

window.addEventListener(
  'message',
  (ev) => {
    if (ev.source != window) {
      return
    }
    if (ev.data.type && ev.data.type === 'FROM_CONTENT') {
      switch (ev.data.action) {
        case 'GET_WINDOW':
          //   chrome.runtime.sendMessage({
          //     action: ev.data.action,
          //     data: ev.data.data,
          //   });
          console.log(ev.data.action)
          console.log(ev.data.data)

          setTransactionByPayload(ev.data.data)
          requestSign().then((payload) => {
            console.log(payload.payload)
          })

          break
      }
    }
    console.log('embed')
    console.log(ev)
  },
  false
)

const func = () => {
  console.log(window)
}
func()
