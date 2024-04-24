import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react'
import { theme } from './Theme';

export default function Skeletons() {
  const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMedium = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const matchesLarge = useMediaQuery(theme.breakpoints.up('lg'));

  const initialSkeletons = matchesLarge ? 18 : matchesMedium ? 12 : 5;
  const [numSkeletons, setNumSkeletons] = useState(initialSkeletons);

  useEffect(() => {
    console.log(`Small: ${matchesSmall}, Medium: ${matchesMedium}, Large: ${matchesLarge}`);
    if (matchesLarge && numSkeletons !== 18) {
      setNumSkeletons(18);
    } else if (matchesMedium && numSkeletons !== 12) {
      setNumSkeletons(12);
    } else if (matchesSmall && numSkeletons !== 5) {
      setNumSkeletons(5);
    }
  }, [matchesSmall, matchesMedium, matchesLarge, numSkeletons]);

  return (
    <Grid container rowSpacing={{ xs:3, md:4 }} >
        {Array.from(new Array(numSkeletons)).map((_, index) => (
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
        }
    </Grid>
    
  );
}