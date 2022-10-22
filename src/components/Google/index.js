import Logo from "./components/Logo";
import WordBox from "./components/WordBox";
import Button from "./components/Button";
import LanguageNote from "./components/LanguageNote";
import "./index.css";

const Google = () => {
  return (
    <div className="container">
      <Logo />
      <br></br>
      <br></br>
      <WordBox />
      <Button />
      <LanguageNote />
    </div>
  );
};

export default Google;
