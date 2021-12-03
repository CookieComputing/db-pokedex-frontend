import * as React from 'react';
import Button from '@mui/material/Button';

const TrainersList = () => {

    const saveTrainer = () => {};
    
  return (
    <div className="pokedex-trainer-form-editor">
        <input />
        <Button variant="outlined" onClick={saveTrainer}>
            Save Trainer
        </Button>
    </div>
  );
}

export default TrainersList;
