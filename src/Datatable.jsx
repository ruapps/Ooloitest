import React from 'react';
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";


export default function Datatable(props) {
    const { data = [], columns = [], handleSort } = props;

    return (
      <Box className="main text-center">
        <Grid container spacing={1} className="contain m-auto mt-5 ps-5 pb-4">
          <Grid spacing={2}>
          <table className="table table-striped ">
            <thead>
              <tr>
                {columns?.map((column, index) => (
                  <th key={index} scope="col" className='text-start'>
                    {column?.name}
                    <img src="images/6688059.png" alt="" srcset="" width="15px" height="15px" className='ms-3' onClick={()=> handleSort(column?.name)}/>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((elem, ind) => {
                return (
                  <tr key={ind}>
                    {columns?.map((column) => {
                      return (
                        <td className= "text-start">
                          {column.accessor[1]}
                          {elem?.[column.accessor[0]]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          </Grid>
        </Grid>
      </Box>
    );
  }



    



