const loadScript = (url, id, action) => {
  return new Promise((resolve, reject) => {
    if (action === 'on') {
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
        script.id = `script-${id}`
        script.type = 'text/javascript'
        script.src = url
        script.async = true
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
          reject(new Error('Script loading aborted.'))
        }

        if (tag.parentNode != null) {
          tag.parentNode.append(script, tag)
        }
      }
    } else {
      const scriptToRemove = document.getElementById(`script-${id}`)
      if (scriptToRemove) {
        scriptToRemove.parentNode.removeChild(scriptToRemove)
      }
      resolve(scriptToRemove || { id: `script-${id}` })
    }
  })
}

export default loadScript
