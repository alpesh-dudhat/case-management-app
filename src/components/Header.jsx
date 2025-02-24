import {  Stack } from '@mui/material';
import React from 'react';
import Filters from './Filters';
import useCaseStore from '../store/useCaseStore';
import BatchActions from './BatchActions';
import ColumnSelector from './ColumnSelector';


const Header = () => {
    const { filters, updateFilters, fetchCases, selectedCases, updateCaseStatus, columnVisibility, toggleColumnVisibility } = useCaseStore();

    return (
        <>
            <Stack
                sx={{
                    display: { md: 'flex' },
                    width: '100%',
                    alignItems: { xs: 'flex-start', md: 'center' },
                    justifyContent: 'space-between',
                    maxWidth: { sm: '100%' },
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: {xs: 2, md: 0},
                }}
                spacing={2}
            >
                <Filters filters={filters} updateFilters={updateFilters} fetchCases={fetchCases} />

                <Stack direction="row" sx={{ gap: 2, justifyContent: 'center', marginTop: '0 !important'}}>
                    <BatchActions selectedCases={selectedCases} updateCaseStatus={updateCaseStatus} />
                    <ColumnSelector
                        columnVisibility={columnVisibility}
                        toggleColumnVisibility={toggleColumnVisibility}
                    />
                </Stack>
            </Stack>


        </>
    );
};

export default Header;