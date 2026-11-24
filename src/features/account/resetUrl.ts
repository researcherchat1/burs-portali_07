import { getServerSideURL } from '@/utilities/getURL'

/** Bərpa məktubundakı link. Yerli `localhost` ünvanı 127.0.0.1 olur. */
export function passwordResetUrl(token: string) {
  const base = getServerSideURL().replace('://localhost', '://127.0.0.1')
  return `${base}/sifreni-berpa/${encodeURIComponent(token)}`
}
