import React, { useEffect } from 'react';
import useCaseStore from '../store/useCaseStore';
import CaseTable from './CaseTable';
import Pagination from './Pagination';
import Header from './Header';

const Dashboard = ({ status }) => {
  const { cases, filters, pagination, fetchCases, updateFilters } = useCaseStore();

  useEffect(() => {
    updateFilters({ status });
    fetchCases();
  }, [status, updateFilters, fetchCases]);
  
  useEffect(() => {
    fetchCases();
  }, [fetchCases, filters, pagination.page, pagination.limit]);
  
  return (
    <>
      <Header />
      <CaseTable cases={cases} />
      <Pagination />
    </>
  );
};

export default Dashboard;