import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { theme } from './Theme';



export default function Skeletons() {

  const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMedium = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const matchesLarge = useMediaQuery(theme.breakpoints.up('lg'));

  let numSkeletons;
  if (matchesLarge) {
      numSkeletons = 18;
  } else if (matchesMedium) {
      numSkeletons = 12;
  } else if (matchesSmall) {
      numSkeletons = 5;
  }

  return (
    Array.from(new Array(numSkeletons)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index} style={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center' 
        }}>
            <Skeleton variant="text" animation="wave" width={250} height={80} />
            <Skeleton variant="rounded" animation="wave" width={250} height={115} />
        </Grid>
        ))
  );
}