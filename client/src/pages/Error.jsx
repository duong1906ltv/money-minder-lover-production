import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/404.jpg";
const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh! 404 not found</h3>
          <p>Có vẻ dd ốm đã cho nn béo ăn quá nhiều</p>
          <Link to="/">back home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>something went wrong</h3>
      </div>
    </Wrapper>
  );
};
export default Error;
