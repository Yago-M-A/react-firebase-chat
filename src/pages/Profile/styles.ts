import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 50rem;
  box-shadow: 0.1rem 0.2rem 1rem #f231a5;
  padding: 1rem 2rem;
  border-radius: 5px;
`
export const Overlay = styled.div`
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  svg {
    width: 2.5rem;
    height: 2.5rem;
    color: #f231a5;
    cursor: pointer;
  }

  input {
    display: none;
  }
`

export const Image = styled.div`
  position: relative;
  margin-right: 2rem;

  &:hover {
    img {
      opacity: 0.4;
    }

    ${Overlay} {
      opacity: 1;
    }
  }

  img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    border: 1px solid #f231a5;
  }
`

export const Info = styled.div`
  flex-grow: 1;
  text-align: left;

  h3 {
    font-size: 2rem;
  }

  p {
    font-size: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 3rem;
  }
`
