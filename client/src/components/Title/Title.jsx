import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

function Title({ children, variant, color }) {
	return (
		<Typography component="h2" variant={variant} color={color} gutterBottom>
			{children}
		</Typography>
	);
}

Title.propTypes = {
	children: PropTypes.node,
};

export default Title;
