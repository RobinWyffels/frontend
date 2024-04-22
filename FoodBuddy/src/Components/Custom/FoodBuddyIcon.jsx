import { useEffect, useState } from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function FoodBuddyIcon(props) {
    const [svgContent, setSvgContent] = useState('');

    useEffect(() => {
        fetch('../../assets/Logo/FoodBuddyLogo_Black-01.svg')
            .then(response => response.text())
            .then(data => {
                setSvgContent(data);
            });
    }, []);

    return (
        <SvgIcon {...props} dangerouslySetInnerHTML={{ __html: svgContent }} />
    );
}