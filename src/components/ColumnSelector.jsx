// ColumnSelector.jsx
import React, { useState } from 'react';
import { Button, Menu, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import useCaseStore from '../store/useCaseStore';

const ColumnSelector = () => {
    const { allColumns, columnVisibility, toggleColumnVisibility } = useCaseStore();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
        <>
            <Button
                onClick={handleMenuOpen}
                sx={{
                    textTransform: 'none',
                    letterSpacing: '0.02em',
                    padding: '6px 12px',
                    lineHeight: '1',
                    backgroundColor: 'rgba(34, 100, 229, 1)',
                    boxShadow: '0 2px 5px 0 rgba(34, 100, 229, 0.12), 0 0 0 1px #2264e5, 0 1px 1px 0 rgba(0, 0, 0, 0.14), inset 0 1px 0 0 #4b85fa;',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(34, 100, 229, 0.8)',
                    },
                }}
            >
                <span>Columns</span>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    fontSize: '14px',
                    marginTop: '5px',
                    '& .MuiMenu-list': {
                        padding: '4px 0',
                        '& .MuiMenuItem-root': {
                            fontWeight: 400,
                            fontSize: '14px',
                            color: '#1a212c',
                            padding: '4px 10px 4px 19px',
                            lineHeight: 'normal',
                            '&:hover': {
                                backgroundColor: '#F4F7FC',
                            },
                        },
                    },
                }}
            >
                {allColumns?.filter((col) => !col.alwaysVisible).map((col) => (
                    <MenuItem key={col.id}>
                        <FormControlLabel
                        sx={{ gap: '5px' , 
                        '& .MuiTypography-root': {
                            fontSize: '14px',
                        }}}
                            control={
                                <Checkbox
                                    checked={!!columnVisibility[col.id]}
                                    onChange={() => toggleColumnVisibility(col.id)}
                                    sx={{
                                        '&:hover': { background: '#DAE3F2' },
                                        height: '32px',
                                        width: '32px'
                                    }}
                                />
                            }

                            label={col.label}
                        />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default ColumnSelector;
