import React from 'react';
import style from "../styles/ReviewBox.module.css";
import { useState, useEffect, useRef } from "react";

function ReviewBox() {
  // 파일의 리뷰들을 담고 하나씩 보여주기 위한 state들
  const [sentences, setSentences] = useState([]);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [sentence, setSentence] = useState("");
  // 선택한 term에 대한 state들
  const [search, setSearch] = useState("");
  const [emotion, setEmotion] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  // xml구조를 위한 state들
  const [temp, setTemp] = useState("");
  const [temp2, setTemp2] = useState("");
  const sentenceFile = useRef();
  const sentenceBox = useRef();
  const emo1 = useRef();
  const emo2 = useRef();

  const init = () => {
    initEmotion();
    setEmotion(null);
    setSearch("");
    setStart(0);
    setEnd(0);
  }

  const initTerm = () => {
    sentenceBox.current.innerHTML = sentence;
  }

  const initEmotion = () => {
    emo1.current.checked = false;
    emo2.current.checked = false;
  }

  const searchTerm = () => {
    const searchText = getSelection();
    let [startTemp, endTemp] = [searchText.anchorOffset, searchText.focusOffset];
    if (startTemp > endTemp) [startTemp, endTemp] = [endTemp, startTemp]
    const searchTemp = sentence.slice(startTemp, endTemp);
    setStart(startTemp);
    setEnd(endTemp);
    setSearch(searchTemp);
    const tempArr = sentence.split("");
    tempArr.splice(endTemp, 0, "</mark>");
    tempArr.splice(startTemp, 0, "<mark>");
    sentenceBox.current.innerHTML = tempArr.join("");
  }

  const getEmotion = (e) => {
    const emotionTemp = e.target.value;
    setEmotion(emotionTemp);
  }

  const addLabel = () => {
    sentenceBox.current.innerHTML = sentence;
    const t = temp + `<aspectTerm term=”${search}” polarity=”${emotion}” from=”${start}” to=”${end}” />`;
    setTemp(t);
    init();
  }

  const nextSentence = () => {
    const nextIndex = sentenceIndex + 1;
    setSentenceIndex(nextIndex);
    setSentence(sentences[nextIndex]);
    if (temp !== "") {
      const t2 = temp2 + `<sentence><text>${sentence}</text><aspectTerms>${temp}</aspectTerms></sentence>`;
      setTemp2(t2);
      setTemp("");
      init();
    }
  }

  const exit = () => {
    console.log(temp2);
  }

  useEffect(() => {
    const input = sentenceFile.current;
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function () {
        const textArr = this.result.split("\n");
        setSentences(textArr);
        setSentence(textArr[0]);
      };
      reader.readAsText(file);
    })
  }, []);

  return (
    <section className={style.container}>
      <input type="file" className={style.textInput} ref={sentenceFile} />
      <div className={style.textBox} ref={sentenceBox}>{sentence}</div>
      <div className={style.searchBox}>
        <button type="button" onClick={initTerm} className={style.initBtn}>초기화</button>
        <button type="button" onClick={searchTerm} className={style.searchBtn}>찾기</button>
      </div>
      <div className={style.emotionBox}>
        <input type="radio" id="positive" name="emotion" value="positive" onClick={getEmotion} ref={emo1} />
        <label htmlFor="positive">긍정</label>
        <input type="radio" id="negative" name="emotion" value="negative" onClick={getEmotion} ref={emo2} />
        <label htmlFor="negative">부정</label>
      </div>
      <div className={style.addBox}>
        <button type='button' onClick={addLabel} className={style.addBtn}>추가하기</button>
        <button type="button" onClick={nextSentence} className={style.nextBtn}>다음리뷰</button>
        <button type="button" onClick={exit} className={style.exitBtn}>끝내기</button>
      </div>
    </section>
  )
}

export default ReviewBox;