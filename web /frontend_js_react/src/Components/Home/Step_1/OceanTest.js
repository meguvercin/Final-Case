import { Radio } from "@mui/material";
import styles from "./OceanTest.module.css";
import { green, red } from "@mui/material/colors";
import { useState } from "react";
import { OceanTestAnswers, OceanTestQuestions } from "@/Data/question_data";
import { useDispatch } from "react-redux";
import { postOceanAnswers } from "@/Redux/content";

const OceanTest = (props) => {
  const questions = OceanTestQuestions;
  const [answers, setAnswers] = useState(OceanTestAnswers);
  const dispatch = useDispatch();
  const generateRandomAnswers = (e) => {
    e.preventDefault();

    let newAnswers = [...answers];
    newAnswers.forEach((answer) => {
      answer.answer = Math.ceil(Math.random() * 5);
    });
    setAnswers(newAnswers);
    const panel = document.getElementById(`vertical-tabpanel-0`);
    panel.scrollBy(0, panel.scrollHeight);
  };

  const handleChange = (event) => {
    let newAnswers = [...answers];

    let answerToChange = answers.find(
      (elem) => elem.question_code == event.target.dataset.questioncode
    );
    newAnswers.find((elem) => elem == answerToChange).answer = Number.parseInt(
      event.target.value
    );

    setAnswers(newAnswers);
    const questionId = event.target.dataset.questionid;
    const elem2 = document.getElementById(
      `question-${Number.parseInt(questionId) + 1}`
    );
    const elem = document
      .getElementById(`vertical-tabpanel-0`)
      .scrollBy(0, elem2.scrollHeight + 8);
  };

  const controlProps = (questionId, questionCode, item) => ({
    checked:
      answers.find((elem) => elem.question_code == questionCode).answer == item,
    onChange: handleChange,

    value: item,
    name: "color-radio-button-demo",
    inputProps: {
      "aria-label": item,
      "data-questioncode": questionCode,
      "data-questionid": questionId,
    },
  });
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(postOceanAnswers(answers));

    props.nextStep();
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <button onClick={generateRandomAnswers} className={styles.randomButton}>
        {" "}
        Testi Rastgele Doldur
      </button>
      {questions.map((question) => {
        return (
          <div
            className={styles.question}
            isCompleted={
              answers.find(
                (elem) => elem.question_code === question.question_code
              ).answer != 0
                ? "true"
                : "false"
            }
            id={`question-${question.id}`}
            key={question.id}
          >
            <label className={styles.questionText}>{`Soru ${question.id + 1}: ${
              question.question
            }`}</label>
            <div className={styles.radioInputContainer}>
              <p>Hiç Katılmıyorum</p>
              <Radio
                {...controlProps(question.id, question.question_code, "1")}
                sx={{
                  color: red[900],
                  "&.Mui-checked": {
                    color: red[900],
                  },
                }}
              />
              <Radio
                {...controlProps(question.id, question.question_code, "2")}
                sx={{
                  color: red[600],
                  "&.Mui-checked": {
                    color: red[600],
                  },
                }}
              />
              <Radio
                {...controlProps(question.id, question.question_code, "3")}
                sx={{
                  color: green[300],
                  "&.Mui-checked": {
                    color: green[300],
                  },
                }}
              />
              <Radio
                {...controlProps(question.id, question.question_code, "4")}
                sx={{
                  color: green[600],
                  "&.Mui-checked": {
                    color: green[600],
                  },
                }}
              />
              <Radio
                {...controlProps(question.id, question.question_code, "5")}
                sx={{
                  color: green[900],
                  "&.Mui-checked": {
                    color: green[900],
                  },
                }}
              />
              <p>Kesinlikle Katılıyorum</p>
            </div>
          </div>
        );
      })}
      <div
        isdisabled={
          answers.every((elem) => elem.answer != 0) ? "false" : "true"
        }
        className={styles.tooltipContainer}
      >
        <button
          disabled={!answers.every((elem) => elem.answer != 0)}
          className={styles.submitButton}
          type="submit"
        >
          Testi Gönder
        </button>
        <span className={styles.tooltip}>
          Tüm soruları işaretlediğinizden emin olun
        </span>
      </div>
    </form>
  );
};
export default OceanTest;
