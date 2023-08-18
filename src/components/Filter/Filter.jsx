import React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import filter from '../../assets/icons/filter.svg'
import './Filter.css'

export default function BasicAutocomplete() {
  return (
    <form className='filter-container'>
    <div className='filter'>

        <Autocomplete
          placeholder="Seleccione una sala"
          options={top100Films}
          sx={{ width: 300 }}
        />
    </div> 
    <div className='filter'>

        <Autocomplete
          placeholder="Seleccione la animación"
          options={animation}
          sx={{ width: 300 }}
        />
    </div>    
    <div className='filter'>
        <Input size="md" sx={{ width: 300 }} placeholder="Ingrese el nombre" />
    </div> 
    
    <Button type="submit" 
            size="md"
            variant="soft"
            color="neutral"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}>
              <img src={filter} alt="" style={{width:'30px'}}/>
                Filtrar</Button>
    </form>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: 'Sala 1' },
  { label: 'Sala 2' }
  
];
const animation = [
    { label: '3D' },
    { label: '2D' }
    
  ];
