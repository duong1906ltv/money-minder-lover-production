import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { useSharedLayoutContext } from "../pages/SharedLayout";
const BigSidebar = () => {
  const { showSidebar } = useSharedLayoutContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
