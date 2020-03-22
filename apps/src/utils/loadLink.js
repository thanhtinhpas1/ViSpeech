const loadLink = (url, id, action) => {
  return new Promise((resolve, reject) => {
    if (action === 'on') {
      let ready = false
      if (!document) {
        reject(new Error('Document was not defined'))
      }
      let tag = document.getElementsByTagName('link')
      tag = document.getElementsByTagName('link')[tag.length - 1]

      const linkToLoad = document.getElementById(`link-${id}`)
      if (linkToLoad) {
        resolve(linkToLoad)
      } else {
        const link = document.createElement('link')
        link.id = `link-${id}`
        link.rel = 'stylesheet'
        link.type = 'text/css'
        link.href = url
        link.async = true
        link.media = 'all'
        link.onreadystatechange = () => {
          if (!ready && (!window.readyState || window.readyState === 'complete')) {
            ready = true
            resolve(link)
          }
        }
        link.onload = link.onreadystatechange

        link.onerror = msg => {
          console.log(msg)
          reject(new Error('Error loading link.'))
        }

        link.onabort = msg => {
          console.log(msg)
          reject(new Error('Link loading aborted.'))
        }

        if (tag.parentNode != null) {
          tag.parentNode.append(link, tag)
        }
      }
    } else {
      const linkToRemove = document.getElementById(`link-${id}`)
      if (linkToRemove) {
        linkToRemove.parentNode.removeChild(linkToRemove)
      }
      resolve(linkToRemove || { id: `link-${id}` })
    }
  })
}

export default loadLink
