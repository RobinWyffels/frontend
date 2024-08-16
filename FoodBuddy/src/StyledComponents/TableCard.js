import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const TableCard = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
}));

export default TableCard;