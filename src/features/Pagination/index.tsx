import { Button, Box, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

type PaginationProps = {
    tag: string;
    currentPage: number;
    totalPages: number;
};

export const Pagination = ({
    tag,
    currentPage,
    totalPages,
}: PaginationProps) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: '-70px',
                right: 0,
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-end',
                mt: 2,
                pb: 2,
            }}
        >
            <div>
                {currentPage} из {totalPages}
            </div>
            <ButtonGroup variant="outlined" sx={{ pl: 2 }}>
                <Button
                    onClick={() => navigate(`/${tag}/${currentPage - 1}`)}
                    disabled={currentPage === 1}
                >
                    <NavigateBeforeIcon />
                </Button>
                <Button
                    onClick={() => {
                        navigate(`/${tag}/${currentPage + 1}`);
                    }}
                    // Disable the Next Page button until we know a next page is available
                    disabled={!(currentPage < totalPages)}
                >
                    <NavigateNextIcon />
                </Button>
            </ButtonGroup>
        </Box>
    );
};
