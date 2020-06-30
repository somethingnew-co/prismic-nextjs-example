import { NextApiRequest, NextApiResponse } from 'next'
import { prismicClient } from 'lib/prismic'
import { linkResolver } from 'lib/prismic/resolvers'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  const { token: ref, documentId } = req.query

  // Check the token parameter against the Prismic SDK
  const url = await prismicClient.getPreviewResolver(ref as string, documentId as string).resolve(linkResolver, '/')

  if (!url) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({ ref })

  /*
   * Redirect the user to the share endpoint from same origin. This is
   * necessary due to a Chrome bug:
   * https://bugs.chromium.org/p/chromium/issues/detail?id=696204
   */
  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>`,
  )

  res.end()
}
