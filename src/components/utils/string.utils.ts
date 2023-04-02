export const removeStrings = (str?: string, stringsToRemove?: string[]): string => {
  if (typeof str !== 'string') {
    return ''
  }
  if (!stringsToRemove || stringsToRemove.length === 0) {
    return str || ''
  }
  let modifiedString = str
  let removedStringCount = 0
  stringsToRemove.forEach((string) => {
    const removedString = modifiedString.replace(new RegExp(string, 'gi'), '')
    removedStringCount += modifiedString.length - removedString.length
    modifiedString = removedString
  })
  if (removedStringCount === 0) {
    return str
  }
  return modifiedString.trim()
}

export const removeStringFromMovies = (title?: string): string => {
  return removeStrings(title, [
    'Torrent',
    'BluRay',
    'Filme',
    'Dublado',
    'Dual',
    'Audio',
    'WEB-DL',
    'WEBRip',
    'HDRip',
    'HDTV',
    'Legendado',
    'Legendada',
    'Google Drive',
    '4K',
    '1080p',
    '720p',
    'Assistir Online',
    'Áudio',
    'Audio',
    'Desenho',
    'Completa',
    'Completo',
    'Ultra HD',
    'Terabox',
    'Série',
    'Séries',
    '/',
    '|',
  ])
}
