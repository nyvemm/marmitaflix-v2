import axios from 'axios'

async function fetchHtml(url: string): Promise<string> {
  const { data: html } = await axios.get<string>(url)
  return html
}

export default {
  fetchHtml,
}
