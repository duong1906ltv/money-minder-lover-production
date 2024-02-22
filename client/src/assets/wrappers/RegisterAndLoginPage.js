import styled from 'styled-components'

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  .logo {
    img {
      display: block;
      width: 100px;
      height: 100px;
      margin: 0 auto;
      margin-bottom: 1.38rem;
      object-fit: cover;
      border: 2px solid var(--primary-500);
      border-radius: 50%;
    }
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`
export default Wrapper
