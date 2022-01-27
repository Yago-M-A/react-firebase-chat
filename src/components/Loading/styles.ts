import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Loading = styled.div`
  width: 20rem;
  height: 20rem;
  border: 8px solid gray;
  border-top: 8px solid #f231a5;
  border-radius: 50%;
  animation: is-rotate 1s infinite;

  @keyframes is-rotate {
    to {
      transform: rotate(1turn);
    }
  }
`
