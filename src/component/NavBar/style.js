import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles({
  header: {
    display: "flex",
    paddingBlock: "2rem",
    justifyContent: "space-between",
    alignItems: "center",
    "&::before": {
      content: "''",
      width: "100%",
      height: "10px",
      display: "block",
      background: "#009688",
      position: "absolute",
      top: 0,
      left: 0,
    },
    "& ul": {
      display: "flex",
      gap: "1rem",
      listStyle: "none",
      "& li": {
        "& a": {
          textTransform: "capitalize",
          textDecoration: "none",
          fontSize: "16px",
        },
      },
    },
  },
});
