import styled, { css } from 'styled-components'
import { generateMedia } from 'styled-media-query'

const customMedia = generateMedia({
  sm: '576px'
})

type wrapperProps = {
  selected?: string
}

export const Wrapper = styled.div<wrapperProps>`
  margin-bottom: 1rem;
  padding: 1rem;
  cursor: pointer;
  ${({ selected }) => css`
    background: ${selected ? '#1A5F7A' : null};
  `}

  ${customMedia.lessThan('sm')`
    display: none;
  `}
`

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

export const Details = styled.div`
  display: flex;
  align-items: center;

  h4 {
    margin-left: 1rem;
  }

  small {
    margin-left: 1rem;
    background: #f231a5;
    color: white;
    padding: 0.2rem 0.4rem;
    border-radius: 1rem;
  }
`

export const Avatar = styled.div`
  img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: 1px solid red;
  }
`

type StatusProps = {
  online: boolean
}

const wrapperStatus = {
  online: () => css`
    background: #34eb52;
  `,
  offline: () => css`
    background: red;
  `
}

export const Status = styled.div<StatusProps>`
  ${({ online }) => css`
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    ${online ? wrapperStatus.online() : wrapperStatus.offline()}
  `}
`
export const Truncate = styled.p`
  font-size: 1.4rem;
  white-space: nowrap;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;

  strong {
    margin-right: 1rem;
  }
`

type smwrapperProps = {
  selected?: string
}

export const SMWrapper = styled.div<smwrapperProps>`
  ${({ selected }) => css`
    background: ${selected ? '#1A5F7A' : null};
    img {
      display: none;
    }

    ${customMedia.lessThan('sm')`
    padding: 1rem 0;
    text-align: center;
    cursor: pointer;

    img {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      border: 1px solid red;
      display: inline-block;
    }
  `}
  `}
`
