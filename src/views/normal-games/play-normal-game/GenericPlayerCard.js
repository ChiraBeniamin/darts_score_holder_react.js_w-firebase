// ====REACT & HOOKS===
import React from 'react';
import PropTypes from 'prop-types';

// ====COMPONENTS & MUI COMPONENTS====
import { Box, Button, Divider, Menu, Typography } from '@mui/material';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import Chart from 'react-apexcharts';

// ====PROJECT IMPORTS====
import { CardWrapper } from '../../../helpers/styles';
import { PLAYERS_STATS_CONTAINER } from '../../../store/cardStyles';
import consistencyData from './consistency-graph-data';
import CustomMenuItem from '../../../ui-component/custom-menu-item';
import MoreDataCard from './MoreDataCard';

const GenericPlayerCard = ({ turn, editTurnHandler, data, playerCard, playerOneName, playerTwoName }) => {
    const playerData = data;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElPopOver, setAnchorElPopOver] = React.useState(null);
    const openPopover = Boolean(anchorElPopOver);

    const handleClickPopover = (event) => {
        setAnchorElPopOver(event.currentTarget);
    };
    const popoverId = openPopover ? 'simple-popover' : undefined;
    const handleClosePopover = () => {
        setAnchorElPopOver(null);
    };

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!playerData) return <SkeletonEarningCard />;
    return (
        <CardWrapper border={false} content={false}>
            <Box sx={playerCard(turn)}>
                <Typography sx={{ textAlign: 'center', color: 'white' }} variant="h1" component="h2">
                    {playerData.name.charAt(0).toUpperCase() + playerData.name.slice(1)}
                </Typography>
                <br />
                <Button
                    variant="outlined"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    {playerData.turns.length === 0 ? 'First turn' : `Last turn: ${playerData.turns[playerData.turns.length - 1]}`}
                </Button>
                <br />
                <Typography sx={{ textAlign: 'center', color: 'white' }} variant="h1" component="h2">
                    {playerData.score}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 250,
                        fontSize: 30,
                        marginBottom: 3
                    }}
                >
                    <Divider sx={{ flexGrow: 3, marginTop: 3, borderStyle: 'dashed' }} orientation="horizontal" />
                    <div style={PLAYERS_STATS_CONTAINER}>
                        <Typography
                            sx={{
                                fontSize: 15,
                                textAlign: 'center'
                            }}
                        >{`Legs: ${playerData.legs}`}</Typography>
                        <Typography
                            sx={{
                                fontSize: 15,
                                textAlign: 'center'
                            }}
                        >{`Average: ${playerData.average}`}</Typography>
                        <Typography sx={{ fontSize: 15, display: 'inline-block', textAlign: 'center' }}>
                            {`Total Average: ${playerData.totalAverage}`}
                        </Typography>
                    </div>
                    <Divider sx={{ flexGrow: 3, borderStyle: 'dashed' }} orientation="horizontal" />
                </Box>
                <Chart {...consistencyData(playerData.turns)} />

                <Button variant={'outlined'} sx={{ marginTop: 3 }} aria-describedby={popoverId} onClick={handleClickPopover}>
                    More Stats
                </Button>
                <MoreDataCard
                    data={data}
                    // game={game}
                    anchorEl={anchorElPopOver}
                    handleClose={handleClosePopover}
                    open={openPopover}
                ></MoreDataCard>
            </Box>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
            >
                {playerData.turns.map((playerTurn, index) => (
                    <CustomMenuItem
                        playerOneName={playerOneName}
                        playerTwoName={playerTwoName}
                        mainTurn={turn}
                        key={`${index} & ${turn}`}
                        editTurns={editTurnHandler}
                        turn={playerTurn}
                        index={index}
                        playerData={playerData}
                    />
                ))}
            </Menu>
        </CardWrapper>
    );
};

GenericPlayerCard.propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.shape({
        name: PropTypes.string,
        score: PropTypes.number,
        turns: PropTypes.array
    }).isRequired
};

export default GenericPlayerCard;
