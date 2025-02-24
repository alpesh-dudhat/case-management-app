import React, { useState, useEffect } from 'react';
import useCaseStore from '../store/useCaseStore';
import { Stack, Typography, TextField, IconButton, useMediaQuery, useTheme } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Pagination = () => {
  const { pagination, updatePagination, isLoading } = useCaseStore();
  const [inputPage, setInputPage] = useState(pagination.page.toString());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const startItem = (pagination.page - 1) * pagination.limit + 1;
  const endItem = Math.min(pagination.page * pagination.limit, pagination.total);
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  useEffect(() => {
    setInputPage(pagination.page.toString());
  }, [pagination.page]);

  const handlePageChange = (newPage) => {
    const page = Math.max(1, Math.min(newPage, totalPages));
    if (page !== pagination.page && !isLoading) {
      updatePagination({ page });
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) { 
      setInputPage(value);
    }
  };

  const handleInputBlur = () => {
    const newPage = parseInt(inputPage, 10);
    if (!isNaN(newPage) && newPage !== pagination.page && !isLoading) {
      handlePageChange(newPage);
    } else {
      setInputPage(pagination.page.toString());
    }
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleInputBlur();
    }
  };

  return (
    <Stack 
      direction="row"
      justifyContent="space-between" 
      alignItems= "center" 
      spacing={isMobile ? 2 : 0}
      sx={{ mt: {xs:'16px',sm:'35px', md:'51px'} }}
    >
      <Typography variant="body1"
        sx={{
          fontWeight: 600,
          fontSize: '12px',
          letterSpacing: '0.05em',
          color: '#606f89',
        }}>
        {startItem}-{endItem} of {pagination.total} cases
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1}>
        <TextField
          value={inputPage}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyPress}
          variant="outlined"
          disabled={isLoading}
          size="small"
          sx={{
            borderRadius: '6px',
            width: '40px',
            height: '40px',
            boxShadow: '0 2px 5px 0 rgba(89, 96, 120, 0.1), 0 0 0 1px rgba(70, 79, 96, 0.16), 0 1px 1px 0 rgba(0, 0, 0, 0.1)',
            '& .MuiInputBase-root': {
              height: '100%',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& input': {
              padding: '4px',
              textAlign: 'center',
              fontWeight: 500,
              fontSize: '12px',
              letterSpacing: '0.03em',
              lineHeight: '1.5',
              color: '#171c26',
            }
          }}
        />

        <Typography variant="body2" sx={{
          fontWeight: 500,
          fontSize: '12px',
          letterSpacing: '0.03em',
          lineHeight: '1.5',
          color: '#687182',
        }}>/ {totalPages}</Typography>

        <IconButton
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page === totalPages  || isLoading}
          size="small" 
          sx={{
            borderRadius: '6px',
            padding: '2px 4px',
            width: '40px',
            height: '40px',
            boxShadow: '0 2px 5px 0 rgba(89, 96, 120, 0.1), 0 0 0 1px rgba(70, 79, 96, 0.16), 0 1px 1px 0 rgba(0, 0, 0, 0.1)',
            '& .MuiTouchRipple-root': { display: 'none' },
            '& svg': { fontSize: '10px', color: '#464F60' }
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
   );
};

export default Pagination;
