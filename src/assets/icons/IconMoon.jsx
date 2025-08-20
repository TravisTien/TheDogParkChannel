import { Box } from "@mui/material";

const IconMoon = ({ color, fillColor, ...props }) => {
    return (
        <Box component={"svg"} viewBox="0 0 22 22" {...props}>
            <g clip-path="url(#a)">
                <path stroke="#091540" fill={fillColor} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.98"
                    d="M20.125 11.877A7.333 7.333 0 1 1 10.124 1.875a9.168 9.168 0 1 0 10.001 10.002Z" />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h22v22H0z" />
                </clipPath>
            </defs>
        </Box>
    )
}

export default IconMoon;