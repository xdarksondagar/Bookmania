import { useEffect, useState } from "react";
import { editStyle } from "./style";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import categoryService from "../../../service/category-service";
import { toast } from "react-toastify";
import shared from "../../../utils/shared";
import { Formik } from "formik";
import { Button, TextField, Typography } from "@material-ui/core";
import ValidationErrorMessage from "../../../component/ValidationErrorMsg";

export const EditCategory = () => {
  const classes = editStyle();
  const navigate = useNavigate();
  const initialValues = { name: "" };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    if (id) getCategoryById();
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required"),
  });

  const getCategoryById = () => {
    categoryService.getById(Number(id)).then((res) => {
      setInitialValueState({
        id: res.id,
        name: res.name,
      });
    });
  };

  const onSubmit = (values) => {
    categoryService
      .save(values)
      .then((res) => {
        toast.success(shared.messages.UPDATED_SUCCESS);
        navigate("/category");
      })
      .catch((e) => toast.error(shared.messages.UPDATED_FAIL));
  };

  return (
    <div className={classes.editWrapper}>
      <div className="container">
        <Typography variant="h1">{id ? "Edit" : "Add"} Category</Typography>
        <Formik
          initialValues={initialValueState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row-wrapper">
                <div className="form-col">
                  <TextField
                    id="first-name"
                    name="name"
                    label="Category Name *"
                    variant="outlined"
                    inputProps={{ className: "small" }}
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ValidationErrorMessage
                    message={errors.name}
                    touched={touched.name}
                  />
                </div>
              </div>
              <div className="btn-wrapper">
                <Button
                  className="green-btn btn"
                  variant="contained"
                  type="submit"
                  color="primary"
                  disableElevation
                >
                  Save
                </Button>
                <Button
                  className="danger-btn btn"
                  variant="contained"
                  type="button"
                  color="primary"
                  disableElevation
                  onClick={() => {
                    navigate("/category");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
