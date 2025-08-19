import { useEffect, useState } from 'react'
import { Box, Stack, Typography, IconButton, Button, Modal, TextField } from '@mui/material'
import { useParams, useNavigate, useLocation, useMatch } from 'react-router-dom';
import useStore from "../store/useStore.js";

// ICON
import FlagIcon from '@mui/icons-material/Flag';
import AddIcon from '@mui/icons-material/Add';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import CancelIcon from '@mui/icons-material/Cancel';

function ChannelForm() {
    const [open, setOpen] = useState(false);
    const isEditMode = Boolean(useMatch('/edit/:channelId'));

    // 表單動作
    const formData = useStore((state) => state.formData);
    const handleResetForm = useStore((state) => state.handleResetForm);
    const handleAddUser = useStore((state) => state.handleAddUser);
    const handleSetOwner = useStore((state) => state.handleSetOwner);
    const handleDeleteOwner = useStore((state) => state.handleDeleteOwner);
    const handleUpdateUserName = useStore((state) => state.handleUpdateUserName);
    const handleUpdateChannel = useStore((state) => state.handleUpdateChannel);

    // 偵測頁面變化
    const { channelId } = useParams();
    const navigate = useNavigate();
    const matchEditMode = useMatch('/edit/:channelId')
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/add') {
            console.log('openAdd');
            setOpen(true);
        } else if (isEditMode) {
            console.log('openEdit');

            // GETAPI 拿回的資料
            const users = [
                {
                    "name": "肩膀重重的",
                    "isOwner": false
                },
                {
                    "name": "肩膀重重的A",
                    "isOwner": true
                },
                {
                    "name": "肩膀重重的B",
                    "isOwner": false
                },
                {
                    "name": "肩膀重重的C",
                    "isOwner": false
                }
            ];

            const channel = 123

            handleResetForm({ channel, users });

            setOpen(true);
        } else {
            navigate('/')
        }
    }, [location.pathname])

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        handleResetForm();
        setOpen(false);
        navigate('/');
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 

        console.log('表單送出',formData);
    }

    return (
        <Modal open={open} onClose={handleClose} >
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

                {/* 標題 */}
                <Typography
                    color="text.white"
                    fontSize={16}
                    marginBottom={3}
                    letterSpacing={1}
                >
                    新增頻道
                </Typography>

                <form onSubmit={handleSubmit}>
                    {/* 頻道 */}
                    <TextField
                        fullWidth
                        placeholder='輸入頻道'
                        type='number'
                        value={formData.channel}
                        onChange={(event) => { handleUpdateChannel(event.target.value) }}
                    />

                    {/* 玩家 */}
                    <Stack
                        direction={'column'}
                        marginTop={5}
                        spacing={2}
                    >
                        {
                            formData.users.map(({ name, isOwner }, index) => (
                                <Stack
                                    key={`userList-${index}`}
                                    direction={'row'}
                                    justifyContent={'start'}
                                    alignItems={'center'}
                                    height={'100%'}
                                    spacing={2}
                                    sx={{ border: 0 }}
                                >
                                    <TextField
                                        placeholder='玩家名稱'
                                        value={name}
                                        onChange={(event) => { handleUpdateUserName({ index, name: event.target.value }) }}
                                        sx={{
                                            flexGrow: 1
                                        }}
                                    />
                                    {/* 擁有者icon */}
                                    <IconButton
                                        onClick={() => { handleSetOwner(index) }}
                                    >
                                        {isOwner
                                            ? <FlagIcon color='primary' />
                                            : <OutlinedFlagIcon />
                                        }

                                    </IconButton>

                                    {/* 刪除按鈕 */}
                                    <IconButton color='warning' onClick={() => { handleDeleteOwner(index) }}>
                                        <CancelIcon />
                                    </IconButton>
                                </Stack>
                            )
                            )
                        }

                        <Button variant='outlined' startIcon={<AddIcon />} onClick={handleAddUser}>
                            新增成員
                        </Button>
                    </Stack>

                    {/* 按鈕 */}
                    <Stack
                        spacing={2}
                        marginTop={3}
                        direction={'row'}
                        justifyContent={'end'}
                    >
                        {/* 取消 */}
                        <Button
                            onClick={handleClose}
                            variant='outlined'
                            sx={{
                                color: 'text.default',
                                borderColor: 'text.default'
                            }}
                        >
                            取消
                        </Button>

                        {/* 確認 */}
                        <Button
                            type='submit'
                            variant='contained'
                        >
                            確認
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    )
}

export default ChannelForm