import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {useTheme} from "@mui/material";
import {tokens} from "../theme";


const CustomGrayCard = ({children}) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
        return (
            <Card
                sx={{
                    borderRadius: '10px',
                    backgroundColor: `${colors.grey["900"]}`,
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.1s',
                    '&:hover': {
                        transform: 'scale(1.01)', // Hover zoom effect
                    },
                }}
            >
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        )
}

export default CustomGrayCard;