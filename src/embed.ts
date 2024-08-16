import { getActiveNetworkType, getActivePublicKey, requestSign, setTransactionByPayload } from 'sss-module'
import { Buffer } from 'buffer'

window.Buffer = window.Buffer || Buffer
window.addEventListener(
  'message',
  (ev) => {
    if (ev.source != window) return

    if (ev.data.type && ev.data.type === 'FROM_CONTENT') {
      switch (ev.data.action) {
        case 'GET_WINDOW':
          console.log(ev.data.data.type)
          switch (ev.data.data.type) {
            case 'request_sign_transaction':
              // TODO: method: "announce"の対応が必要
              setTransactionByPayload(ev.data.data.data)
              requestSign().then((signedTx) => {
                console.log(signedTx.payload)
              })
              break
            case 'request_pubkey':
              console.log(ev.data.data.callback)
              const callback = Buffer.from(ev.data.data.callback, 'hex').toString('utf-8')
              const networkType = getActiveNetworkType() == 104 ? 'MainNet' : 'TestNet'
              const callbackUrl = callback + `&pubkey=${getActivePublicKey()}&network=${networkType}`
              console.log(callbackUrl)
              location.href = callbackUrl
              break
            case 'request_sign_utf8':
            case 'request_sign_binary_hex':
            case 'request_sign_batches':
            default:
              console.log(`'${ev.data.data.type}' は、未対応です。`)
              break
          }
          break
      }
    }
  },
  false
)

const func = () => {
  console.log(window)
}
func()
