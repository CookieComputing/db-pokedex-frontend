import * as React from 'react';
import trainerService from "./trainer-service"
// import Button from '@mui/material/Button';
// import { DataGrid } from '@mui/x-data-grid';
const { useState, useEffect } = React;

function TrainersList() {

  const [trainers, setTrainers] = useState([])
  useEffect(() => {
    findAllTrainers()
  }, [])

  const findAllTrainers = () =>
    trainerService.findAllTrainers()
    .then(trainers => setTrainers(trainers))

  
    // const [nbRows, setNbRows] = React.useState(5);
    // const removeRow = () => setNbRows((x) => Math.max(0, x - 1));
    // const addRow = () => setNbRows((x) => Math.min(100, x + 1));

  return (
    <div className="pokedex-trainers-list">
      <ul className="list-group">
          {
            trainers.map(trainer =>
                <li className="list-group-item"
                    key={trainer.pk}>
                  {trainer.fields.first_name},
                  {trainer.fields.last_name},
                  {trainer.fields.username}
                </li>)
          }
        </ul>
    </div>
  );
}

export default TrainersList;
