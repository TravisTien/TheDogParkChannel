import { useState, useEffect } from 'react'
import { Box, Stack, Typography, IconButton, Button, Grid, Popover, Modal } from '@mui/material'
import { ThemeProvider } from '@emotion/react';
import { lightTheme, darkTheme } from "../theme.js";
import { useNavigate } from 'react-router-dom';


// API
import { deleteChannel } from "../api/channelsApi.js";

// 自訂義組件
import ChannelForm from "./ChannelForm.jsx";
import useStore from "../store/useStore.js";
import { zones } from "../utils/constants.js";

// ICON
import MapIcon from '@mui/icons-material/Map';
import PetsIcon from '@mui/icons-material/Pets';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FlagIcon from '@mui/icons-material/Flag';
import SunnyIcon from '@mui/icons-material/Sunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function ChannelListCD() {
    const [mapOpen, setMapOpen] = useState(false);
    const handleMapOpen = () => {
        setMapOpen(true);
    };
    const handleMapClose = () => {
        setMapOpen(false);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [editChannelId, setEditChannelId] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(true);
    const theme = isDarkMode ? darkTheme : lightTheme;
    const navigate = useNavigate();

    const fetchChannel = useStore((state) => state.fetchChannel);
    const isLoading = useStore((state) => state.isLoading);
    const channels = useStore((state) => state.channels);
    const zone = useStore((state) => state.zone);
    const handleSetZone = useStore((state) => state.handleSetZone);

    useEffect(() => {
        fetchChannel(zone);
    }, [fetchChannel, zone])

    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
    }
    const handlePopoverClose = () => {
        setAnchorEl(null);
    }
    const handlePopoverClick = (event, id) => {
        console.log(id);
        
        setAnchorEl(event.currentTarget);
        setEditChannelId(id);
    };
    const handleDeleteChannel = () => {
        const confirmed = window.confirm('確定要刪除頻道嗎');
        if (confirmed && editChannelId) {
            // console.log(editChannelId);

            deleteChannel(editChannelId);
            setAnchorEl(null);
            fetchChannel(zone);
        }
    };

    const handleChangeZone = (zone) => {
        handleSetZone(zone);
        handleMapClose();
    }

    const open = Boolean(anchorEl);

    return (
        <ThemeProvider theme={theme}>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={
                    {
                        vertical: 'bottom',
                        horizontal: 'center',
                    }
                }
            >
                <Stack
                    padding={1}
                    spacing={.5}
                >
                    {/* 編輯 */}
                    <Button
                        variant='outlined'
                        onClick={() => { navigate(`/edit/${editChannelId}`) }}
                    >
                        編輯
                    </Button>

                    {/* 刪除 */}
                    <Button
                        variant='outlined'
                        onClick={handleDeleteChannel}
                    >
                        刪除
                    </Button>
                </Stack>
            </Popover>

            {/* ZoneList */}
            <Modal
                open={mapOpen}
                onClose={handleMapClose}
            >

                <Box
                    sx={{
                        height: "auto",
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'paper.main',
                        boxShadow: 24,
                        border: 1,
                        borderColor: 'text.secondary',
                        p: 4,
                        borderRadius: 5
                    }}
                >
                    <Typography color="text.white" fontSize={16} marginBottom={3} letterSpacing={1}>選擇地圖</Typography>
                    <Grid
                        width={'100%'}
                        container
                        spacing={1}
                    >
                        {zones.map(zoneName => (
                            <Grid size={3}>
                                <Button
                                    onClick={() => { handleChangeZone(zoneName) }}
                                    color={zone === zoneName ? 'primary' : 'info'}
                                    sx={{
                                        width: '100%',
                                        border: 2
                                    }}
                                    variant='outlined'
                                >
                                    <Typography color="text">{zoneName}</Typography>
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Modal>

            {/* Main */}
            <Box
                maxWidth={"100vw"}
                minHeight={"100vh"}
                paddingY={5}
                sx={{
                    background: (theme) => theme.palette.gradients.primary,
                    paddingX: {
                        xs: 2,
                        sm: 3,
                        md: 15
                    }
                }}
            >
                {/* NavBar */}
                <Stack
                    width={"100%"}
                    height={75}
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    paddingY={1} paddingX={2} marginBottom={5}
                    sx={{
                        backgroundColor: "paper.main",
                        border: 1,
                        borderRadius: 3
                    }}
                >
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        sx={{ border: 0 }}
                        spacing={2}
                    >
                        <PetsIcon color='primary' />
                        <Typography fontSize={24} color="text.white" fontWeight={800}>Dog Park</Typography>
                    </Stack>

                    <Stack
                        spacing={1}
                        direction={'row'}
                        justifyContent={'start'}
                        height={'100%'}
                        paddingY={1}
                    >
                        {/* 地圖 */}
                        <Button
                            onClick={handleMapOpen}
                            variant='contained'
                            color={'info'}
                            sx={{
                                border: 2,
                                height: '100%',
                                minWidth: 0,
                                aspectRatio: '1/1'
                            }}
                        >
                            <MapIcon />
                        </Button>

                        {/* 模式切換 */}
                        <Button
                            variant='contained'
                            color={'info'}
                            sx={{
                                border: 2,
                                height: '100%',
                                minWidth: 0,
                                aspectRatio: '1/1'
                            }}
                        >
                            {/* 切換模式 */}
                            {theme.palette.mode === "light"
                                ? <DarkModeIcon onClick={handleToggle} />
                                : <SunnyIcon onClick={handleToggle} />
                            }
                        </Button>
                    </Stack>
                </Stack>

                {/* 功能列 */}
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} marginBottom={5}
                    sx={{
                        flexDirection: {
                            xs: "column",
                            md: "row"
                        },
                    }}
                >
                    {/* 頁面標題 */}
                    <Typography
                        variant="h1"
                        fontSize={18}
                        fontWeight={700}
                        color="text.default"
                        sx={{
                            marginBottom: {
                                xs: 2,
                                md: 0
                            }
                        }}
                    >
                        地圖名稱 : {zone}
                    </Typography>

                    {/* 新增頻道 */}
                    <Button
                        variant='contained'
                        onClick={() => { navigate('/add') }}
                    >
                        新增頻道
                    </Button>
                </Stack>

                {/* 卡片 */}
                <Grid container spacing={1} width={"100%"}>
                    {isLoading && (
                        <Grid size={12}>
                            <Stack
                                direction={'row'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <Typography
                                    color="text.default"
                                    align='center'
                                    width='auto'
                                    padding={2}
                                    sx={{
                                        display: 'inline',
                                        border: 1,
                                        backgroundColor: "paper.main",
                                        border: "1px solid hsla(0,0%,100%,.3)",
                                        borderRadius: 4
                                    }}
                                >
                                    載入中...
                                </Typography>
                            </Stack>
                        </Grid>
                    )}

                    {channels.length === 0 && (
                        <Grid size={12}>
                            <Stack
                                direction={'row'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <Typography
                                    color="text.default"
                                    align='center'
                                    width='auto'
                                    padding={2}
                                    sx={{
                                        display: 'inline',
                                        border: 1,
                                        backgroundColor: "paper.main",
                                        border: "1px solid hsla(0,0%,100%,.3)",
                                        borderRadius: 4
                                    }}
                                >
                                    目前沒有頻道資料。
                                </Typography>
                            </Stack>
                        </Grid>
                    )}

                    {channels.map(({ channel, users, id, zone }) => (
                        <Grid
                            key={id}
                            size={{ xs: 12, sm: 6, md: 4 }}
                            padding={2}
                            sx={{
                                backgroundColor: "paper.main",
                                border: "1px solid hsla(0,0%,100%,.3)",
                                borderRadius: 4
                            }}
                        >
                            {/* 資訊 */}
                            <Stack
                                direction={"column"}
                                alignItems={"start"}
                            >
                                {/* 頻道/按鈕 */}
                                <Stack
                                    direction={"row"}
                                    justifyContent={"space-between"}
                                    alignItems={"center"}
                                    marginBottom={2}
                                    paddingBottom={1}
                                    paddingLeft={3}
                                    width={'100%'}
                                    sx={{
                                        borderBottom: 1,
                                        borderColor: 'divider'
                                    }}
                                >
                                    <Stack
                                        direction={"row"}
                                        justifyContent={"start"}
                                        alignItems={"center"}
                                        spacing={1}
                                    >
                                        {/* 頻道 */}
                                        <Typography
                                            fontSize={16}
                                            letterSpacing={2}
                                            fontWeight={700}
                                            color="text.default"
                                        >
                                            頻道:{channel}
                                        </Typography>

                                        {/* Zone */}
                                        <Typography
                                            color="#f35a53"
                                            fontSize={12}
                                            sx={{
                                                border: 1,
                                                paddingY: 0.5,
                                                paddingX: 1,
                                                borderRadius: 3
                                            }}
                                        >
                                            {zone}
                                        </Typography>
                                    </Stack>

                                    {/* 按鈕 */}
                                    <IconButton onClick={(event) => { handlePopoverClick(event, id) }}>
                                        <MoreHorizIcon />
                                    </IconButton>
                                </Stack>

                                {/* 成員 */}
                                <Grid container
                                    width={'100%'}
                                    spacing={1}
                                    sx={{
                                        border: 0,
                                    }}
                                >
                                    {users.map(({ name, isOwner }, index) => (
                                        <Grid key={`userIndex:${index}`} size={6}>
                                            <Stack
                                                direction={'row'}
                                                alignItems={'center'}
                                                height={'100%'}
                                                spacing={0.1}
                                            >
                                                <Box width={'15%'} height={'100%'} color={'primary.main'} >
                                                    {isOwner && <FlagIcon />}
                                                </Box>
                                                <Typography
                                                    fontSize={14}
                                                    letterSpacing={1}
                                                    color='text.default'
                                                >
                                                    {name}
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
                <ChannelForm />
            </Box >
        </ThemeProvider >
    )
}

export default ChannelListCD