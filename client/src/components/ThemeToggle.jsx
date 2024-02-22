import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Wrapper from "../assets/wrappers/ThemeToggle";
import { useSharedLayoutContext } from "../pages/SharedLayout";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useSharedLayoutContext();
  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className="toggle-icon" />
      ) : (
        <BsFillMoonFill />
      )}
    </Wrapper>
  );
};
export default ThemeToggle;
