import styled from 'styled-components'
import media from 'styled-media-query'

export const Main = styled.div`
  width: 100%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 20rem;
    color: #f231a5;

    ${media.lessThan('medium')`
      font-size: 10rem;
    `}
  }
`
