import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox, Chip, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Grid from '@mui/material/Grid2';
import useCaseStore from '../store/useCaseStore';

const CaseTable = () => {
  const { cases, updateCaseStatus, selectedCases, toggleCaseSelection, toggleSelectAllCases, columnVisibility, allColumns, updateFilters } = useCaseStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);

  const handleOpenMenu = (event, caseName) => {
    setAnchorEl(event.currentTarget);
    setSelectedCase(caseName);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedCase(null);
  };

  const handleSortModelChange = (newModel) => {
    if (newModel && newModel.length > 0) {
      const sortField = newModel[0].field;
      const sortOrder = newModel[0].sort; // 'asc' or 'desc'

      updateFilters({ sort: sortField, order: sortOrder });
    } else {
       updateFilters({ sort: '', order: '' });
    }
  };

  const columns = allColumns
    .filter((col) => col.alwaysVisible || columnVisibility[col.id])
    .map((col) => {
      const widthMap = {
        select: 98,
        priority: 196,
        caseName: 196,
        assignee: 196,
        description: 392,
        status: 196,
        type: 196,
        dateCreated: 196,
        lastUpdated: 196,
        actions: 74,
      };

      let sortable = true;
      if (col.id === 'select' || col.id === 'actions') {
        sortable = false;
      }

      if (col.id === 'select') {
        return {
          field: 'select',
          align: "center",
          headerAlign: 'center',
          width: widthMap.select,
          sortable: sortable,
          filterable: false,
          renderHeader: () => (
            <Checkbox
              indeterminate={selectedCases.length > 0 && selectedCases.length < cases.length}
              checked={(selectedCases.length === (cases || []).length) && (cases || []).length > 0}
              onChange={toggleSelectAllCases}
              sx={{
                '& .MuiSvgIcon-root ': {
                  fontSize: 20,
                },
              }}
            />
          ),
          renderCell: (params) => (
            <Stack alignItems="center" justifyContent={"center"} height={'100%'}>

              <Checkbox
                checked={selectedCases.includes(params.row.caseName)}
                onChange={() => toggleCaseSelection(params.row.caseName)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: 20,
                  },
                }}
              />
            </Stack>

          ),
        };
      } else if (col.id === 'actions') {
        return {
          field: 'actions',
          headerName: 'Actions',
          width: widthMap.actions,
          sortable: sortable,
          filterable: false,
          align: "center",
          headerAlign: 'center',
          renderCell: (params) => {
            const isMenuOpen = Boolean(anchorEl) && selectedCase === params.row.caseName;
            return (
              <>
                <Stack alignItems="center" justifyContent={"center"} height={'100%'}>
                  <IconButton
                    onClick={(event) => handleOpenMenu(event, params.row.caseName)}
                    size="small"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0',
                      ' & .MuiButtonBase-root.MuiIconButton-root:hover': {
                        backgroundColor: 'transparent',
                      },
                      '& .MuiTouchRipple-root': { display: 'none' },
                      '& svg': {
                        outline: isMenuOpen ? '1px solid #7d90b2' : 'none',
                        borderRadius: '50%',
                      },
                    }}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    open={isMenuOpen}
                    anchorEl={anchorEl}
                    onClose={handleCloseMenu}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    sx={{
                      '& .MuiPopover-paper': {
                        marginTop: '3px',
                      },
                      '& .MuiMenu-list': {
                        '& .MuiMenuItem-root': {
                          fontWeight: 400,
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
                    <MenuItem
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => {
                        updateCaseStatus([params.row.caseName], 'Accepted');
                        handleCloseMenu();
                      }}
                    >
                      Accept Case
                    </MenuItem>
                    <MenuItem
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => {
                        updateCaseStatus([params.row.caseName], 'Rejected');
                        handleCloseMenu();
                      }}
                    >
                      Reject Case
                    </MenuItem>
                  </Menu>
                </Stack>
              </>
            );
          },
        };
      } else if (col.id === 'description') {
        return {
          field: 'description',
          headerName: col.label,
          width: widthMap.description,
          sortable: sortable,
          cellClassName: 'description-cell',
          renderCell: (params) => (
            <Typography
            title={params.value}

            sx={{  
              lineHeight: 'normal',
              height: '40px',
              display: '-webkit-box',
              WebkitLineClamp: 2, 
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
              color: '#263238',
              maxWidth: '360px',
            }}
          >
           {params.value}
          </Typography>
          ),
        };
      } else if (['priority', 'status'].includes(col.id)) {
        return {
          field: col.id,
          headerName: col.label,
          width: widthMap[col.id],
          align: 'left',
          headerAlign: 'left',
          sortable: sortable,
          renderCell: (params) => {
            const columnMappings = {
              priority: {
                LOW: { color: 'primary', label: 'LOW', backgroundColor: '#1b4ed8' },
                HIGH: { color: 'secondary', label: 'HIGH', backgroundColor: '#ae001f' },
              },
              status: {
                'IN PROGRESS': { label: 'IN PROGRESS', backgroundColor: '#4D4C76' },
                'ACCEPTED': { label: 'ACCEPTED', backgroundColor: 'green' },
                'REJECTED': { label: 'REJECTED', backgroundColor: 'red' },
              },
            };
            const columnMapping = columnMappings[col.id] || {};
            const upperCaseValue = params.value.toUpperCase();

            const cellMapping = columnMapping[upperCaseValue] || {
              label: params.value,
              backgroundColor: '#d3d3d3',
            };

            const { label, backgroundColor } = cellMapping;

            return (
              <Chip
                label={label}
                size="small"
                sx={{
                  borderRadius: '20px',
                  padding: '8px',
                  fontSize: '12px',
                  minWidth: '40px',
                  height: '24px',
                  backgroundColor: `${backgroundColor} !important`,
                  '& .MuiChip-label': {
                    padding: '0',
                    fontWeight: 500,
                    fontSize: '10px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: '#fff'
                  },
                }}
              />
            );
          },
        };
      } else if (col.id === 'type') {
        return {
          field: col.id,
          headerName: col.label,
          width: widthMap[col.id],
          align: 'left',
          headerAlign: 'left',
          sortable: sortable,
          renderCell: (params) => (
            <Chip
              label={params.value}
              variant="outlined"
              size="small"
              sx={{
                borderRadius: '100px',
                border: '1px solid #606f89',
                fontSize: '12px',
                height: '24px',
                '& .MuiChip-label': {
                  padding: '0 8px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  fontSize: '10px',
                  letterSpacing: '0.05em',
                  color: '#606f89',
                },
              }}
            />
          ),
        };
      } else if (['caseName', 'assignee', 'dateCreated', 'lastUpdated'].includes(col.id)) {
        return {
          field: col.id,
          headerName: col.label,
          width: widthMap[col.id] || 150,
          sortable: sortable,
          renderCell: (params) => (
            <span style={{ fontWeight: 500 }}>{params.value}</span>
          ),
        };
      } else {
        return {
          field: col.id,
          headerName: col.label,
          width: widthMap[col.id] || 150, 
          sortable: sortable,
          renderCell: (params) => (
            <span style={{ fontWeight: 'medium' }}>{params.value}</span>
          ),
        };
      }
    });

    const rows = (cases || []).map((caseItem) => ({
      id: caseItem.caseName,
      ...caseItem,
    }));

  return (
    <>
      <Grid container size={{ xs: 12, lg: 12 }} spacing={2} columns={12}>
        <div style={{ height: 'calc(100vh - 250px)', width: '100%', marginTop: '24px' }}>
          <DataGrid
            hideFooterPagination
            hideFooterSelectedRowCount
            disableRowSelectionOnClick
            getRowHeight={() => 66}
            columnHeaderHeight={40}
            getEstimatedRowHeight={() => 66}
            rows={rows}
            columns={columns}
            checkboxSelection={false}
            disableSelectionOnClick
            disableColumnResize
            disableColumnMenu
            sortingMode="server"
            onSortModelChange={handleSortModelChange}
            sx={{
              bgcolor: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.15), 0 3px 6px 0 rgba(75, 81, 91, 0.15)',
              '& .MuiDataGrid-scrollbar--horizontal, .MuiDataGrid-scrollbar--vertical ': {
                ariaHidden: false,
              },
              '& .MuiDataGrid-columnHeaderTitleContainerContent': {
                textTransform: 'uppercase',
                fontWeight: 600,
                fontSize: '12px',
                letterSpacing: '0.05em',
                color: '#606f89',
              },
              '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { border: 0 },
              '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { border: 0 },
              '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { border: 0 },
              '& .MuiDataGrid-footerContainer': { minHeight: '0' },
              '& .MuiDataGrid-row': {
                '&:nth-of-type(even)': {
                  backgroundColor: '#F4F7FC',
                },
                '&:nth-of-type(odd)': {
                  backgroundColor: '#fff',
                },
              },
              '& .MuiDataGrid-container--top': {
                backgroundColor: '#f4f7fc',
              },
              '& .MuiDataGrid-columnSeparator': {
                display: "none",
              },
              '& .MuiDataGrid-root': {
                border: 'none',
              },
              '& .MuiDataGrid-row--borderBottom, .MuiDataGrid-cell': {
                '& .MuiDataGrid-columnHeader': {
                  borderBottom: 'none',
                },
              },
              '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
                padding: '0',
              },
              "& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-columnHeader:focus-within,  .MuiDataGrid-cell:focus-within": {
                outline: "none",
              },
              '& .description-cell':{
                alignItems: 'center',
                display: 'flex',
              }

            }}
          />
        </div>
      </Grid>
    </>
  );
};

export default CaseTable;
