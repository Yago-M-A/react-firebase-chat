import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 50rem;
  height: 26rem;
  border: 2px solid white;
  border-radius: 10px;
  padding: 2rem 2rem;
  box-shadow: 0 0 10px #f231a5;
`

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 10rem;
    height: 3rem;
    font-size: 1.5rem;
    font-weight: bold;
    background-color: #f231a5;
    color: white;
    border-radius: 5px;
    border: none;
    box-shadow: 0 0 5px white;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }

    &:hover {
      filter: brightness(0.8);
    }
  }
`
