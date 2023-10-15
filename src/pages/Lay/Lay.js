import React, { useEffect, useState } from "react";
import "../../styles/reset.css";
import "../../styles/global.css";
import styles from "./Lay.module.css";
import DialogBox from "../../componets/DialogBox";
import palette from "../../styles/color";
import MenuBox from "../../componets/MenuBox";
import CrushBar from "../../componets/CrushBar";
import LaySmile from "../../assets/images/Lay/lay_smile.svg";
import LayShiny from "../../assets/images/Lay/lay_shiny.svg";
import LayThinking from "../../assets/images/Lay/lay_thinking.svg";
import SolSolution from "../../assets/images/sol_solution.png";
import SolKKK from "../../assets/images/sol_kkk.png";
import ProgressBar from "../../componets/ProgressBar";
import axios from "axios";
import Quiz from "../../componets/TermQuiz";
import LayCrush from "../../componets/LayCrush";
import ReactTyped from "react-typed";
import SolutionBackground from "../../assets/images/sol_solution_bg.png";

const Lay = () => {
  const [showMenuBox, setShowMenuBox] = useState(false);
  const [showDialogBox, setShowDialogBox] = useState(true);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [showFullText, setShowFullText] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [apiData, setApiData] = useState(0);

  const LayScenario = [
    {
      index: 0,
      nextIndex: 1,
      image: LaySmile,
      dialog:
        "날 선택해줘서 고마워~ㅇㅇ아~\n 우리 같이 용어 공부 열심히 해보자!!",
      name: "레이",
      arrowColor: palette.ray_blue,
      menu: {
        show: false,
      },
      quiz: {
        show: false,
      },
      solution: {
        show: false,
      },
    },
    {
      index: 1,
      nextIndex: 2,
      image: LayShiny,
      dialog: "다음날...",
      name: "레이",
      arrowColor: palette.ray_blue,
      menu: {
        show: false,
      },
      quiz: {
        show: false,
      },
      solution: {
        show: false,
      },
    },
    {
      index: 2,
      nextIndex: "",
      image: LayThinking,
      dialog: "레이가 무슨 고민에 빠진 듯 하다..\n 가서 말을 걸어보자",
      name: "레이",
      arrowColor: palette.ray_blue,
      menu: {
        show: true,
        option: ["무슨 고민있어?", "인상 좀 펴라"],
        nextIndex: [3, 3],
      },
      quiz: {
        show: false,
      },
      solution: {
        show: false,
      },
    },
    {
      index: 3,
      nextIndex: 4,
      image: LayThinking,
      dialog: `요즘 뉴스에 ${apiData.title}을 사라는 말이 많더라고... \n그런데 ${apiData.title}이 정확하게 뭔지 모르겠어서 나 좀 도와줄래?`,
      name: "레이",
      arrowColor: palette.ray_blue,
      menu: {
        show: false,
      },
      quiz: {
        show: true,
      },
      solution: {
        show: false,
      },
    },
    {
      index: 4,
      nextIndex: 5,
      image: SolSolution,
      dialog: "내가 다시 한번 설명해주지~",
      name: "쏠",
      arrowColor: palette.sol_text,
      menu: {
        show: false,
      },
      quiz: {
        show: false,
      },
      solution: {
        show: false,
      },
    },
    {
      index: 5,
      nextIndex: 6,
      image: SolSolution,
      dialog: `${apiData.title}는(은) 한국예탁결제원에 따르면\n ${apiData.description}(이)야~`,
      name: "쏠",
      arrowColor: palette.sol_text,
      menu: {
        show: false,
      },
      quiz: {
        show: false,
      },
      solution: {
        show: false,
      },
    },
    {
      index: 6,
      nextIndex: 7,
      image: SolKKK,
      dialog:
        "하하하! 얼빠진 얼굴 하고 있네! 포기하기엔 이르다구~\n 나 쏠이가 다시 쉽게 설명해줄게~",
      name: "쏠",
      arrowColor: palette.sol_text,
      menu: {
        show: false,
      },
      quiz: {
        show: false,
      },
      solution: {
        show: false,
      },
    },
    {
      index: 7,
      nextIndex: 8,
      image: SolKKK,
      dialog: `${apiData.title}를(을) 쉽게 다시 설명하자면 \n ${apiData.explanation}(이)야~`,
      name: "쏠",
      arrowColor: palette.sol_text,
      menu: {
        show: false,
      },
      quiz: {
        show: false,
        solution: true,
      },
      solution: {
        show: true,
        apiText: `${apiData.title}는(은) 한국예탁결제원에 따르면 ${apiData.description}(이)야~`,
        managerText: `${apiData.title}를(을) 쉽게 다시 설명하자면 ${apiData.explanation}(이)야~ ${apiData.title}를(을) 쉽게 다시 설명하자면 ${apiData.explanation}(이)야~ ${apiData.title}를(을) 쉽게 다시 설명하자면 ${apiData.explanation}(이)야~ ${apiData.title}를(을) 쉽게 다시 설명하자면 ${apiData.explanation}(이)야~`,
      },
    },
  ];

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleDialogBoxClick();
    }
    console.log(e.key);
  };

  // 다음 대화로 넘기기
  const handleDialogBoxClick = () => {
    if (!showFullText) {
      setShowFullText(true);
    } else {
      setShowFullText(false);
      if (
        currentScenarioIndex < LayScenario.length - 1 &&
        LayScenario[currentScenarioIndex].quiz.show === false
      ) {
        setCurrentScenarioIndex(LayScenario[currentScenarioIndex].nextIndex);
      } else if (LayScenario[currentScenarioIndex].quiz.show === true) {
        setShowDialogBox(false); // 대화 상자 감추기
        setShowQuiz(true); // 퀴즈 화면 보이기
        setShowSolution(false); // 해설 화면 감추기
        console.log(currentScenarioIndex);
      } else if (LayScenario[currentScenarioIndex].solution.show === true) {
        setShowDialogBox(false); // 대화 상자 감추기
        setShowQuiz(false); // 퀴즈 화면 감추기
        setShowSolution(true); // 해설 화면 보이기
        console.log("해설이지롱");
      }
    }
  };

  //메뉴 클릭하기
  const handleMenuOptionClick = (option, currentIndex) => {
    if (option === "select1") {
      setCurrentScenarioIndex(currentIndex);
      setShowMenuBox(false);
    } else if (option === "select2") {
      setCurrentScenarioIndex(currentIndex);
      setShowMenuBox(false);
    }
  };

  // 용어게임 문제 API
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      ); // API_ENDPOINT_URL 대체
      //console.log(response.data);
      //문제(용어)
      const term = response.data[6];
      //console.log(term);
      setApiData(term);
      //선택지 리스트
    } catch (error) {
      //console.error("Error fetching data from API: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleQuizFinish = () => {
    setShowQuiz(false);
    setShowDialogBox(true);
    setCurrentScenarioIndex(LayScenario[currentScenarioIndex].nextIndex);
  };

  //마지막 대화가 종료된 후 1초 후에 선택지 보여주기
  useEffect(() => {
    if (LayScenario[currentScenarioIndex].menu.show) {
      const timeoutId = setTimeout(() => {
        setShowMenuBox(true);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [currentScenarioIndex]);

  return (
    <div
      key={currentScenarioIndex}
      className={`${styles.root} ${
        LayScenario[currentScenarioIndex].name === "쏠"
          ? styles.solBackground
          : LayScenario[currentScenarioIndex].name === "레이"
          ? styles.layBackground
          : ""
      }`}
    >
      <div className={styles.dialogContainer}>
        <div
          tabIndex={1}
          onClick={
            LayScenario[currentScenarioIndex] &&
            LayScenario[currentScenarioIndex].menu.show
              ? null
              : handleDialogBoxClick
          }
          onKeyDown={
            LayScenario[currentScenarioIndex] &&
            LayScenario[currentScenarioIndex].menu.show
              ? null
              : handleKeyDown
          }
        >
          {showDialogBox && (
            <div>
              {/* 프로그레스바 & 호감도 */}
              <div className={styles.top}>
                <ProgressBar character="레이" />
                <CrushBar />
              </div>

              {/* 이미지 렌더링 */}
              <div className={styles.character_wrap}>
                <img
                  src={LayScenario[currentScenarioIndex].image}
                  alt="Scenario"
                />
              </div>

              {/* 대화 상자 렌더링 */}
              <DialogBox
                name={LayScenario[currentScenarioIndex].name}
                backgroundColor={palette.main_dialog}
                arrowColor={LayScenario[currentScenarioIndex].arrowColor}
              />
              <div className={styles.dialogText}>
                {showFullText ? (
                  LayScenario[currentScenarioIndex].dialog
                ) : (
                  <ReactTyped
                    key={currentScenarioIndex}
                    strings={[LayScenario[currentScenarioIndex].dialog]}
                    typeSpeed={40}
                    onComplete={() => setShowFullText(true)}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* 메뉴 박스 렌더링 */}
        {showMenuBox && (
          <MenuBox
            select={LayScenario[currentScenarioIndex].menu}
            onOptionClick={handleMenuOptionClick}
          />
        )}

        {/* 퀴즈 화면 */}
        {showQuiz && (
          <div className={styles.top}>
            {/* 퀴즈 타이틀 */}
            <Quiz
              term={apiData.title} //용어
              list={apiData.id} //리스트 배열
              onQuizFinish={handleQuizFinish} //퀴즈 끝나면 호출
            />
            {/* 호감도 */}
            <CrushBar />
            {/* 레이 호감도 변화 */}
            {/* <LayCrush /> */}
          </div>
        )}

        {/* 호감도 변화 */}

        {/* 해설 화면 */}
        {showSolution && (
          <div>
            <img src={SolutionBackground} alt="해설 배경" />
            <div className={styles.solutionApiText}>
              {LayScenario[currentScenarioIndex].solution.apiText}
              {LayScenario[currentScenarioIndex].solution.managerText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lay;
