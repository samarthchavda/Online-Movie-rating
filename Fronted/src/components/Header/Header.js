import "./Header.css";

const Header = () => {
  return (
    <>
      <span onClick={() => window.scroll(0, 0)} className="header">
        🎬 Movie Mania 🎥
      </span>
    </>
  );
};

export default Header;
