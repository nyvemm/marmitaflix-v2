import { baseUrl } from '@/constants/api'

export const extractSlugFromLink = (link: string): string => {
  return link.replace(baseUrl, '')
}
