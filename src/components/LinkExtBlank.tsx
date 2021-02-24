import React, { Fragment } from 'react'

interface Props {
  url: string
  br: boolean
}

const LinkExtBlank = ({ url, br }: Props) => {
  return (
    <Fragment>
      <a href={url} rel="noopener noreferrer" target="_blank">
        {url}
      </a>
      {br && <br />}
    </Fragment>
  )
}

export default LinkExtBlank
