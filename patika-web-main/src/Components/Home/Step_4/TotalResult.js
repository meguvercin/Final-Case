import { Card, CardActionArea, CardContent, Grid } from "@mui/material";
import styles from "./TotalResult.module.css";
import { useSelector } from "react-redux";

const TotalResult = (props) => {
  const oceanContent = useSelector((state) => state.content.oceanContent);
  const surveyContent = useSelector((state) => state.content.surveyContent);

  return (
    <div classname={styles.totalResultContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={6}>
          <div className={styles.oceanResultsHalf}>
            <h1 style={{ marginBottom: "1rem", color: "var(--red)" }}>
              Ocean Testi Sonuçları
            </h1>
            <p>
              Müşterinin kişiliği {oceanContent.customerClass}. sınıfa ait.{" "}
              {oceanContent.oceanComment}
            </p>
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <div className={styles.surveyResultsHalf}>
            <h1 style={{ marginBottom: "1rem", color: "var(--red)" }}>
              Anket Yorumu
            </h1>
            <p>{surveyContent.comment}</p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <h2
            style={{
              textAlign: "center",
              width: "100%",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            KAMPANYA ÖNERİLERİ
          </h2>
          <Grid container spacing={2}>
            {/* Cards */}
            <Grid item xs={12} md={6} lg={4}>
              <Card
                sx={{
                  width: "100% !important",
                  height: "150px",
                  textAlign: "center",
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <h2>{surveyContent.campaigns[0]}</h2>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                sx={{
                  width: "100% !important",
                  height: "150px",
                  textAlign: "center",
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <h2>{surveyContent.campaigns[1]}</h2>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                sx={{
                  width: "100% !important",
                  height: "150px",
                  textAlign: "center",
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <h2>{surveyContent.campaigns[2]}</h2>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card
                sx={{
                  width: "100% !important",
                  height: "150px",
                  textAlign: "center",
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <h2>{surveyContent.campaigns[3]}</h2>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card
                sx={{
                  width: "100% !important",
                  height: "150px",
                  textAlign: "center",
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <h2>{surveyContent.campaigns[4]}</h2>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
          <button className={styles.prevButton} onClick={props.previousStep}>
            Geri
          </button>
        </Grid>
      </Grid>
    </div>
  );
};
export default TotalResult;
