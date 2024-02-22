import styled from 'styled-components'

const Wrapper = styled.div`
  .chat-btn {
    width: 60px;
    height: 60px;
    margin: 0 10px 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-500);
    border-color: var(--primary-500);
    &:hover {
      border-color: var(--primary-600) !important;
    }
  }
`
export default Wrapper
