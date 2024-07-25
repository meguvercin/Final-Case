import { BarChart } from "@mui/x-charts";
import styles from "./OceanResults.module.css";
import { useSelector } from "react-redux";

const OceanResults = (props) => {
  const oceanContent = useSelector((state) => state.content.oceanContent);
  const campaigns = Object.values(oceanContent.campaigns);
  console.log();

  const series = [
    {
      label: "Açıklık",
      data: [oceanContent.results.O],
    },
    {
      label: "Sorumluluk",
      data: [oceanContent.results.C],
    },
    {
      label: "DışaDönüklük",
      data: [oceanContent.results.E],
    },
    {
      label: "Uyumluluk",
      data: [oceanContent.results.A],
    },
    {
      label: "Duygusal Denge",
      data: [oceanContent.results.N],
    },
  ];
  const valueFormatter = (value) => `${value * 20}`;
  console.log(campaigns);
  return (
    <div className={styles.oceanResultsContainer}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Ocean Testi Sonuçları
      </h1>
      <p>
        Müşterinin kişiliği {oceanContent.customerClass}. sınıfa ait.{" "}
        {oceanContent.oceanComment}
      </p>
      <ul className={styles.list}>
        <h4 style={{ marginBottom: "1rem" }}>
          Kişilik Özellikleri dikkate alınarak önerilebilecek kampanyalar:
        </h4>
        {campaigns.map((elem) => (
          <li>{elem}</li>
        ))}
      </ul>
      {/* <Image
        className={styles.resultFig}
        src="/result.png"
        alt="result"
        width={1000}
        height={1000}
        priority
      /> */}
      <BarChart
        height={300}
        margin={{
          left: 75,

          top: 100,
        }}
        layout="horizontal"
        yAxis={[
          {
            scaleType: "band",
            data: ["O.C.E.A.N."],
          },
        ]}
        xAxis={[{ valueFormatter }]}
        series={series.map((s) => ({
          ...s,
          data: s.data.slice(0, 1),
          valueFormatter,
        }))}
      />
      <div className={styles.buttons}>
        <button onClick={props.previousStep} className={styles.prevButton}>
          Geri
        </button>
        <button onClick={props.nextStep} className={styles.nextButton}>
          Sonraki
        </button>
      </div>
    </div>
  );
};

export default OceanResults;
