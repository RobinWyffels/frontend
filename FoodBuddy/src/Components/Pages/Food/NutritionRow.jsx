import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'


function NutritionRow({total, daily}){
    // const label = total.label;
    // const value = total.quantity;
    // const unit = total.unit;
    return(
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            {/* <Typography variant="body1" color="initial">{label}</Typography> */}
            {/* <Typography variant="body1" color="initial">{value} {unit}</Typography> */}
        
            <Typography variant="body1" color="initial"></Typography>
        </Box>
    )
    
}

export default NutritionRow;