
const tabQuery =   (requirement) => {
    return  new Promise((resolve, reject) => {
    chrome.tabs.query(requirement,([tab]) => { 
        resolve(tab)
      })
    })
}

export default {tabQuery}