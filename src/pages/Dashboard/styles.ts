import styled from 'styled-components'
import media, { generateMedia } from 'styled-media-query'

const customMedia = generateMedia({
  sm: '576px'
})

export const Wrapper = styled.div`
  margin-top: 1rem;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 3fr;
  overflow: hidden;
  height: calc(100vh - 7rem);
  width: 100vw;

  ${media.lessThan('medium')`
    grid-template-columns: 2fr 3fr;
  `}

  ${customMedia.lessThan('sm')`
    grid-template-columns: 1fr 5fr;
  `}
`

export const UsersContainer = styled.div`
  margin-top: 1rem;
  border-right: 2px solid #f231a5;
  overflow: auto;
`

export const MessageContainer = styled.div`
  position: relative;
  width: 100%;
`

export const MessageUser = styled.div`
  padding: 1rem;
  text-align: center;
  border-bottom: 2px solid #f231a5;
`

export const Conv = styled.div`
  font-size: 2rem;
  color: white;
  text-align: center;
`
export const Messages = styled.div`
  height: calc(100vh - 20rem);
  overflow-y: auto;
  border-bottom: 1px solid #f231a5;
`
