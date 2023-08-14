import {
  Breadcrumbs,
  Button,
  Typography,
  TextField,
  CardContent,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import "./style.css";
import authService from "../../service/auth-service";
import { toast } from "react-toastify";
import { routePaths } from "../../utils/enum";
import { useAuthContext } from "../../context/auth";

export const Login = () => {
  const navigate = useNavigate();
  const authContext = useAuthContext;

  const initialValues = [
    {
      email: "",
      password: "",
    },
  ];

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Enter valid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must contain atleast 8 characters"),
  });

  const onSubmit = (data) => {
    authService.login(data).then((res) => {
      toast.success("Login successfull!!");
      authContext.setUser(res);
    });
  };

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
        <Typography color="primary">Login</Typography>
      </Breadcrumbs>
      <Typography variant="h3" align="center" className="login__header">
        Login to Your Accountm
      </Typography>

      <div className="login__container">
        <div>
          <Typography variant="h6" className="login__title">
            New customer
          </Typography>
          <hr />
          <Typography color="textSecondary" className="login__subtitle">
            Registration is free and easy.
          </Typography>

          <Typography className="login__text">Faster checkout</Typography>
          <Typography className="login__text">
            Save multiple shipping addresses
          </Typography>
          <Typography className="login__text">
            View and track orders and more
          </Typography>

          <Link to={routePaths.register}>
            <Button variant="contained" color="primary" className="login__btn">
              Create an Account
            </Button>
          </Link>
        </div>

        <CardContent>
          <Typography variant="h6" className="login__title">
            Registered customers
          </Typography>
          <hr />
          <Typography color="textSecondary" className="login__subtitle">
            If you have an account with us, please log in.
          </Typography>

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
                <TextField
                  className="login__input"
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
                  className="login__input"
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password ? errors.password : ""}
                ></TextField>

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className="login__btn"
                >
                  Login
                </Button>
              </form>
            )}
          </Formik>
        </CardContent>
      </div>
    </>
  );
};
