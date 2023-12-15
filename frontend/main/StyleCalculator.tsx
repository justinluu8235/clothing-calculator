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
import Box from "@mui/material/Box";
import { Link, Navigate } from "react-router-dom";
import getCookie from './App/utils/getCookie'


let ENDPOINT = "";
if (process.env.NODE_ENV === "development") {
  ENDPOINT = "http://127.0.0.1:8000";
} else {
  ENDPOINT =
    "http://clothing-calculator-env.eba-qnfpfgsz.us-west-2.elasticbeanstalk.com/";
}




const URL = `${ENDPOINT}/app/style_calculator/`;
const fetchItems = async ({queryKey}) => {
    const [_, currentUser] = queryKey
    if(currentUser){
        console.log('current user', currentUser)
        const { id: userId, userEmail, expiration } = currentUser;
        const result = await axios.get(`${URL}${userId}`);
        return result.data;

    }
  return null
};


interface StyleCalculatorProps {
  currentUser: any
}

export default function StyleCalculator({currentUser}: StyleCalculatorProps) {
  const { isLoading, error, data } = useQuery(["style", currentUser], fetchItems, {refetchOnMount: false}
  );
  const [selectedFabric, setSelectedFabric] = useState("");
  const [selectedQuantityRange, setSelectedQuantityRange] = useState("");
  const [selectedStyleCategory, setSelectedStyleCategory] = useState("");
  const [size, setSize] = useState("");
  const [cost, setCost] = useState("");
  useEffect(() => {
    if (data) {
      console.log("data", data);
      if (data["fabric_types"].length > 0) {
        setSelectedFabric(data["fabric_types"][0].id);
      }
      if (data["quantity_ranges"].length > 0) {
        setSelectedQuantityRange(data["quantity_ranges"][0].id);
      }
      if (data["style_categories"].length > 0) {
        setSelectedStyleCategory(`${data["style_categories"][0].id}`);
      }
      setSize("3 sizes (S, M, L)");
    }
  }, [data, currentUser]);

  const handleCalculate = () => {
    const calcData = {
      fabric_type: selectedFabric,
      quantity_range: selectedQuantityRange,
      style_category: selectedStyleCategory,
      size: size,
    };
    axios
      .post(`${URL}${currentUser.id}`, calcData, {
        headers: {
          "X-CSRFToken": getCookie('csrftoken'),
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
    if (data) {
      const selectedStyleType = data["style_categories"].filter((styleType) => {
        return styleId == styleType.id;
      });

      return selectedStyleType[0].label;
    }
  };
  console.log('data', data)
  return (
  <>{currentUser ? (
    <Stack alignItems="center" useFlexGap gap="40px" sx={{ marginTop: "35px" }}>

      {selectedStyleCategory && (
        <img
          style={{ width: "200px", height: "200px", border: "1px solid grey" }}
          src={`${data["serialized_style_categories_by_id"][selectedStyleCategory]["image"]}`}
        />
      )}

      <Stack direction="row">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={selectedFabric}
            onChange={(e) => {
              setSelectedFabric(e.target.value);
              setCost("");
            }}
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
            onChange={(e) => {
              setSelectedQuantityRange(e.target.value);
              setCost("");
            }}
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
          <Select
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
              setCost("");
            }}
          >
            {["3 sizes (S, M, L)", "5 sizes (XS, S, M, L, XL)"].map((size) => {
              return <MenuItem value={size}>{size}</MenuItem>;
            })}
          </Select>
          <FormHelperText>size</FormHelperText>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={selectedStyleCategory}
            onChange={(e) => {
              setSelectedStyleCategory(e.target.value);
              setCost("");
            }}
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
      {
        cost && (

          <Typography variant="h1" component="h2">
            {`$${cost}`}
          </Typography>
        )
      }
    </Stack>) : <p>Please <Link to="/app/login">log in</Link> to view this page.</p>}
    </>
  );
}
