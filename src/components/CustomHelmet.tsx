import * as React from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  title: string
  description: string
  overrideDescription?: string
}

export default function CustomHelmet({ title, description, overrideDescription }: Props) {
  return (
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: overrideDescription || title },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        // { property: 'og:image', content: image },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        // { name: 'twitter:image', content: image },
      ]}
    />
  )
}
