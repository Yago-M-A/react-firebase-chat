import styled from 'styled-components'
import media, { generateMedia } from 'styled-media-query'

const customMedia = generateMedia({
  sm: '576px'
})

export const MessageForm = styled.form`
  position: absolute;
  bottom: 0;
  left: 20%;
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;

  svg {
    width: 2.5rem;
    height: 2.5rem;
    color: gray;
    cursor: pointer;
  }

  input {
    width: 40vw;
    margin: 0 1rem 1rem;
    padding: 1rem;
    border-radius: 5px;
    outline: none;
    border: none;
  }

  button {
    padding: 10px;
    border-radius: 5px;
    outline: none;
    border: 1px solid grey;
    background: #242526;
    color: white;
    cursor: pointer;
    transition: 0.3s ease-in-out all;
    font-size: 16px;
    margin-top: -1rem;

    &:hover {
      transform: scale(1.05);
    }
  }

  ${media.lessThan('medium')`
    left: 3%;
    right: 0;
    bottom: 0.5rem;
  `}

  ${customMedia.lessThan('sm')`
    input {
      width: 50vw;
      margin: 0 1rem;
    }

    button {
      margin: 0;
    }
  `}
`
