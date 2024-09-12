import React, { useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid } from '@mui/x-data-grid';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import './App.css';

const VISIBLE_FIELDS = ['name', 'rating'];

// Custom "Hello Filter" dropdown component
function HelloFilter(props) {
  const { item, applyValue } = props;
  const [selectedOption, setSelectedOption] = useState(item.value || '');

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    applyValue({ ...item, value: value });
  };

  return (
    <FormControl variant="outlined" fullWidth style={{ padding: '10px' }}>
      <InputLabel>Hello Filter</InputLabel>
      <Select
        label="Hello Filter"
        value={selectedOption}
        onChange={handleFilterChange}
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="option1">Hello Option 1</MenuItem>
        <MenuItem value="option2">Hello Option 2</MenuItem>
        <MenuItem value="option3">Hello Option 3</MenuItem>
      </Select>
    </FormControl>
  );
}

// Custom filter operator for the "Hello Filter"
const helloFilterOperator = {
  label: 'Hello Filter',
  value: 'helloFilter',
  getApplyFilterFn: (filterItem) => {
    if (!filterItem.value || filterItem.value === '') {
      return null;
    }
    return ({ value }) => {
      return value === filterItem.value;
    };
  },
  InputComponent: HelloFilter,
};

function App() {
  const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  // Apply the custom filter to the rating column
  const columns = useMemo(
    () =>
      data.columns.map((col) => {
        if (col.field === 'rating') {
          return {
            ...col,
            filterOperators: [helloFilterOperator], // Only show the custom "Hello Filter" for the rating column
          };
        }
        return col;
      }),
    [data.columns]
  );

  return (
    <div className="App">
      <Button variant="contained">Hello world</Button>
      <hr />
      <hr />
      <DataGrid
        {...data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        components={
          {
            // No toolbar needed, custom filter directly applied to the column
          }
        }
      />
    </div>
  );
}

export default App;
