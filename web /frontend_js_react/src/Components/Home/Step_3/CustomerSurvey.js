"use client";
import { SurveyAnswers, SurveyQuestions } from "@/Data/question_data";
import styles from "./CustomerSurvey.module.css";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { pink } from "@mui/material/colors";
import { useTheme } from "@emotion/react";
import { postSurveyAnswers } from "@/Redux/content";
import { useDispatch, useSelector } from "react-redux";
import getPrompt from "@/Util/getPrompt";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const CustomerSurvey = (props) => {
  const questions = SurveyQuestions;
  const [answers, setAnswers] = useState(SurveyAnswers);
  const [answersUpdated, setAnswersUpdated] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const theme = useTheme();
  const dispatch = useDispatch();
  const survanswers = useSelector((state) => state.content.surveyContent);
  const oceanContent = useSelector((state) => state.content.oceanContent);

  const inputChangeHandler = (e, questionCode) => {
    setAnswersUpdated(!answersUpdated);
    answers.find((answer) => answer.question_code == questionCode).answer =
      e.target.value;
  };

  const handleSelectChange = (event, question_code, maxLength) => {
    setAnswersUpdated(!answersUpdated);
    const {
      target: { value },
    } = event;

    let oldAnswers = answers;
    let answerToPut = typeof value === "string" ? value.split(",") : value;

    if (answerToPut.length > maxLength) {
      return false;
    }

    oldAnswers.find((answer) => answer.question_code == question_code).answer =
      answerToPut;

    //setAnswers(oldAnswers);

    setAnswers(oldAnswers);

    // On autofill we get a stringified value.
  };
  const handleChange = (event) => {
    let newAnswers = [...answers];

    let answerToChange = answers.find(
      (elem) => elem.question_code == event.target.dataset.questioncode
    );
    let answerToUpdate = newAnswers.find((elem) => elem == answerToChange);
    if (typeof answerToUpdate.answer === "number") {
      answerToUpdate.answer = Number.parseInt(event.target.value);
    } else {
      answerToUpdate.answer = event.target.value;
    }

    setAnswers(newAnswers);
    const questionId = event.target.dataset.questionid;
    const elem2 = document.getElementById(
      `surveyQuestion-${Number.parseInt(questionId) + 1}`
    );

    const elem = document
      .getElementById(`vertical-tabpanel-2`)
      .scrollBy(0, elem2 != undefined && elem2.scrollHeight + 8);
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
    const groupOneAnswers = answers.filter(
      (answer) => answer.question_group == 1
    );
    const groupTwoAnswers = answers.filter(
      (answer) => answer.question_group == 2
    );
    const groupThreeAnswers = answers.filter(
      (answer) => answer.question_group == 3
    );

    if (
      groupOneAnswers.every((answer) => answer.answer != 0) &&
      groupTwoAnswers.every((answer) => answer.answer != "") &&
      groupThreeAnswers.every((answer) => answer.answer != [])
    ) {
      //now we can submit
      // oceanComment, oceanCampaigns, questions, answers;
      const tempQuestions = [];
      const tempAnswers = [];

      questions.forEach((question) => tempQuestions.push(question.question));
      answers.forEach((answer) => tempAnswers.push(answer.answer));

      const prompt = getPrompt(
        oceanContent.comment,
        oceanContent.campaigns,
        tempQuestions,
        tempAnswers
      );
      dispatch(
        postSurveyAnswers({
          prompt,
        })
      );
      console.log(prompt);

      props.nextStep();
    } else {
      window.alert("önce doldur");
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.customerSurveyContainer}>
      <h1 style={{ textAlign: "center" }}>Müşteri Anketi</h1>
      {questions.map((question) => {
        return (
          <div
            className={styles.question}
            id={`surveyQuestion-${question.id}`}
            key={question.id}
            isCompleted={
              answers.find(
                (elem) => elem.question_code == question.question_code
              ).answer != 0
                ? "true"
                : "false"
            }
          >
            <label className={styles.questionText}>{`Soru ${question.id + 1}: ${
              question.question
            }`}</label>
            {question.question_group == 1 && (
              <div className={styles.radioInputContainer}>
                <p>Hiç Memnun değilim</p>
                <Radio
                  {...controlProps(question.id, question.question_code, "1")}
                />
                <Radio
                  {...controlProps(question.id, question.question_code, "2")}
                  color="secondary"
                />
                <Radio
                  {...controlProps(question.id, question.question_code, "3")}
                  color="success"
                />
                <Radio
                  {...controlProps(question.id, question.question_code, "4")}
                  color="default"
                />
                <Radio
                  {...controlProps(question.id, question.question_code, "5")}
                  sx={{
                    color: pink[800],
                    "&.Mui-checked": {
                      color: pink[600],
                    },
                  }}
                />
                <p>Çok memnunum</p>
              </div>
            )}
            {question.question_group == 2 && (
              <div style={{ marginTop: "1rem" }}>
                <FormControl required>
                  <Tooltip title="Add" arrow></Tooltip>
                  <InputLabel id="demo-multiple-chip-label">
                    Seçiniz{" "}
                  </InputLabel>

                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={
                      answers.find(
                        (answer) =>
                          answer.question_code == question.question_code
                      ).answer
                    }
                    data-questioncode={question.question_code}
                    onChange={(e) =>
                      handleSelectChange(
                        e,
                        question.question_code,
                        question.max
                      )
                    }
                    input={
                      <OutlinedInput
                        sx={{ width: "300px" }}
                        id="select-multiple-chip"
                        label="Seçiniz"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {question.options.map((option) => (
                      <MenuItem key={option.id} value={option.option}>
                        {option.option.substring(0, 100)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
            {question.question_group == 3 && (
              <div className={styles.surveyTextInputContainer}>
                <TextField
                  required
                  onInput={(e) => {
                    inputChangeHandler(e, question.question_code);
                  }}
                  value={
                    answers.find(
                      (answer) => answer.question_code == question.question_code
                    ).answer
                  }
                  inputProps={{ maxLength: 100 }}
                  helperText="En fazla 100 karakter"
                  id="demo-helper-text-misaligned"
                  label="Cevabınız"
                  fullWidth
                  sx={{
                    minWidth: "400px !important",
                    marginTop: "1.25rem",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
      <div className={styles.buttonContainer}>
        <button
          onClick={props.previousStep}
          type="button"
          className={styles.prevButton}
        >
          Geri
        </button>
        <button type="submit" className={styles.nextButton}>
          Anketi Gönder
        </button>
      </div>
    </form>
  );
};
export default CustomerSurvey;
