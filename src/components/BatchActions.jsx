import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import styled from 'styled-components';
import useCaseStore from '../store/useCaseStore';

const StyledButton = styled(Button)({
  textTransform: 'none !important',
  color: 'white !important',
  border: '1px solid #5f7cb0 !important',
  backgroundColor: '#7d90b2 !important',
  borderRadius: '6px',
  height: '32px',
  letterSpacing: '0.02em',
  boxShadow: 'none',
  padding:"6px 12px !important",
});



const BatchActions = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { selectedCases, updateCaseStatus } = useCaseStore(); 

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleBatchStatusUpdate = (status) => {
    if (selectedCases.length === 0) return;
    updateCaseStatus(selectedCases, status);
    handleMenuClose();
  };

  return (
    <>
      <StyledButton
        onClick={handleMenuOpen}
        endIcon={Boolean(anchorEl) ? <ArrowDropUp /> : <ArrowDropDown />}
      >
        Batch action
      </StyledButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: { width: anchorEl && anchorEl.offsetWidth }
       }}
        sx={{
          '& .MuiPopover-paper': {
            marginTop: '5px',
          },
          '& .MuiMenu-list': {
            '& .MuiMenuItem-root': {
              fontWeight: 400,
              width:'100%',
              fontSize: '14px',
              color: '#1a212c',
              padding: '5px 10px',
              lineHeight: 'normal',
              '&:hover': {
                backgroundColor: '#EBF2FF',
              },
            },
          },

        }}
      >
        <MenuItem onClick={() => handleBatchStatusUpdate('Accepted')}>Accept Cases</MenuItem>
        <MenuItem onClick={() => handleBatchStatusUpdate('Rejected')}>Reject Cases</MenuItem>
      </Menu>
    </>
  );
};

export default BatchActions;
