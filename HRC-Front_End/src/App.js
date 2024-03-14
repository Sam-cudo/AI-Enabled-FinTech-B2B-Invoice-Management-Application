import React from 'react';
import MainHeader from './components/main/Header';
import MainFooter from './components/main/Footer';
import DataTable from './components/main/DataTable';
import { Grid } from '@mui/material';

function App() {
  return (
    <Grid className="App">
      <MainHeader />
      <DataTable />
      <MainFooter />
    </Grid>
  );
}

export default App;
