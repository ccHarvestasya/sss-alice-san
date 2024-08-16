'use strict'

// alice://sign?type=request_pubkey&callback=68747470733A2F2F76656E7475732D77616C6C65742E6E65742F706565726E6F64652F64656C65676174652E68746D6C3F667269656E646C794E616D653D456E6A6F79253230616E64253230737072656164253230506F5325324221286E6F6465342926686F73743D3133332E31382E3232382E373726686F737444657461696C3D4B796F746F25324325323032362532432532304A6170616E2676657273696F6E3D76312E302E332E37266E6F64655F7075626C69634B65793D34353633444432304441363432443032424231344134303631314631334346463532343131363333314242373030354638463737463646393030313345374237264E45545F547970653D4D61696E4E6574

chrome.webNavigation.onErrorOccurred.addListener(async (event) => {
  console.log('onErrorOccurred')
  if (/^alice:/.test(event.url)) {
    const param = event.url.match(/^alice:\/\/sign(.*)/)
    console.log('1' + event.url.match(/^alice:\/\/sign(.*)/))
    console.log('2' + event.url)
    const params = getParams(param![1])
    console.log(params)

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
