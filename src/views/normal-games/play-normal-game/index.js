// ====REACT & REACT-ROUTER-DOM HOOKS====
import { useEffect, useState } from 'react';

// ====COMPONENTS %MUI COMPONENTS====
// ====STYLES====
// ====SERVICES====
// ====OTHER====
import { useParams } from 'react-router';
import getOne from '../../../services/normal-games-service/get-one-game';
import { SCORE_DISPLAY_STYLE } from '../../../store/cardStyles';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import archiveGame from '../../../services/archived-games-service/post-archived-game';
import { useForm } from 'react-hook-form';
import MainCard from '../../../ui-component/cards/MainCard';
import PLAYERS from '../../../store/players';
import updateScore from '../../../services/normal-games-service/update-score';
import updateLegs from '../../../services/normal-games-service/update-legs';
import KEYBOARD_KEYS from '../../../store/keyboard-keys';
import { playerOneCard, playerTwoCard } from '../../../helpers/helpers';
import GenericPlayerCard from './GenericPlayerCard';
import deleteGame from '../../../services/normal-games-service/delete-normal-game';
import updateTurns from '../../../services/normal-games-service/patch-turns';
import { useNavigate } from 'react-router-dom';

const PlayNormalGame = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [toggle, setToggle] = useState(false);
    const params = useParams().title;
    const [game, setGame] = useState(null);
    const { register, watch, reset } = useForm();
    let score = watch('score');
    const handleClose = () => setModalOpen(false);

    const closeModal = () => {
        deleteGame(game.title)
            .then((r) => console.log(r))
            .catch((err) => console.error(err));
        navigate('/normal-game');
        setModalOpen(false);
    };
    // const archiveGame = () => {
    //     archive(game)
    //         .then((resp) => console.log(resp))
    //         .catch((err) => console.error(err));
    //     deleteGame(game._id)
    //         .then((r) => console.log(r))
    //         .catch((err) => console.error(err));
    //     setModalOpen(false);
    //     navigate('/archived-games');
    // };
    const editTurnHandler = (e, turnIndex, player, turnsArr) => {
        let inputValue = parseInt(e.target.value);
        if (!inputValue) {
            inputValue = 0;
        }
        if (e.key === KEYBOARD_KEYS.ENTER) {
            if (player === PLAYERS.ONE) {
                const oldValue = turnsArr[turnIndex];
                turnsArr[turnIndex] = inputValue;
                updateTurns(oldValue, inputValue, game, PLAYERS.ONE, turnsArr)
                    .then(() => setToggle((prevState) => !prevState))
                    .catch((err) => console.error(err));
            } else {
                const oldValue = turnsArr[turnIndex];
                turnsArr[turnIndex] = inputValue;
                updateTurns(oldValue, inputValue, game, PLAYERS.TWO, turnsArr)
                    .then(() => setToggle((prevState) => !prevState))
                    .catch((err) => console.error(err));
            }
        }
    };

    const ScoreDisplayer = () => {
        if (!score) {
            return <h1>0</h1>;
        } else {
            return <h1>{score}</h1>;
        }
    };

    const bustScore = () => {
        if (game.turn === 1) {
            updateScore(game, PLAYERS.ONE, 0).then();
            setToggle((prevState) => !prevState);
        } else {
            updateScore(game, PLAYERS.TWO, 0).then();
            setToggle((prevState) => !prevState);
        }
    };

    const onSubmit = (e) => {
        if (game) {
            let inputValue = parseInt(e.target.value);
            if (!inputValue) {
                inputValue = 0;
            }
            if (e.key === KEYBOARD_KEYS.ENTER) {
                if (inputValue > 180) return;
                if (game.turn === 1) {
                    if (inputValue === game.players.playerOne.score) {
                        updateLegs(game, PLAYERS.ONE, inputValue)
                            .then(() => setToggle((prevState) => !prevState))
                            .catch((err) => console.log(err));
                        if (game.players.playerOne.legs + 1 === game.gameLegs) {
                            setModalOpen(true);
                        }
                    } else {
                        updateScore(game, PLAYERS.ONE, inputValue)
                            .then(() => setToggle((prevState) => !prevState))
                            .catch((err) => console.log(err));
                    }
                } else if (game.turn === 2) {
                    if (inputValue === game.players.playerTwo.score) {
                        updateLegs(game, PLAYERS.TWO, inputValue)
                            .then(() => setToggle((prevState) => !prevState))
                            .catch((err) => console.log(err));
                        if (game.players.playerTwo.legs + 1 === game.gameLegs) {
                            setModalOpen(true);
                        }
                    } else {
                        updateScore(game, PLAYERS.TWO, inputValue)
                            .then(() => setToggle((prevState) => !prevState))
                            .catch((err) => console.log(err));
                    }
                }
                e.target.value = null;
            }
        }
    };

    useEffect(() => {
        getOne(params).then((r) => {
            setGame(r);
        });
    }, [toggle]);

    if (!game) return <h1>Loading...</h1>;

    return (
        <MainCard
            sx={{ paddingLeft: 3, paddingRight: 3, background: 'rgb(239,242,246)' }}
            title={`${game.title.charAt(0).toUpperCase() + game.title.slice(1)}`}
        >
            <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', margin: 0 }}>
                <GenericPlayerCard
                    editTurnHandler={editTurnHandler}
                    turn={game.turn}
                    data={game.players.playerOne}
                    playerCard={playerOneCard}
                    playerOneName={game.players.playerOne.name}
                    playerTwoName={game.players.playerTwo.name}
                />
                <div style={SCORE_DISPLAY_STYLE}>
                    <ScoreDisplayer />
                    <TextField
                        inputProps={{
                            min: 0,
                            max: 180
                        }}
                        placeholder={'Enter score'}
                        onKeyDown={onSubmit}
                        type="number"
                        maxRows={1}
                        {...register('score', {
                            min: 0,
                            max: 180,
                            maxLength: 3,
                            pattern: /^\d{1,3}$/
                        })}
                        fullWidth
                        label="Enter Score..."
                        id="filled-start-adornment"
                        variant="outlined"
                    />
                    <Button onClick={bustScore} sx={{ marginTop: 2 }}>
                        Bust
                    </Button>
                </div>
                <GenericPlayerCard
                    editTurnHandler={editTurnHandler}
                    turn={game.turn}
                    data={game.players.playerTwo}
                    playerCard={playerTwoCard}
                    playerOneName={game.players.playerOne.name}
                    playerTwoName={game.players.playerTwo.name}
                />
            </div>
            <Modal
                keepMounted
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    {/*<Typography id="keep-mounted-modal-title" variant="h2" component="h2">*/}
                    {/*    {`Player ${*/}
                    {/*        game.players.playerOne.legs + 1 === game.gameLegs ? game.players.playerOne.name : game.players.playerTwo.name*/}
                    {/*    } won the game!!!`}*/}
                    {/*</Typography>*/}
                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        Would you like to archive this game?
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={closeModal} sx={{ marginTop: 2 }}>
                            No
                        </Button>
                        <Button onClick={archiveGame} sx={{ marginTop: 2 }}>
                            Yes
                        </Button>
                    </div>
                </Box>
            </Modal>
            <Button
                onClick={() => {
                    deleteGame(params).then();
                    setToggle((prevState) => !prevState);
                }}
            >
                Delete game
            </Button>
        </MainCard>
    );
};

export default PlayNormalGame;
