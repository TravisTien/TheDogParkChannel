import { useState } from 'react'
import { Box, Stack, Typography, IconButton, Button, Grid, Popover } from '@mui/material'
import { ThemeProvider } from '@emotion/react';
import { lightTheme, darkTheme } from "../theme.js";
import { useNavigate } from 'react-router-dom';

import ChannelForm from "./ChannelForm.jsx";

import LightModeIcon from '@mui/icons-material/LightMode';
import channelData from "../assets/channelData.json";
import IconSun from "../assets/icons/IconSun.jsx";
import IconMoon from "../assets/icons/IconMoon.jsx";
import PetsIcon from '@mui/icons-material/Pets';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FlagIcon from '@mui/icons-material/Flag';


function ChannelListCD() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [editChannelId, setEditChannelId] = useState('');
    const [extensions, setExtensions] = useState(channelData)
    const [isDarkMode, setIsDarkMode] = useState(true);
    const theme = isDarkMode ? darkTheme : lightTheme;
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
    }

    const handlePopoverClose = () => {
        setAnchorEl(null);
    }
    const handlePopoverClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setEditChannelId(id);
    };
    const handleDeleteChannel = () => {
        const confirmed = window.confirm(確定要刪除頻道嗎)
        if (confirmed) {
            console.log('已成功刪除頻道');
        }
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

            {/* Main */}
            <Box maxWidth={"100vw"} minHeight={"100vh"} paddingY={5}
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
                <Stack width={"100%"} height={75} direction={"row"} justifyContent={"space-between"} alignItems={"center"}
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

                    {/* 切換模式 */}
                    {theme.palette.mode === "light"
                        ? <IconMoon height="80%" width="auto" onClick={handleToggle}
                            color={theme.palette.text.default}
                            fillColor={theme.palette.button.inactive}
                            sx={{
                                // border: 1,
                                bgcolor: "button.inactive",
                                borderRadius: 2,
                                cursor: "pointer",
                                padding: 1.5,
                                // boxSizing: "content-box",
                                ":hover": {
                                    bgcolor: "button.hover"
                                },
                            }}
                        />
                        : <IconSun height="80%" width="auto" onClick={handleToggle}
                            color={theme.palette.text.default}
                            fillColor={theme.palette.button.inactive}
                            sx={{
                                bgcolor: "button.inactive",
                                borderRadius: 2,
                                cursor: "pointer",
                                padding: 1.5,
                                ":hover": {
                                    bgcolor: "button.hover"
                                },
                            }}
                        />
                    }
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
                        地圖名稱 : CD
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
                    {extensions.map(({ channel, users, id }) => (
                        <Grid item
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
                                    {/* 頻道 */}
                                    <Typography
                                        fontSize={16}
                                        letterSpacing={2}
                                        fontWeight={700}
                                        color="text.default"
                                    >
                                        頻道:{channel}
                                    </Typography>

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
                                    {users.map(({ name, isOwner }) => (
                                        <Grid size={6}>
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
        </ThemeProvider>
    )
}

export default ChannelListCD