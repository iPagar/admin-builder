import { Box } from '@mui/material';

type PlaceholderProps = {
    type?: 'empty' | 'error';
};

export const Placeholder = ({
    type = 'empty',
}: PlaceholderProps) => {
    return (
        <Box
            sx={{
                textAlign: 'center',
                mt: 2,
            }}
        >
            {type === 'empty' ? 'Пусто.' : 'Ошибка.'}
        </Box>
    );
};
