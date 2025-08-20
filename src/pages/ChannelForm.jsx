import { useEffect, useState } from 'react'
import { Box, Stack, Typography, IconButton, Button, Modal, TextField, Popover } from '@mui/material'
import { useParams, useNavigate, useLocation, useMatch } from 'react-router-dom';
import useStore from "../store/useStore.js";
import * as yup from 'yup';

// 資料庫
import { addChannels, updateChannel, getChannel } from '../api/channelsApi.js';

// Icon
import FlagIcon from '@mui/icons-material/Flag';
import AddIcon from '@mui/icons-material/Add';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function ChannelForm() {
    const [open, setOpen] = useState(false);
    const [originData, setOriginData] = useState('');
    const navigate = useNavigate();

    // Popover設定
    const [anchorEl, setAnchorEl] = useState(null);
    const openPopover = Boolean(anchorEl);
    const handleQuestionClick = (event) => {
        console.log(event.currentTarget);

        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    // 表單動作
    const formData = useStore((state) => state.formData);
    const handleResetForm = useStore((state) => state.handleResetForm);
    const handleAddUser = useStore((state) => state.handleAddUser);
    const handleSetOwner = useStore((state) => state.handleSetOwner);
    const handleDeleteOwner = useStore((state) => state.handleDeleteOwner);
    const handleUpdateUserName = useStore((state) => state.handleUpdateUserName);
    const handleUpdateChannel = useStore((state) => state.handleUpdateChannel);

    // API
    const fetchChannel = useStore((state) => state.fetchChannel);

    // 偵測頁面變化
    const isEditMode = Boolean(useMatch('/edit/:channelId'));
    const { channelId } = useParams();
    const location = useLocation();

    // Yup設定
    const [errors, setErrors] = useState({});
    const channelSchema = yup.object().shape({
        channel: yup.number().required('必須輸入頻道').max(6000,'頻道不能超過6000').typeError('必須輸入頻道')
    });

    useEffect(() => {
        // 拿單一頻道資料
        const fetchChannel = async () => {
            const channelData = await getChannel(channelId);
            // console.log('單一頻道資料', channelData);

            // const test = JSON.parse(JSON.stringify(channelData));
            setOriginData(JSON.parse(JSON.stringify(channelData)));
            handleResetForm({
                channel: Number(channelData.channel),
                users: channelData.users
            });
        }

        if (location.pathname === '/add') {
            setOpen(true);
        } else if (isEditMode) {
            fetchChannel();
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
        setErrors({});
        setOpen(false);
        navigate('/');
    };

    const hasChanges = () => {
        // console.log('原始資料', originData);
        // console.log('修改後的資料', formData);

        // 判斷頻道
        if (originData.channel !== formData.channel) return true;
        // 判斷長度
        if (formData.users.length !== originData.users.length) return true;
        ;

        // 比較每一個值
        for (let i = 0; i < formData.users.length; i++) {
            const oldUser = originData.users[i];
            const newUser = formData.users[i];

            if (oldUser.name !== newUser.name || oldUser.isOwner !== newUser.isOwner) {
                return true
            };
        };
        return false;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            channelSchema.validateSync(formData, { abortEarly: false });
            setErrors({});
        } catch (err) {
            // console.error('驗證失敗', err);
            const newError = {};
            err.inner.forEach(error => {
                newError[error.path] = error.message
            })
            
            setErrors(newError);
            return
        }

        if (location.pathname === '/add') {

            await addChannels(formData);
            fetchChannel();
            handleClose();
            return;
        } else if (isEditMode && channelId) {
            try {
                if (hasChanges()) {
                    // alert('資料被更動。');
                    const updatedFields = {};

                    if (originData.channel !== formData.channel) {
                        updatedFields.channel = formData.channel
                    };

                    if (JSON.stringify(originData.users) !== JSON.stringify(formData.users)) {
                        updatedFields.users = formData.users;
                    }

                    // console.log('更改的資料', updatedFields);

                    updateChannel(channelId, updatedFields);

                    handleClose();
                    fetchChannel();
                    return;
                } else {
                    // console.log('資料沒有更改');
                    handleClose();
                    return;
                }
            } catch (e) {
                alert('更新資料發生錯誤', e);
            }
        }
    };

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
                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'start'}
                >
                    {/* 標題 */}
                    <Typography
                        color="text.white"
                        fontSize={16}
                        marginBottom={3}
                        letterSpacing={1}
                    >
                        {isEditMode ? '編輯頻道' : '新增頻道'}
                    </Typography>

                    <Button

                        onClick={handleQuestionClick}
                    >
                        <HelpOutlineIcon sx={{ color: 'text.default' }} />
                    </Button>
                </Stack>

                {/* 表單 */}
                <Box component={'form'} onSubmit={handleSubmit}>
                    {/* 頻道 */}
                    <TextField
                        fullWidth
                        placeholder='輸入頻道'
                        type='number'
                        value={formData.channel}
                        error={!!errors.channel}
                        helperText={errors.channel}
                        onChange={(event) => { handleUpdateChannel(event.target.value) }}
                    />

                    {/* 玩家 */}
                    <Stack
                        direction={'column'}
                        marginTop={5}
                        spacing={2}
                    >
                        <Typography
                            letterSpacing={1}
                            fontSize={14}
                            color="text.default"
                        >
                            成員列表
                        </Typography>
                        {formData.users.map(({ name, isOwner }, index) => (
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
                        )}

                        <Button variant='outlined' startIcon={<AddIcon />}
                            sx={{
                                // color: 'text.secondary',
                                // border: 'text.secondary'
                            }}
                            // color='secondary'
                            onClick={handleAddUser}>
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
                </Box>

                {/* 說明視窗 */}
                <Popover
                    open={openPopover}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Stack
                        spacing={2}
                        width={250}
                        p={2}
                        sx={{
                            border: 0
                        }}
                    >
                        {/* 旗幟說明 */}
                        <Box>
                            <Typography
                                fontSize={14}
                                fontWeight={500}
                                color="primary.main"
                                letterSpacing={2}
                            >
                                旗幟圖案:

                            </Typography>
                            <Typography fontSize={14}>
                                用來識別地圖擁有者。若是公會成員，設定任何人都可以。
                            </Typography>
                        </Box>

                        {/* 旗幟說明 */}
                        <Box>
                            <Typography
                                fontSize={14}
                                fontWeight={500}
                                color="primary.main"
                                letterSpacing={2}
                            >
                                玩家名稱:

                            </Typography>
                            <Typography fontSize={14}
                                whiteSpace={'pre-line'}
                            >
                                公會成員才輸入遊戲ID，其他人則填「路人」即可。
                            </Typography>
                        </Box>
                    </Stack>
                </Popover>
            </Box>
        </Modal>
    )
}

export default ChannelForm