import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
function DisplayIndex() {
  const [words] = useState(["Online", "Exam", "System"]);
  const [wordsIndex, setWordsIndex] = useState(0);
  const [text, setText] = useState("");
  const [isdel, setIsDel] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(400);
  const ref = useRef()

  function typing() {
    const current = wordsIndex % words.length;
    const fullTxt = words[current];
    if (isdel) {
      setText(fullTxt.substring(0, text.length - 1));
    } else {
      setText(fullTxt.substring(0, text.length + 1));
    }
    if (!isdel) {
      setTypeSpeed(typeSpeed / 2);
    }

    if (!isdel && text === fullTxt) {
      setTypeSpeed(400);
      setIsDel(true);
    } else if (isdel && text === "") {
      setWordsIndex(wordsIndex + 1);
      setIsDel(false);
      setTypeSpeed(600);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => typing(), typeSpeed);
    ref.current = timer;
    return () => {
      clearInterval(ref.current);
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
