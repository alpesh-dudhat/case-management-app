import React, { useState } from 'react';
import useCaseStore from '../store/useCaseStore';
import { Button, InputBase, Paper } from '@mui/material';
import { ReactComponent as SearchIcon } from './Searchicon.svg';
import styled from 'styled-components';

const CustomSearchIcon = styled(SearchIcon)(({ theme }) => ({
  width: '16px',
  height: '16px',
  fill: '#868FA0',
}));

const Filters = () => {
  const { filters, updateFilters, fetchCases } = useCaseStore();
  const [searchValue, setSearchValue] = useState(filters.search)

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value); 
  };
  const handleSearch = () => {
    updateFilters({ search: searchValue.trim() });
    fetchCases();
  };



  return (
    <Paper
      component="form"
      sx={{
        p: '0 0 0 13px', display: 'flex', alignItems: 'center', width: '100%', maxWidth: '320px', border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: '6px',
        boxShadow: 'none',
        height: '32px',
        overflow: 'hidden',
      }}
    >
      <CustomSearchIcon sx={{ ml: '13px' }} />
      <InputBase
        sx={{ ml: 1, flex: 1, p: 0 }}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'Search' }}
        value={searchValue} 
        onChange={handleSearchChange}       
      />
      <Button
        sx={{
          backgroundColor: 'rgba(34, 100, 229, 1)',
          color: 'white',
          height: '100%',
          width: '73px',
          padding: '6px 16px',
          textTransform: 'none',
          boxShadow: '0 2px 5px 0 rgba(34, 100, 229, 0.12), 0 0 0 1px #2264e5, 0 1px 1px 0 rgba(0, 0, 0, 0.14), inset 0 1px 0 0 #4b85fa;',
          borderRadius: '6',
          '&:hover': {
            backgroundColor: 'rgba(34, 100, 229, 0.8)',
          },
        }}
        onClick={handleSearch}
      >
        Search
      </Button>

    </Paper>
  );
};

export default Filters;