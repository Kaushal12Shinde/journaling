import { useMemo, useState } from 'react';
import './App.css';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
ModuleRegistry.registerModules([AllCommunityModule]);


function App() {

  const [rowData, setRowData] = useState([
    { Date:'Wed 5 Mar, 9:46', Name:'Nifty 22200 CE', Qty:75, Entry:124, Exit:200, SL:115, Status: 'Profit'},
    { Date: "Wed 5 Mar, 9:52", Name: "Nifty 22300 PE", Qty: 75, Entry: 140, Exit: 115, SL: 115, Status: "Loss" },
    { Date: "Wed 5 Mar, 10:05", Name: "Nifty 22100 CE", Qty: 75, Entry: 110, Exit: 150, SL: 100, Status: "Profit" },
    { Date: "Wed 5 Mar, 10:22", Name: "Nifty 22050 CE", Qty: 75, Entry: 95, Exit: 85, SL: 85, Status: "Loss" },
    { Date: "Wed 5 Mar, 10:35", Name: "Nifty 22400 PE", Qty: 75, Entry: 175, Exit: 210, SL: 160, Status: "Profit" },
    { Date: "Wed 5 Mar, 10:50", Name: "Nifty 22250 CE", Qty: 75, Entry: 130, Exit: 180, SL: 115, Status: "Profit" },
    { Date: "Wed 5 Mar, 11:10", Name: "Nifty 22500 PE", Qty: 75, Entry: 200, Exit: 175, SL: 175, Status: "Loss" },
    { Date: "Wed 5 Mar, 11:30", Name: "Nifty 22150 CE", Qty: 75, Entry: 105, Exit: 145, SL: 90, Status: "Profit" },
    { Date: "Wed 5 Mar, 11:45", Name: "Nifty 22350 PE", Qty: 75, Entry: 155, Exit: 130, SL: 130, Status: "Loss" }
  ])

  const statusRenderer = ({value}) =>{
    if(value === 'Profit'){
      return <span style={{
          color: '#31b332',
          backgroundColor: '#f4f6fa',
          borderRadius: '10px',
          padding: '6px 12px',
          width:'100px',
        }}
      >
        {value}
      </span>
    }else{
      return <span style={{
          color: '#ff2501',
          backgroundColor: '#f4f6fa',
          borderRadius: '10px',
          padding: '6px 12px',
          width:'100px',
        }}
      >
        {value}
      </span>
    }
  }

  const calculateReturns = (params)=>{
    return (params.data.Exit - params.data.Entry) * params.data.Qty;
  }

  const [colDefs, setColDefs] = useState([
    { field: "Date" },
    { field: "Name" },
    { field: "Qty" },
    { field: "Entry" },
    { field: "Exit" },
    { field: "SL" },
    { 
      field: "Status",
      cellRenderer: statusRenderer,
    },
    { field: "Return",
      cellRenderer: calculateReturns,
     },
  ]);

  const defaultColDef = useMemo(() => ({
    filter: true // Enable filtering on all columns
  }))

  return (
    <>
      <div style={{ width: "100%", height: "429px" }}>
        <AgGridReact
          defaultColDef={defaultColDef}
          rowData={rowData} 
          columnDefs={colDefs} 
        />
      </div>
    </>
  )
}

export default App
