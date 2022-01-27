import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 2px solid #f231a5;
  padding: 0.5rem;
`

export const Logo = styled.div`
  svg {
    font-size: 4rem;
    color: #f231a5;
    margin-left: 1rem;
  }
`

export const Nav = styled.div`
  font-size: 2rem;

  a {
    text-decoration: none;
    color: white;
    margin-right: 1.5rem;
    transition: 0.3s;

    &:hover {
      color: #f231a5;
    }
  }

  button {
    margin: 0 2rem;
    background-color: #f231a5;
    color: white;
    width: 8rem;
    height: 3rem;
    border-radius: 10px;
    border: none;
    transition: filter 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      filter: brightness(0.8);
    }
  }
`
