import React from 'react';
import { CircularProgress, Popover, Typography } from '@mui/material';

const MoreDataCard = ({ data, open, anchorEl, handleClose }) => {
    if (!data) return <CircularProgress />;
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
        >
            <Typography sx={{ p: 2 }}>Highest Score: {data.highestScore}</Typography>
        </Popover>
    );
};

export default MoreDataCard;
