const loadScript = (url, id, status) => {
  return new Promise((resolve, reject) => {
    if (status === 'on') {
      let ready = false
      if (!document) {
        reject(new Error('Document was not defined'))
      }
      let tag = document.getElementsByTagName('script')
      tag = document.getElementsByTagName('script')[tag.length - 1]

      const scriptToLoad = document.getElementById(`script-${id}`)
      if (scriptToLoad) {
        resolve(scriptToLoad)
      } else {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url
        script.async = true
        script.id = `script-${id}`
        script.onreadystatechange = () => {
          if (!ready && (!window.readyState || window.readyState === 'complete')) {
            ready = true
            resolve(script)
          }
        }
        script.onload = script.onreadystatechange

        script.onerror = msg => {
          console.log(msg)
          reject(new Error('Error loading script.'))
        }

        script.onabort = msg => {
          console.log(msg)
          reject(new Error('Script loading aboirted.'))
        }

        if (tag.parentNode != null) {
          tag.parentNode.append(script, tag)
        }
      }
    } else {
      const scriptToRemove = document.getElementById(`script-${id}`)
      scriptToRemove.parentNode.removeChild(scriptToRemove)
      resolve(scriptToRemove)
    }
  })
}

export default loadScript
