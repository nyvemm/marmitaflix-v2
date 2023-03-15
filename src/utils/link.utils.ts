import { baseUrl } from '@/constants/api'

export const getSlugFromLink = (link: string): string => {
  return link.replace(baseUrl, '')
}
