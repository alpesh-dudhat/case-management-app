import { create } from 'zustand';
import axios from 'axios';
import debounce from 'lodash.debounce';

const COLUMN_VISIBILITY_KEY = 'columnVisibility';
// const API_BASE_URL = process.env.BASE_URL || 'http://localhost:3000';


const useCaseStore = create((set,get) => ({
  cases: [],
  selectedCases: [],
  loading: false,
  error: null,
  filters: { status: '', search: '', sort: '', order: '' },
  pagination: { page: 1, limit: 10, total: 0 },
  sidebarOpen: false,
  isMobile: false,
  isLoading: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setIsMobile: (isMobile) => set({ isMobile }),

  allColumns: [
    { id: 'select', label: 'Select', alwaysVisible: true },
    { id: 'priority', label: 'Priority' },
    { id: 'caseName', label: 'Case Name' },
    { id: 'assignee', label: 'Assignee' },
    { id: 'description', label: 'Description' },
    { id: 'status', label: 'Status' },
    { id: 'type', label: 'Type' },
    { id: 'dateCreated', label: 'Date Created' },
    { id: 'lastUpdated', label: 'Last Updated' },
    { id: 'actions', label: 'Actions', alwaysVisible: true },
  ],

  columnVisibility: JSON.parse(localStorage.getItem(COLUMN_VISIBILITY_KEY)) || {
    select: true,
    caseName: true,
    priority: true,
    assignee: true,
    description: true,
    status: true,
    type: true,
    dateCreated: true,
    lastUpdated: true,
    actions: true,
  },

  toggleColumnVisibility: (columnId) => {
    set((state) => {
      const updatedVisibility = {
        ...state.columnVisibility,
        [columnId]: !state.columnVisibility[columnId],
      };
      localStorage.setItem(COLUMN_VISIBILITY_KEY, JSON.stringify(updatedVisibility));
      return { columnVisibility: updatedVisibility };
    });
  },

 
  fetchCases: async () => {
    const state = get();
    if (state.isLoading) return; 

    set({ isLoading: true, error: null });
    try {
      const { filters, pagination } = state;
      const { status, search, sort, order } = filters;
      const { page, limit } = pagination;

      const response = await axios.get(`/requests`, {
        params: { status, search, sort, order, page, limit },
      });

      set({
        cases: response.data.data,
        pagination: { ...pagination, total: response.data.total },
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message || 'Failed to fetch cases', isLoading: false });
    }
  },

  updateFilters: (newFilters) =>
    set((state) => ({ 
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, page: 1 } 
    })),
  


  updatePagination: (newPagination) => {
    set((state) => ({ 
      pagination: { ...state.pagination, ...newPagination },
      isLoading: false, 
    }));
    get().fetchCases(); 
  },
  
  debouncedFetchCases: debounce(() => {
    get().fetchCases();
  }, 300), 

 
  updateCaseStatus: async (ids, status) => {
    try {
      const response = await axios.put(`}/update-status`, {
        ids,
        status,
      });

      console.log('response.data.message',response.data.message);
      set({ selectedCases: [] });
      get().fetchCases();
    } catch (error) {
      console.error('Error updating case status:', error);
      set({ error: error.message || 'Failed to update case status' });
    }
  },

   setSelectedCases: (selectedCases) => set({ selectedCases }),

   toggleCaseSelection: (caseName) =>
     set((state) => ({
       selectedCases: state.selectedCases.includes(caseName)
         ? state.selectedCases.filter((id) => id !== caseName)
         : [...state.selectedCases, caseName],
     })),
 
   toggleSelectAllCases: () =>
     set((state) => ({
       selectedCases:
         state.selectedCases.length === state.cases.length
           ? []
           : state.cases.map((caseItem) => caseItem.caseName),
     })),

}));

export default useCaseStore;
