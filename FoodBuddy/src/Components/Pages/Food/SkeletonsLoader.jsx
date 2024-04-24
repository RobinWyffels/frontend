import { ThemeProvider } from '@mui/material/styles';
import Skeletons from './Skeletons';
import { theme } from './Theme';

export default function Loader() {
    return (
      <ThemeProvider theme={theme}>
        <Skeletons />
      </ThemeProvider>
    );
} 