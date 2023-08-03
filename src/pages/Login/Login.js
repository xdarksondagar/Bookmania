import { Breadcrumbs, Button, Typography, TextField } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import "./style.css";
import authService from "../../service/auth-service";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();

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
      if (!res.id) return;
      toast.success("Login successfull!!");
      navigate("/");
    });
  };

  return (
    <>
      <Breadcrumbs separator=">" aria-label="breadcrumbs">
        <Link href="#" color="inherit" onClick={(e) => e.preventDefault()}>
          Home
        </Link>
        <Link href="#" color="inherit" onClick={(e) => e.preventDefault()}>
          Login
        </Link>
      </Breadcrumbs>
      <Typography variant="h3" align="center" className="login__header">
        Login to Your Account
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

          <Link to="/register">
            <Button variant="contained" color="primary" className="login__btn">
              Create an Account
            </Button>
          </Link>
        </div>

        <div>
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
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                ></TextField>
                <TextField
                  className="login__input"
                  name="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
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
        </div>
      </div>
    </>
  );
};
