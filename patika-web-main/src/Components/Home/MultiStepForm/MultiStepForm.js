import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import TabPanel from "./TabPanel";
import styles from "./MultiStepForm.module.css";
import OceanTest from "../Step_1/OceanTest";
import OceanResults from "../Step_2/OceanResults";
import CustomerSurvey from "../Step_3/CustomerSurvey";
import TotalResult from "../Step_4/TotalResult";
import { useSelector } from "react-redux";
import Spinner from "@/Components/Global/Spinner/Spinner";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const MultiStepForm = () => {
  const [value, setValue] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isWindowDefined, setIsWindowdefined] = useState(false);
  const isLoading = useSelector((state) => state.content.loading);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const nextStep = () => {
    if (!isLoading) {
      setValue(value + 1);
    }
  };
  const previousStep = () => {
    setValue(value - 1);
  };

  useEffect(() => {
    if (window != undefined) {
      if (window.innerWidth < 600) {
        setIsMobile(true);
      }

      window.addEventListener("resize", () => {
        if (window.innerWidth < 600) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      });
    }
  }, []);

  return (
    <div className={styles.multiStepFormContainer}>
      <Spinner />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          borderRadius: "16px",
          overflow: isMobile ? "scroll" : "hidden",

          display: isMobile ? "block" : "flex",

          height: "100%",
        }}
      >
        <Tabs
          orientation={isMobile ? "horizontal" : "vertical"}
          variant="scrollable"
          value={value}
          aria-label="Vertical tabs "
          TabIndicatorProps={{
            style: {
              backgroundColor: "var(--red)",
            },
          }}
          sx={{
            borderRight: 1,

            borderColor: "divider",
          }}
        >
          <Tab label="Ocean Testi" {...a11yProps(0)} />
          <Tab label="Sonuçlar " {...a11yProps(1)} />
          <Tab label="Anket" {...a11yProps(2)} />
          <Tab label="Sonuçlar ve Kampanya Önerileri" {...a11yProps(3)} />
        </Tabs>
        <TabPanel className={styles.tabPanel} value={value} index={0}>
          <OceanTest nextStep={nextStep} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OceanResults nextStep={nextStep} previousStep={previousStep} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CustomerSurvey nextStep={nextStep} previousStep={previousStep} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <TotalResult previousStep={previousStep} />
        </TabPanel>
      </Box>
    </div>
  );
};

export default MultiStepForm;
