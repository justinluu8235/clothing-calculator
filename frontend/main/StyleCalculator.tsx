import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { useQuery } from "react-query";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';


let ENDPOINT = "";
if (process.env.NODE_ENV === "development") {
  ENDPOINT = "http://127.0.0.1:8000";
} else {
  ENDPOINT =
    "http://clothing-calculator-env.eba-qnfpfgsz.us-west-2.elasticbeanstalk.com/";
}

const URL = `${ENDPOINT}/app/style_calculator/`;
const fetchItems = async () => {
  const result = await axios.get(URL);
  return result.data;
};

export default function StyleCalculator() {
  const { isLoading, error, data } = useQuery("style", fetchItems);
  const [selectedFabric, setSelectedFabric] = useState("");
  const [selectedQuantityRange, setSelectedQuantityRange] = useState("");
  const [selectedStyleCategory, setSelectedStyleCategory] = useState("");
  const [size, setSize] = useState("");
  const [cost, setCost] = useState("");
  useEffect(() => {
    if (data) {
      setSelectedFabric(data["fabric_types"][0].id);
      setSelectedQuantityRange(data["quantity_ranges"][0].id);
      setSelectedStyleCategory(data["style_categories"][0].id);
      setSize("3 sizes (S, M, L)");
    }
  }, [data]);
  const csrfTokenInput = document.getElementsByName(
    "csrfmiddlewaretoken"
  )[0] as HTMLInputElement;
  const CSRF_TOKEN = csrfTokenInput.value;
  const handleCalculate = () => {
    const calcData = {
      fabric_type: selectedFabric,
      quantity_range: selectedQuantityRange,
      style_category: selectedStyleCategory,
      size: size,
    };
    axios
      .post(URL, calcData, {
        headers: {
          "X-CSRFToken": CSRF_TOKEN,
        },
      })
      .then((response) => {
        console.log("response", response);
        setCost(response.data.estimated_cost);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const getStyleLabel = (styleId) => {
    if(data){
        const selectedStyleType = data['style_categories'].filter((styleType) => {return styleId == styleType.id})

        return selectedStyleType[0].label
    }
  }

//   const imageExists = (style) => {
//     const image_url = `../../static/style_pics/${style}.png`
//     var http = new XMLHttpRequest();
//
//     http.open('HEAD', image_url, false);
//     http.send();
//
//     return http.status != 404;
//
// }

  return (
    <Stack alignItems="center" useFlexGap gap="40px" sx={{marginTop:'35px'}}>
    {selectedStyleCategory  && (
          <img style={{width: '200px', height: '200px', border: "1px solid grey"}}
          src={`../../static/style_pics/${getStyleLabel(selectedStyleCategory)}.png`}
            />
        )}

      <Stack direction="row">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={selectedFabric}
            onChange={(e) => setSelectedFabric(e.target.value)}
          >
            {data &&
              data["fabric_types"].map((fabricType) => {
                return (
                  <MenuItem value={fabricType.id}>{fabricType.label}</MenuItem>
                );
              })}
          </Select>
          <FormHelperText>fabric type</FormHelperText>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={selectedQuantityRange}
            onChange={(e) => setSelectedQuantityRange(e.target.value)}
          >
            {data &&
              data["quantity_ranges"].map((quantityRange) => {
                return (
                  <MenuItem value={quantityRange.id}>
                    {quantityRange.label}
                  </MenuItem>
                );
              })}
          </Select>
          <FormHelperText>quantity range</FormHelperText>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select value={size} onChange={(e) => setSize(e.target.value)}>
            {["3 sizes (S, M, L)", "5 sizes (XS, S, M, L, XL)"].map((size) => {
              return <MenuItem value={size}>{size}</MenuItem>;
            })}
          </Select>
          <FormHelperText>size</FormHelperText>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={selectedStyleCategory}
            onChange={(e) => setSelectedStyleCategory(e.target.value)}
          >
            {data &&
              data["style_categories"].map((styleCategory) => {
                return (
                  <MenuItem value={styleCategory.id}>
                    {styleCategory.label}
                  </MenuItem>
                );
              })}
          </Select>
          <FormHelperText>style category</FormHelperText>
        </FormControl>
      </Stack>

      <Button variant="outlined" onClick={handleCalculate}>
        Calculate
      </Button>
      {cost &&
//       <Box
//       sx={{
//           width: 500,
//           border: "1px solid grey",
//           borderRadius: "10px",
//           padding: "10px",
//           "&:hover": {
//             border: "1px solid blue",
//           },
//       }}
//     >
    <Typography variant="h1" component="h2">
        {`$${cost}`}
      </Typography>
//     </Box>
      }


    </Stack>
  );
}
