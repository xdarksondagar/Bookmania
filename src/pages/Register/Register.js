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
import { Formik, validateYupSchema } from "formik";
import * as Yup from "yup";

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

  function onSubmit() {
    alert("Registered successfully!!!");
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Breadcrumbs
          separator=">"
          aria-label="breadcrumbs"
          sx={{
            "& ol": {
              justifyContent: "center",
              margin: "auto",
            },
          }}
        >
          <Link href="#" color="inherit" onClick={(e) => e.preventDefault()}>
            Home
          </Link>
          <Link href="#" color="inherit" onClick={(e) => e.preventDefault()}>
            Register
          </Link>
        </Breadcrumbs>
      </div>
      <Typography variant="h4" align="center">
        Create New Account
      </Typography>

      {/* form start */}
      <Formik
        initialValues={initialValues}
        validationSchema={validateYupSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Typography variant="h6">Personal Information</Typography>
              <hr />
              <Typography color="textSecondary">
                Please enter the following information to create your account.
              </Typography>
            </div>
            <CardContent>
              <TextField
                name="firstName"
                label="First Name"
                value={values.firstName}
                handleChange={handleChange}
                error={Boolean(errors.firstName)}
                variant="outlined"
                fullWidth
              ></TextField>
              <TextField
                name="lastName"
                label="Last Name"
                value={values.lastName}
                handleChange={handleChange}
                error={Boolean(errors.lastName)}
                variant="outlined"
                fullWidth
              ></TextField>
              <TextField
                name="email"
                label="Email"
                value={values.email}
                handleChange={handleChange}
                error={Boolean(errors.email)}
                variant="outlined"
                fullWidth
              ></TextField>
              <TextField
                select
                name="roleId"
                label="Role"
                value={values.roleId}
                handleChange={handleChange}
                error={Boolean(errors.roleId)}
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
            <Typography variant="h6">Login Information</Typography>
            <hr />
            <CardContent>
              <TextField
                name="password"
                label="Password"
                value={values.password}
                handleChange={handleChange}
                error={Boolean(errors.password)}
                variant="outlined"
                fullWidth
              ></TextField>
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                value={values.confirmPassword}
                handleChange={handleChange}
                error={Boolean(errors.confirmPassword)}
                variant="outlined"
                fullWidth
              ></TextField>
            </CardContent>
            <CardActions>
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </CardActions>
          </form>
        )}
      </Formik>
    </>
  );
};
