import { useState, useEffect } from "react";
import { materialCommonStyles } from "../../../utils/materialCommonStyle";
import { editStyle } from "./style";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import bookService from "../../../service/book-service";
import categoryService from "../../../service/category-service";
import { toast } from "react-toastify";
import shared from "../../../utils/shared";
import { routePaths } from "./../../../../src/utils/enum";
import { Formik } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  Input,
} from "@material-ui/core";
import ValidationErrorMessage from "../../../component/ValidationErrorMsg";

export const EditBook = () => {
  const materialClasses = materialCommonStyles;
  const [categories, setCategories] = useState([]);
  const classes = editStyle();
  const navigate = useNavigate();
  const initialValue = {
    name: "",
    price: "",
    categoryId: 0,
    description: "",
    base64image: "",
  };
  const [initialValueState, setInitialValueState] = useState(initialValue);
  const { id } = useParams();

  useEffect(() => {
    if (id) getBookById();
    categoryService.getAll().then((res) => {
      setCategories(res);
    });
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Book Name is Required"),
    description: Yup.string().required("Description is Required"),
    categoryId: Yup.number()
      .min(1, "Category is Required")
      .required("Category is Required"),
    price: Yup.number().required("Price is Required"),
    base64image: Yup.string().required("Image is Required"),
  });

  const getBookById = () => {
    bookService.getById(Number(id)).then((res) => {
      setInitialValueState({
        id: res.id,
        name: res.name,
        price: res.price,
        categoryId: res.categoryId,
        description: res.description,
        base64image: res.base64image,
      });
    });
  };

  const onSubmit = (values) => {
    bookService
      .save(values)
      .then((res) => {
        toast.success(
          values.id
            ? shared.messages.UPDATED_SUCCESS
            : "Record created successfully"
        );
        navigate(routePaths.Book);
      })
      .catch((e) => toast.error(shared.messages.UPDATED_FAIL));
  };

  const onSelectFile = (e, setFieldValue, setFieldError) => {
    const files = e.target.files;
    if (files?.length) {
      const fileSelected = e.target.files[0];
      const fileNameArray = fileSelected.name.split(".");
      const extension = fileNameArray.pop();
      if (["png", "jpg", "jpeg"].includes(extension?.toLowerCase())) {
        if (fileSelected.size > 50000) {
          toast.error("File size must be less than 50KB");
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(fileSelected);
        reader.onload = function () {
          setFieldValue("base64image", reader.result);
        };
        reader.onerror = function (error) {
          throw error;
        };
      } else {
        toast.error("only jpg, jpeg and png files are allowed");
      }
    } else {
      setFieldValue("base64image", "");
    }
  };

  return (
    <div className={classes.editWrapper}>
      <div className="container">
        <Typography variant="h1">{id ? "Edit" : "Add"} Book</Typography>
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
            handleSubmit,
            handleChange,
            setValues,
            setFieldError,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row-wrapper">
                <div className="form-col">
                  <TextField
                    id="book-name"
                    name="name"
                    label="Book Name *"
                    variant="outlined"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputProps={{ className: "small" }}
                  />
                  <ValidationErrorMessage
                    message={errors.name}
                    touched={touched.name}
                  />
                </div>

                <div className="form-col">
                  <TextField
                    id="price"
                    name="price"
                    type="number"
                    label="Book Price (Rs.) *"
                    variant="outlined"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputProps={{ className: "small" }}
                  />
                  <ValidationErrorMessage
                    message={errors.price}
                    touched={touched.price}
                  />
                </div>

                <div className="form-col">
                  <FormControl className="dropdown-wrapper" variant="outlined">
                    <InputLabel htmlFor="select">Category *</InputLabel>
                    <Select
                      name={"categoryId"}
                      id={"category"}
                      onChange={handleChange}
                      className={materialClasses.customSelect}
                      MenuProps={{
                        classes: { paper: materialClasses.customSelect },
                      }}
                      value={values.categoryId}
                    >
                      {categories?.map((el) => (
                        <MenuItem value={el.id} key={"category" + el.id}>
                          {el.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <ValidationErrorMessage
                    message={errors.categoryId}
                    touched={touched.categoryId}
                  />
                </div>

                <div className="form-col">
                  {!values.base64image && (
                    <>
                      {""}
                      <label
                        htmlFor="contained-button-file"
                        className="file-upload-btn"
                      >
                        <Input
                          id="contained-button-file"
                          type="file"
                          inputProps={{ className: "small" }}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            onSelectFile(e, setFieldError, setFieldValue);
                          }}
                        />
                        <Button
                          variant="contained"
                          component="span"
                          className="btn primary-btn"
                        >
                          Upload
                        </Button>
                      </label>
                      <ValidationErrorMessage
                        message={errors.base64image}
                        touched={touched.base64image}
                      />
                    </>
                  )}
                  {values.base64image && (
                    <div className="upload-file-name">
                      <em>
                        <img src={values.base64image} alt="image" />
                      </em>
                      image{" "}
                      <span
                        onClick={() => {
                          setFieldValue("base64image", "");
                        }}
                      >
                        x
                      </span>
                    </div>
                  )}
                </div>

                <div className="form-col full-width description">
                  <TextField
                    id="description"
                    name="description"
                    label="Description *"
                    variant="outlined"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    multiline
                  />
                  <ValidationErrorMessage
                    message={errors.description}
                    touched={touched.description}
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
                  className="primary-btn btn"
                  variant="contained"
                  type="button"
                  color="primary"
                  disableElevation
                  onClick={() => {
                    navigate(routePaths.Book);
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
