import React from "react";
import { Formik, Field } from "formik";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";

interface ShowRoomProps {
  requested_styles: any;
}

export default function StyleRequestForm({ requested_styles }) {
  console.log("requested_styles", requested_styles);
  const initialValues = {
    company_name: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    main_contact_name: "",
    email: "",
    phone_number: "",
    website: "",
    additional_information: "",
    quotation_request_notes: "",
    requested_styles: requested_styles,
  };

  const fieldStyle = {
    width: "300px",
    border: "1px solid cadetblue",
  };

  return (
    <div>
      <Box sx={{ marginBottom: "50px" }}>
        <Typography gutterBottom variant="h6" component="div" fontFamily={"fantasy"}>
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
              No styles selected - select some or tell us more about what you
              need below!
            </Typography>
          )}
        </Stack>
      </Box>
      <Typography gutterBottom variant="h6" component="div" fontFamily={"fantasy"}>
        Company Information:
      </Typography>

      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          if (!values.company_name) {
            errors["company_name"] = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
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
                // sx={{width: '350px'}}
                id="company_name"
                name="company_name"
                label="Company Name"
                value={values.company_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.company_name && Boolean(errors.company_name)}
                helperText={touched.company_name && errors.company_name}
              />
              <TextField
                // sx={{width: '350px'}}
                id="main_contact_name"
                name="main_contact_name"
                label="Main Contact Full Name"
                value={values.main_contact_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.main_contact_name && Boolean(errors.main_contact_name)
                }
                helperText={
                  touched.main_contact_name && errors.main_contact_name
                }
              />
              <TextField
                // sx={{width: '350px'}}
                id="email"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                // sx={{width: '350px'}}
                id="phone_number"
                name="phone_number"
                label="Phone Number"
                value={values.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone_number && Boolean(errors.phone_number)}
                helperText={touched.phone_number && errors.phone_number}
              />

              <TextField
                // sx={{width: '350px'}}
                id="address"
                name="address"
                label="Address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
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
                      Help us put together a quotation that make sense for you!
                      You can do this by answering the following:
                      <br />- What is your approximate annual purchase quanitity
                      (across styles)?
                      <br />- What is your approximate quantity per style?
                      <br />- Is there a target price you are going for?
                      <br />- Our typical pricing is F.O.B. - do you have a
                      different preference?
                    </Typography>
                  )
                }
              />

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
            </Stack>
          </form>
        )}
      </Formik>
    </div>
  );
}
