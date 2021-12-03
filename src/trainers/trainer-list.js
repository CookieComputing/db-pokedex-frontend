import * as React from 'react';
// import trainerService from "./trainer-service"
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
// const { useHistory } = window.ReactRouterDOM;
// const { useState, useEffect } = React;

const TrainersList = () => {
    // const history = useHistory();
    // const [trainers, setTrainers] = useState([]);
    // useEffect(() => {
    //   findAllUsers()
    // }, [])
    // const findAllUsers = () =>
    //     trainerService.findAllUsers()
    //     .then(trainers => setTrainers(trainers))
  
    const [nbRows, setNbRows] = React.useState(5);
    const removeRow = () => setNbRows((x) => Math.max(0, x - 1));
    const addRow = () => setNbRows((x) => Math.min(100, x + 1));
    const { data } = [{
      name: 'Ash'
    }];
    
  return (
    <div className="pokedex-trainers-list">
      <Button variant="outlined" onClick={removeRow}>
        Remove a row
      </Button>
      <Button variant="outlined" onClick={addRow}>
        Add a row
      </Button>
      <DataGrid autoHeight {...data} rows={data.rows.slice(0, nbRows)} />
    </div>
  );
}

export default TrainersList;
