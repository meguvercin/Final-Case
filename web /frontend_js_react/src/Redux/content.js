import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  surveyContent: {
    campaigns: [
      "kampanya 1",
      "kampanya 2",
      "kampanya 3",
      "kampanya 4",
      "kampanya 5",
    ],
    comment: "",
  },
  oceanContent: {
    id: 0,
    customerClass: 0,
    oceanComment: "",
    results: {
      O: 0,
      C: 0,
      E: 0,
      A: 0,
      N: 0,
    },
    campaigns: [],
  },
  error: "",
};

export const postOceanAnswers = createAsyncThunk(
  "postOceanAnswers",
  async (json) => {
    let response = await fetch("http://127.0.0.1:5000/predict-ocean", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
    response = response.json();

    return response;
  }
);
export const postSurveyAnswers = createAsyncThunk(
  "postSurveyAnswers",
  async (json) => {
    let response = await fetch("http://127.0.0.1:5000/ask-to-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
    response = response.json();

    return response;
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOceanAnswers.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(postOceanAnswers.fulfilled, (state, action) => {
      state.loading = false;

      state.oceanContent = action.payload;
    });
    builder.addCase(postOceanAnswers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(postSurveyAnswers.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(postSurveyAnswers.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.surveyContent = action.payload;
    });
    builder.addCase(postSurveyAnswers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default contentSlice;
export const contentActions = contentSlice.actions;
