import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const FaceBookButton = withStyles({
    root: {
        background:
            "linear-gradient(90deg,  rgb(66,103,178), rgb(66,103,178))",
        borderRadius: 5,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        marginTop: "8px"
    }
})(Button);

export const CustomButton = withStyles({
    root: {
        background:
            "linear-gradient(90deg,  rgb(252, 108, 53), rgb(170, 18, 159))",
        borderRadius: 5,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        marginTop: "8px"
    }
})(Button);

export const MatchButton = withStyles({
    root: {
        background:
            "linear-gradient(90deg,  rgb(252, 108, 53), rgb(170, 18, 159))",
        borderRadius: '50%',
        border: 0,
        color: "white",
        height: 100,
        width: 100,
        padding: "0",
        marginTop: "8px",

        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
})(Button);

export const NextButton = withStyles({
    root: {
        background:
            "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        borderRadius: '50%',
        border: '0',
        color: "white",
        height: 100,
        width: 100,
        padding: "0",
        marginTop: "8px",
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    }
})(Button);

export default FaceBookButton;