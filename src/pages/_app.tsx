import { QueryClient, QueryClientProvider } from 'react-query'

import type { AppProps } from 'next/app'
import GlobalStyles from '@/styles/globals'
import Head from 'next/head'

const client = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <Head>
        <title>Marmitaflix</title>
        <meta name="keywords" content="filmes, séries, download, torrents, marmitaflix" />
        <meta name="description" content="Baixe filmes e séries de forma simples e rápida utilizando torrents, venha conhecer o mundo da pirataria." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Marmitaflix" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://marmitaflix.vercel.app" />
        <meta property="og:description" content="Baixe filmes e séries de forma simples e rápida utilizando torrents, venha conhecer o mundo da pirataria." />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Marmitaflix" />
        <meta property="twitter:image" content="/og-image.png" />
        <meta property="twitter:url" content="https://marmitaflix.vercel.app" />
        <meta property="twitter:description" content="Baixe filmes e séries de forma simples e rápida utilizando torrents, venha conhecer o mundo da pirataria." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://marmitaflix.vercel.app" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
