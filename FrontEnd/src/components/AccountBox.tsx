import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';
import { useAuth } from '../hooks/AuthContext';
import { AccountCircle } from '@mui/icons-material';

const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: '#D0F2FF',
}));

export function AccountBox() {
    const {user} = useAuth();
    return <Box sx={{ mx: 1 }}>
        <AccountStyle>
            <AccountCircle/>
            <Box sx={{ ml: 1.5 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                    {user?.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {user?.company.name}
                </Typography>
            </Box>
        </AccountStyle>
    </Box>
};