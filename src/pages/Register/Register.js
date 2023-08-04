import {
  Breadcrumbs,
  Typography,
  Link,
  TextField,
  CardContent,
  MenuItem,
  CardActions,
  Button,
} from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import "./style.css";
import { useNavigate } from "react-router-dom";
import authService from "../../service/auth-service";
import { toast } from "react-toastify";
import { routePaths } from "../../utils/enum";

const roles = [
  {
    id: 3,
    label: "buyer",
  },
  {
    id: 2,
    label: "seller",
  },
];

export const Register = () => {
  let navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    roleId: 0,
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Enter your first name"),
    lastName: Yup.string().required("Enter your first name"),
    email: Yup.string()
      .required("Enter your email address")
      .email("Enter a valid email address"),
    roleId: Yup.number().required("Select your role"),
    password: Yup.string()
      .required("Enetr a password")
      .min(8, "Password must containe atleast 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password does not match")
      .required("Confirm your password"),
  });

  function onSubmit(data) {
    delete data.confirmPassword;

    authService.create(data).then((res) => {
      if (!res.id) return;
      toast.success("Account created successfully!!");
      navigate(routePaths.login);
    });
  }

  return (
    <>
      <Breadcrumbs separator=">" aria-label="breadcrumbs">
        <Link
          to={routePaths.home}
          color="inherit"
          onClick={(e) => e.preventDefault()}
        >
          Home
        </Link>
        <Typography color="primary">Register</Typography>
      </Breadcrumbs>
      <Typography variant="h3" align="center" className="register_header">
        Create New Account
      </Typography>

      {/* form start */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
            <div>
              <Typography variant="h6" className="form__title">
                Personal Information
              </Typography>
              <hr />
              <Typography color="textSecondary" className="form__subtitle">
                Please enter the following information to create your account.
              </Typography>
            </div>
            <CardContent className="form__group">
              <TextField
                className="form__input"
                type="text"
                name="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.firstName ? errors.firstName : ""}
                error={touched.firstName && Boolean(errors.firstName)}
                variant="outlined"
                fullWidth
              ></TextField>
              <TextField
                className="form__input"
                type="text"
                name="lastName"
                label="Last Name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.lastName ? errors.lastName : ""}
                error={touched.lastName && Boolean(errors.lastName)}
                variant="outlined"
                fullWidth
              ></TextField>
              <TextField
                className="form__input"
                type="email"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
                variant="outlined"
                fullWidth
              ></TextField>
              <TextField
                select
                className="form__input"
                name="roleId"
                label="Role"
                value={values.roleId}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.roleId ? errors.roleId : ""}
                error={touched.roleId && Boolean(errors.roleId)}
                variant="outlined"
                fullWidth
              >
                {roles.map((el) => (
                  <MenuItem key={el.id} value={el.id}>
                    {el.label}
                  </MenuItem>
                ))}
              </TextField>
            </CardContent>
            <Typography variant="h6" className="form__title">
              Login Information
            </Typography>
            <hr />
            <CardContent className="form__group">
              <TextField
                className="form__input"
                type="password"
                name="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
                variant="outlined"
                fullWidth
              ></TextField>
              <TextField
                type="password"
                className="form__input"
                name="confirmPassword"
                label="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  touched.confirmPassword ? errors.confirmPassword : ""
                }
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                variant="outlined"
                fullWidth
              ></TextField>
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="form__btn"
              >
                Register
              </Button>
            </CardActions>
          </form>
        )}
      </Formik>
    </>
  );
};
