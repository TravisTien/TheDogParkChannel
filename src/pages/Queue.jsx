import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { useParams, useNavigate, useLocation, useMatch } from 'react-router-dom';
import { useState, useEffect} from 'react';

// API
import { updateQueue, getChannel } from '../api/channelsApi.js';

function Queue() {
    const [channel, setChannel] = useState(0);
    const [queueList, setQueueList] = useState([]);
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState('');

    // 偵測頁面變化
    const isQueue = Boolean(useMatch('/queue/:channelId'));
    const { channelId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const handleClose = () => {
        setOpen(false);
        navigate('/');
    };

    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    };

    const handleRemoveQueueUser = (index) => {
        const newQueueList = [...queueList];
        newQueueList.splice(index, 1);

        setQueueList(newQueueList);
    }

    const clickAddQueueUser = () => {
        if (userName.trim() === '') return;
        setQueueList(prev => [...prev, userName]);
        setUserName('');
    }

    // 頁面打開時
    useEffect(() => {
        const fetchChannel = async () => {
            const channelData = await getChannel(channelId);
            // console.log('單一頻道資料', channelData);
            setQueueList(channelData.queue || []);
            setChannel(channelData.channel || 0);
        }

        if (isQueue && channelId) {
            fetchChannel();
            setOpen(true);
        }

    }, [location.pathname])

    // 監測排隊名單變化
    useEffect(() => {
        if (isQueue) {
            try {
                updateQueue(channelId, { queue: queueList });
                // console.log('更新排隊名單成功');
            } catch (error) {
                // console.error('更新排隊名單錯誤', error)
            }
        }
    }, [queueList])

    return (
        <Modal open={open} onClose={handleClose}>
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
                    {`${channel}頻道 - 排隊順序`}
                </Typography>

                {/* 排隊狀態 */}
                <Typography color="text.secondary">
                    {queueList.length === 0 ? '目前沒有人排隊' : `目前有${queueList?.length}人在排隊`}
                </Typography>

                {/* 排隊列表 */}
                <Stack
                    sx={{
                        padding: 1,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 2,
                        boxShadow: 3,
                        bgcolor: 'paper.main',
                    }}
                    spacing={1}
                >
                    {queueList?.length === 0 &&
                        (<Typography color="text.secondary" textAlign='center'>
                            目前沒有人排隊
                        </Typography>
                        )
                    }

                    {/* 單一排隊資料 */}
                    {queueList.map((user, index) => {
                        return (
                            <Box
                                key={`queue-user-${index}`}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    color: 'text.default',
                                    border: 1,
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                    paddingX: 2,
                                    paddingY: 1,

                                }}
                            >
                                <Box
                                    sx={{
                                        border: 1,
                                        height: '25px',
                                        aspectRatio: '1/1',
                                        borderRadius: '50%',

                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography>{index + 1}</Typography>
                                </Box>
                                <Typography
                                    sx={{
                                        marginLeft: 2,
                                        marginRight: 'auto',
                                    }}
                                >
                                    {user}
                                </Typography>

                                {/* 移除按鈕 */}
                                <Button variant='outlined' size='small'
                                    onClick={() => { handleRemoveQueueUser(index) }}
                                >
                                    移除

                                </Button>
                            </Box>
                        )
                    })}

                </Stack>

                {/* 新增排隊人員 */}
                <Stack
                    spacing={1}
                    sx={{
                        marginTop: 3,
                        padding: 1,
                        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.5)', // 加入陰影
                        borderRadius: '4px', // 可選，讓邊角更圓滑
                    }}
                >
                    <TextField
                        fullWidth
                        label='填寫名稱'
                        placeholder='填寫名稱'
                        onChange={(event) => { handleChangeUserName(event) }}
                        size='small'
                        value={userName}
                    />
                    <Button
                        onClick={clickAddQueueUser}
                        fullWidth
                        variant='outlined'
                    >
                        新增排隊人員
                    </Button>
                </Stack>
            </Box>
        </Modal>
    )
}

export default Queue