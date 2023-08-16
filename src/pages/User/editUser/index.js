import { materialCommonStyles } from "../../../utils/materialCommonStyle";
import { editUserStyle } from "./style";
import { useAuthContext } from "./../../../context/auth";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import userService from "../../../service/user-service";
import { toast } from "react-toastify";
import shared from "../../../utils/shared";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik } from "formik";
import ValidationErrorMessage from "../../../component/ValidationErrorMsg";

export const EditUser = () => {
  const classes = editUserStyle();
  const materialClasses = materialCommonStyles();
  const authContext = useAuthContext();
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const initialValues = {
    id: 0,
    email: "",
    lastName: "",
    firstName: "",
    roleId: 3,
  };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (id) getUserById();
  }, [id]);

  useEffect(() => {
    if (user && roles.length) {
      const roleId = roles.find((role) => role.name === user?.role)?.id;
      setInitialValueState({
        id: user.id,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        roleId,
        password: user.password,
      });
    }
  }, [user, roles]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address format"),
    roleId: Yup.string().required("Role is required"),
  });

  const getRoles = () => {
    userService.getAllRoles().then((res) => {
      if (res) setRoles(res);
    });
  };

  const getUserById = () => {
    userService.getById(Number(id)).then((res) => {
      if (res) setUser(res);
    });
  };

  const onSubmit = (values) => {
    const updatedValue = {
      ...values,
      role: roles.find((r) => r.id === values.roleId).name,
    };
    userService
      .update(updatedValue)
      .then((res) => {
        if (res) {
          toast.success(shared.messages.UPDATED_SUCCESS);
          navigate("/user");
        }
      })
      .catch((e) => toast.error(shared.messages.UPDATED_FAIL));
  };

  return (
    <div className={classes.editUserWrapper}>
      <div className="container">
        <Typography variant="h1">Edit User</Typography>
        <Formik
          initialValues={initialValueState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validator={() => ({})}
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
                    name="firstName"
                    label="First Name *"
                    variant="outlined"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputProps={{ className: "small" }}
                  />
                  <ValidationErrorMessage
                    message={errors.firstName}
                    touched={touched.firstName}
                  />
                </div>
                <div className="form-col">
                  <TextField
                    id="last-name"
                    name="lastName"
                    label="Last Name *"
                    variant="outlined"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputProps={{ className: "small" }}
                  />
                  <ValidationErrorMessage
                    message={errors.lastName}
                    touched={touched.lastName}
                  />
                </div>
                <div className="form-col">
                  <TextField
                    id="email"
                    name="email"
                    label="Email *"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputProps={{ className: "small" }}
                  />
                  <ValidationErrorMessage
                    message={errors.email}
                    touched={touched.email}
                  />
                </div>
                {values.id !== authContext.user.id && (
                  <div className="form-col">
                    <FormControl
                      className="dropdown-wrapper"
                      variant="outlined"
                      disabled={values.id === authContext.user.id}
                    >
                      <InputLabel htmlFor="select">Roles</InputLabel>
                      <Select
                        name="roleId"
                        id={"roleId"}
                        onChange={handleChange}
                        disabled={values.id === authContext.user.id}
                        className={materialClasses.customSelect}
                        MenuProps={{
                          classes: { paper: materialClasses.customSelect },
                        }}
                        value={values.roleId}
                      >
                        {roles.length > 0 &&
                          roles.map((role) => (
                            <MenuItem value={role.id} key={"name" + role.id}>
                              {role.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                )}
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
                    navigate("/user");
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
