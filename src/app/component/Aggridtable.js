import React from 'react'

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Aggridtable = (props) => {
  return (
    <>
     <h4 className="card-title">{props.title}</h4>
     <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        columnDefs={props.columnDefs}
        rowData={props.rowData}
        defaultColDef={props.defaultColDef}
        pagination={true}
        onCellClicked={props.onRowClicked}
      />
     </div>
    </>
  )
}

export default Aggridtable