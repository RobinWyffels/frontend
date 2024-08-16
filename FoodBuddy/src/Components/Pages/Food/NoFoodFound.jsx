import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NOImage from '../../../assets/404Fetch.png'
import { styled } from '@mui/material/styles';

const StyledDiv = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop:'30px'
});

function NoFoodFound() {
    const Image = styled('img')({
        width: '100%',
      });

    return (
        <div>
          <StyledDiv>
            <Typography variant="h4">
              Oops looks like we dont have that product 
            </Typography>
            <Typography variant="h4">
                Maybe try another one?
            </Typography>
          </StyledDiv>
          <StyledDiv>
              <Box
                  sx={{
                      width: {
                          xs: '60%', // on mobile
                          sm: '40%', // on tablets and larger
                          md: '30%', // on small laptops
                      },
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                  }}
              >
                  <Image src={NOImage} />
              </Box>
          </StyledDiv>
        </div>
      )
}

export default NoFoodFound;