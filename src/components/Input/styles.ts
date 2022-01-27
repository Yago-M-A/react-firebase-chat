import styled from 'styled-components'

export const Input = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 0.5rem;
  margin-bottom: 2rem;

  label {
    font-size: 2rem;
  }

  input {
    width: 100%;
    height: 4rem;
    margin-top: 0.4rem;
    font-size: 2rem;
    border-radius: 4px;
    padding: 0.2rem 0.2rem;
  }
`

export const Error = styled.div`
  color: red;
  font-size: 1.5rem;
  margin-top: 0.4rem;
`
