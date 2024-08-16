import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';

const BoldTypography = styled(Typography)({
    fontWeight: 'bold'
});


function NutritionRow({total, daily, loading = false}){
    const nutrient = total?.label;
    const value = Math.round((total?.quantity + Number.EPSILON) * 10) / 10;
    const unit = total?.unit;
    const dailyValue = Math.round((daily?.quantity + Number.EPSILON) * 10) / 10 || 0;
    const dailyUnit = daily?.unit || "%";
    if (loading) {
        return (
            <Skeleton variant="text" width="100%" />
        )
    }
    return(
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={4}>
                <Typography variant="body1" color="initial" >{nutrient}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body1" color="initial" align="right">{value}<BoldTypography component="span">{unit}</BoldTypography></Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body1" color="initial" align="right" >{dailyValue}<BoldTypography component="span">{dailyUnit}</BoldTypography></Typography>
            </Grid>
        </Grid>
    )
    
}

NutritionRow.propTypes = {
    total: PropTypes.shape({
        label: PropTypes.string,
        quantity: PropTypes.number,
        unit: PropTypes.string
    }).isRequired,
    daily: PropTypes.any,
    loading: PropTypes.bool
};

export default NutritionRow; 