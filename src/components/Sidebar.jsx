import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import useCaseStore from '../store/useCaseStore';

const drawerWidth = 240;

const StyledListItemButton = styled(ListItemButton)(({ theme, active }) => ({
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    color: active ? 'white' : 'rgba(46, 59, 82, 1)',
    backgroundColor: active ? 'rgba(10, 101, 255, 1)' : 'transparent',
    '&:hover': {
        backgroundColor: active ? 'rgba(10, 101, 255, 0.8)' : '#dae1ec;',
    },
    '& .MuiListItemText-root': {
        marginTop: 10,
        marginBottom: 10,
    },
    '& .MuiTypography-root': {
        fontSize: theme.typography.pxToRem(14),
        [theme.breakpoints.down('sm')]: {
            fontSize: theme.typography.pxToRem(12),
        },
    },
    '& .MuiListItemIcon-root': {
        color: active ? 'white' : 'inherit',
        minWidth: 32,
    },
    '& .MuiSvgIcon-root': {
        fontSize: theme.typography.pxToRem(20),
        [theme.breakpoints.down('sm')]: {
            fontSize: theme.typography.pxToRem(18),
        },
    },
}));

const Sidebar = () => {
    const location = useLocation();
    const { sidebarOpen, isMobile, toggleSidebar } = useCaseStore();

    const menuItems = [
        { text: 'All Cases', icon: <WorkOutlineOutlinedIcon />, path: '/' },
        { text: 'Pending Cases', icon: <PendingOutlinedIcon />, path: '/pending' },
        { text: 'Accepted Cases', icon: <CheckCircleOutlineOutlinedIcon />, path: '/accepted' },
        { text: 'Rejected Cases', icon: <CancelOutlinedIcon />, path: '/rejected' },
    ];

    const drawer = (
        <>
            <Toolbar />
            <List>
                {menuItems.map((item) => (
                    <StyledListItemButton
                        key={item.text}
                        component={Link}
                        to={item.path}
                        active={location.pathname === item.path ? 1 : 0}
                        onClick={isMobile ? toggleSidebar : undefined}
                        sx={{ 
                            paddingLeft: '16px',
                         }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </StyledListItemButton>
                ))}
            </List>
        </>
    );

    return (
        <>
        
            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={isMobile ? sidebarOpen : true}
                onClose={toggleSidebar}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                        transition: theme => theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration:200, 
                        }),
                    '& .MuiDrawer-paper': {
                        width: isMobile ? (sidebarOpen ? drawerWidth : 0) : drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: 'rgba(244, 247, 252, 1)',
                        paddingRight: isMobile ? (sidebarOpen ? "14px" : 0) : "14px",
                        overflowX: 'hidden',
                    },
                    display: { xs: sidebarOpen ? 'block' : 'none', md: 'block' },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
};

export default Sidebar;
