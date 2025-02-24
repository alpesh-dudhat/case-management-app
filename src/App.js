import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Box, Typography, CssBaseline, IconButton, useMediaQuery, useTheme, Stack } from '@mui/material';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import useCaseStore from './store/useCaseStore';
import MenuIcon from '@mui/icons-material/Menu';
import './App.css';

const pageNames = {
  '/': 'All Cases',
  '/pending': 'Pending Cases',
  '/accepted': 'Accepted Cases',
  '/rejected': 'Rejected Cases',
};

function DynamicTitle() {
  const location = useLocation();
  const pageName = pageNames[location.pathname] || 'Page Not Found';

  return (
    <Typography
      noWrap
      sx={{ fontSize: { xs: "20px", md: '24px' },  lineHeight: 'normal' }}
    >
      {pageName}
    </Typography>
  );
}

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { toggleSidebar, setIsMobile } = useCaseStore();

  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile, setIsMobile]);


  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <CssBaseline /> {/* Normalizes CSS */}
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: '24px 36px'},
            overflow: 'auto', 
            width: 'calc(100% - 240px)',
          }}
        >
          <Stack direction="row"  alignItems="center" sx={{mb: { xs: 2, sm: 2, md: '24px' }}}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleSidebar}
              sx={{ mr: 2, width: '40px', height: '40px' }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <DynamicTitle />
          </Stack>
         
          <Routes>
            <Route path="/" element={<Dashboard status=""/>} />
            <Route path="/pending" element={<Dashboard status="In Progress" />} />
            <Route path="/accepted" element={<Dashboard status="Accepted" />} />
            <Route path="/rejected" element={<Dashboard status="Rejected" />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;