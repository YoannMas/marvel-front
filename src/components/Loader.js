import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const Loader = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      color: "#f0151e",
    },
  }));
  const classes = useStyles();

  return (
    <div className="loader">
      <CircularProgress size={100} className={classes.root} />
    </div>
  );
};
export default Loader;
