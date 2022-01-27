import styled, { css } from 'styled-components'
import media, { generateMedia } from 'styled-media-query'

const customMedia = generateMedia({
  sm: '576px'
})

type WrapperProps = {
  own: string
  send: string
}

const wrapper = {
  own: () => css`
    text-align: right;
  `,
  me: () => css`
    p {
      background-color: #0084ff;
      color: white;
    }
  `,
  friend: () => css`
    p {
      background-color: #333;
    }
  `
}
export const Wrapper = styled.div<WrapperProps>`
  ${({ own, send }) => css`
    margin-top: 0.5rem;
    padding: 0 0.5rem;

    img {
      width: 100%;
      border-radius: 5px;
    }

    p {
      padding: 1rem;
      display: inline-block;
      max-width: 50%;
      text-align: left;
      border-radius: 5px;
    }

    ${media.lessThan('medium')`
      p {
        max-width: 75%;
      }
    `}

    ${customMedia.lessThan('sm')`
      p {
        max-width: 100%;
      }
    `}

    small {
      display: inline-block;
      margin-top: 1.5rem;
      opacity: 0.8;
    }

    ${own === 'own' && wrapper.own()}
    ${send === 'me' && wrapper.me()}
    ${send === 'friend' && wrapper.friend()}
  `}
`
