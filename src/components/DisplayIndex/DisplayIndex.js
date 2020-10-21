import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
function DisplayIndex() {
  const [words, setWords] = useState(["Online", "Exam", "System"]);
  const [wordsIndex, setWordsIndex] = useState(0);
  const [text, setText] = useState("");
  const [isdel, setIsDel] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(300);
  let timer = null;

  function typing() {
    const current = wordsIndex % words.length;
    const fullTxt = words[current];
    if (isdel) {
      setText(fullTxt.substring(0, text.length - 1));
    } else {
      setText(fullTxt.substring(0, text.length + 1));
      // console.log(text);
    }
    if (!isdel) {
      setTypeSpeed(typeSpeed / 2);
    }

    if (!isdel && text === fullTxt) {
      setTypeSpeed(300);
      setIsDel(true);
    } else if (isdel && text === "") {
      setWordsIndex(wordsIndex + 1);
      setIsDel(false);
      setTypeSpeed(500);
    }
  }

  useEffect(() => {
    timer = setInterval(() => typing(), typeSpeed);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <div className="display-wrapper">
      <div className="auto-type">
        welcome to <span className="auto-text">{text}</span>
      </div>
      <p>欢迎来到在线考试系统</p>
      <Link to="/login">
        <Button variant="contained" className="btn">
          立即使用
          <ChevronRightIcon />
        </Button>
      </Link>
    </div>
  );
}

export default DisplayIndex;
