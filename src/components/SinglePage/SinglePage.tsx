import * as S from './SinglePage.styled'

import { ActivityIndicator } from '../ActivityIndicator/ActivityIndicator'
import { FaMagnet } from 'react-icons/fa'
import { MovieModel } from '@/models'
import axios from 'axios'
import { removeStringFromMovies } from '../utils/string.utils'
import { toast } from 'react-hot-toast'
import { useQuery } from 'react-query'

export type SinglePageProps = {
  slug: string
}

const baseUrl = 'https://gomarmitaflix.herokuapp.com'

export const SinglePage = ({ slug }: SinglePageProps) => {
  const { data, isLoading, error } = useQuery(['movie', slug], async () => {
    const { data } = await axios.get<MovieModel>(`${baseUrl}/movies/${slug}`)
    return data
  })

  if (isLoading)
    return (
      <S.SinglePageContent>
        <ActivityIndicator />
      </S.SinglePageContent>
    )

  const onCopyLinkToClipboard = (link: string) => {
    navigator.clipboard.writeText(link)
    toast('Link copiado para a área de transferência')
  }

  const onOpenLink = (link: string) => {
    window.open(link, '_self')
  }

  const onOpenImage = (title?: string) => {
    window.open(`https://www.google.com/search?q=${title}`, '_blank')
  }

  return (
    <S.SinglePageContainer>
      <S.SinglePageImage src={data?.image} alt={data?.title} onClick={() => onOpenImage(data?.title)} />
      <S.SinglePageContent>
        <S.SinglePageTitle onClick={() => onOpenImage(removeStringFromMovies(data?.title))}>
          {removeStringFromMovies(data?.title)}
        </S.SinglePageTitle>
        <S.SinglePageDescription>{data?.description?.slice(0, 215)?.concat('...')}</S.SinglePageDescription>
        {data?.links?.map((link) => (
          <S.SinglePageLinkContainer>
            <S.SinglePageLinkTitle>{link.label}</S.SinglePageLinkTitle>
            <S.SinglePageLinkGroup>
              <S.SinglePageLinkButton onClick={() => onCopyLinkToClipboard(link.link)}>
                <FaMagnet />
              </S.SinglePageLinkButton>
              <S.SinglePageLinkButton onClick={() => onOpenLink(link.link)}>Baixar</S.SinglePageLinkButton>
            </S.SinglePageLinkGroup>
          </S.SinglePageLinkContainer>
        ))}
        <S.EmbedContainer>
          <S.Embed
            src={data?.embed}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </S.EmbedContainer>
      </S.SinglePageContent>
    </S.SinglePageContainer>
  )
}
