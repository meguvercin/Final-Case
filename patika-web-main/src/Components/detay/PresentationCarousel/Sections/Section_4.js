import styles from "./Sections.module.css";
const Section_4 = () => {
  return (
    <div id="section_4" className={styles.sectionContainer}>
      <ul>
        <h1 style={{ marginBottom: "2rem" }}>
          Kişiselleştirilmiş Kampanya Önerisi Sistemi ile{" "}
          <strong>amacımız;</strong>
        </h1>
        <h3>
          <strong>Kısa vadede</strong> doğru kampanya önerilerinde bulunarak
          verimliliği ve müşteri memnuniyetini arttırmak
        </h3>

        <h3>
          {" "}
          Uzun vadede ise müşteri memnuniyetini maksimum tutarak müşteri kaybını
          önlemek, gelir kaybının önüne geçmektir.
        </h3>
        <h2></h2>
      </ul>
    </div>
  );
};
export default Section_4;
