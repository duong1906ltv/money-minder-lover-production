import styled from "styled-components";

const Wrapper = styled.section`
  height: 80vh;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);
  border-radius: 6px;
  overflow: hidden;
  header {
    width: 100%;
    height: 80px;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(44, 177, 188, 0.4);
    .date {
      h1 {
        margin-bottom: 5px;
        font-size: 18px;
        font-weight: 700;
        color: black;
      }
      p {
        font-size: 14px;
        font-weight: 400;
        color: #566573;
      }
    }
    .filters {
      display: flex;
      gap: 30px;
      .date-filter {
        padding: 8px;
        display: flex;
        align-items: center;
        gap: 20px;
        border: 2px solid #ececec;
        border-radius: 6px;
        background-color: var(--background-secondary-color);
        .btn-back {
          margin-top: 2px;
        }
        .btn-date {
        }
        .btn-forward {
          margin-top: 2px;
        }
      }
      .type-filter {
        // width: 200px;
        // padding: 8px;
        // display: flex;
        // align-items: center;
        // gap: 20px;
        // border: 2px solid #ececec;
        // border-radius: 6px;
        // background-color: var(--background-secondary-color);
        // .btn-type {
        //   padding-left: 10px;
        // }
        // type-select {
        //   width: 500px;
        // }
      }
    }
  };
  // main {
  //   width: 1150px;
  // }
`;
export default Wrapper;
