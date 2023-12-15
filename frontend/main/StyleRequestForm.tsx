import React, { useState } from "react";
import { Formik, Field } from "formik";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import axios from "axios";
import getCookie from "./App/utils/getCookie";

interface ShowRoomProps {
  requested_styles: any;
  currentUser: any;
  isTradeShow?: boolean;
  company: any;
}

let ENDPOINT = "";
if (process.env.NODE_ENV === "development") {
  ENDPOINT = "http://127.0.0.1:8000";
} else {
  ENDPOINT =
    "http://clothing-calculator-env.eba-qnfpfgsz.us-west-2.elasticbeanstalk.com/";
}

export default function StyleRequestForm({ requested_styles, currentUser, isTradeShow = false, company = {}}) {
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);

  const initialValues = {
    // empty form if tradeshow, or if no company 
    company_name: isTradeShow ||  !("company_name" in company) ? '': company?.company_name, 
    address: isTradeShow ||  !("address" in company) ? '': company?.address, 
    city: isTradeShow ||  !("city" in company) ? '': company?.city, 
    state: isTradeShow ||  !("state" in company) ? '': company?.state, 
    zip_code: isTradeShow ||  !("zip_code" in company) ? '': company?.zip_code, 
    main_contact_name: isTradeShow ||  !("main_contact_name" in company) ? '': company?.main_contact_name, 
    email: isTradeShow ||  !("email" in company) ? '': company?.email, 
    phone_number: isTradeShow ||  !("phone_number" in company) ? '': company?.phone_number, 
    website: isTradeShow ||  !("website" in company) ? '': company?.website, 
    additional_information: isTradeShow ||  !("additional_information" in company) ? '': company?.additional_information, 
    quotation_request_notes: "",
    requested_styles: requested_styles,
  };

  const fieldStyle = {
    width: "300px",
    border: "1px solid cadetblue",
  };

  const successText = (
    <Typography gutterBottom variant="h6" component="div" color="cadetblue">
      Quote successfully requested!
    </Typography>
  );

  return (
    <div>
      {formSuccess ? (
        <>{successText}</>
      ) : (
        <div>
          <Box sx={{ marginBottom: "50px" }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              fontFamily={"fantasy"}
            >
              Styles requested for quotation:
            </Typography>
            <Stack flexDirection={"row"} gap={"20px"}>
              {requested_styles.length > 0 ? (
                requested_styles.map((requested_style) => {
                  return (
                    <Chip
                      sx={{
                        backgroundColor: "whitesmoke",
                        color: "cadetblue",
                        border: "2px solid cadetblue",
                      }}
                      label={requested_style.model_number}
                    />
                  );
                })
              ) : (
                <Typography gutterBottom variant="subtitle2" component="div">
                  No styles selected - select some or tell us more about what
                  you need below!
                </Typography>
              )}
            </Stack>
          </Box>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontFamily={"fantasy"}
          >
            Company Information:
          </Typography>

          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const errors = {};
              const requiredFields = [
                "company_name",
                "address",
                "city",
                "state",
                "zip_code",
                "main_contact_name",
                "email",
              ];
              if (typeof(values["email"]) == 'string' && !values["email"].includes("@")) {
                errors["email"] = "Invalid Email";
              }
              for (const requiredField of requiredFields) {
                if (!values[requiredField]) {
                  errors[requiredField] = "Required";
                }
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              const URL = `${ENDPOINT}/app/quotation_request/`;
              axios
                .post(
                  `${URL}${currentUser.id}`,
                  { ...values, isTradeShow: isTradeShow },
                  {
                    headers: {
                      "X-CSRFToken": getCookie("csrftoken"),
                    },
                  }
                )
                .then((response) => {
                  console.log("response", response);
                  setSubmitting(false);
                  setFormSuccess(true);
                })
                .catch((err) => {
                  console.log("error", err);
                  setSubmitting(false);
                  setFormError("Error submitting form");
                });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <Stack gap="20px" flexWrap={"wrap"} direction={"row"}>
                  <TextField
                    sx={{ width: "300px" }}
                    id="company_name"
                    name="company_name"
                    label="Company Name"
                    value={values.company_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.company_name && Boolean(errors.company_name)}
                    helperText={touched.company_name && errors.company_name}
                    disabled={isSubmitting || initialValues.company_name != ""}
                  />
                  <TextField
                    sx={{ width: "300px" }}
                    id="main_contact_name"
                    name="main_contact_name"
                    label="Main Contact Full Name"
                    value={values.main_contact_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.main_contact_name &&
                      Boolean(errors.main_contact_name)
                    }
                    helperText={
                      touched.main_contact_name && errors.main_contact_name
                    }
                    disabled={isSubmitting}
                  />
                  <TextField
                    sx={{ width: "300px" }}
                    id="email"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    disabled={isSubmitting}
                  />
                  <TextField
                    sx={{ width: "300px" }}
                    id="phone_number"
                    name="phone_number"
                    label="Phone Number"
                    value={values.phone_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone_number && Boolean(errors.phone_number)}
                    helperText={touched.phone_number && errors.phone_number}
                    disabled={isSubmitting}
                  />

                  <TextField
                    sx={{ width: "300px" }}
                    id="address"
                    name="address"
                    label="Address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                    disabled={isSubmitting}
                  />
                  <TextField
                    sx={{ width: "250px" }}
                    id="city"
                    name="city"
                    label="City"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                    disabled={isSubmitting}
                  />
                  <TextField
                    sx={{ width: "250px" }}
                    id="state"
                    name="state"
                    label="State"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.state && Boolean(errors.state)}
                    helperText={touched.state && errors.state}
                    disabled={isSubmitting}
                  />

                  <TextField
                    sx={{ width: "150px" }}
                    id="zip_code"
                    name="zip_code"
                    label="Zip Code"
                    value={values.zip_code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.zip_code && Boolean(errors.zip_code)}
                    helperText={touched.zip_code && errors.zip_code}
                    disabled={isSubmitting}
                  />
                  <TextField
                    sx={{ width: "250px" }}
                    id="website"
                    name="website"
                    label="Website"
                    value={values.website}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.website && Boolean(errors.website)}
                    helperText={touched.website && errors.website}
                    disabled={isSubmitting}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    maxRows={6}
                    id="additional_information"
                    name="additional_information"
                    label="Additional Company Information"
                    value={values.additional_information}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.additional_information &&
                      Boolean(errors.additional_information)
                    }
                    helperText={
                      touched.additional_information &&
                      errors.additional_information
                        ? touched.additional_information &&
                          errors.additional_information
                        : "ex: We have 3 boutiques in New York, LA, and Texas. Our focus is women's sweaters!"
                    }
                    disabled={isSubmitting}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    maxRows={10}
                    id="quotation_request_notes"
                    name="quotation_request_notes"
                    label="Quotation Request Notes"
                    value={values.quotation_request_notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ marginTop: "30px" }}
                    error={
                      touched.quotation_request_notes &&
                      Boolean(errors.quotation_request_notes)
                    }
                    disabled={isSubmitting}
                    helperText={
                      touched.quotation_request_notes &&
                      errors.quotation_request_notes ? (
                        touched.quotation_request_notes &&
                        errors.quotation_request_notes
                      ) : (
                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          component="div"
                        >
                          Help us put together a quotation that make sense for
                          you! You can do this by answering the following:
                          <br />- What is your approximate annual purchase
                          quanitity (across styles)?
                          <br />- What is your approximate quantity per style?
                          <br />- Is there a target price you are going for?
                          <br />- Our typical pricing is F.O.B. - do you have a
                          different preference?
                        </Typography>
                      )
                    }
                  />
                  {isSubmitting ? (
                    <CircularProgress />
                  ) : (
                    <Stack direction={"row"} alignItems={"center"} gap="20px">
                      <Button
                        type="submit"
                        style={{
                          backgroundColor: "whitesmoke",
                          color: "cadetblue",
                          border: "2px solid cadetblue",
                        }}
                        variant="contained"
                      >
                        Request
                      </Button>
                      {formError && (
                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          component="div"
                          color="red"
                        >
                          {formError}
                        </Typography>
                      )}
                    </Stack>
                  )}
                </Stack>
              </form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
