import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


interface StyleTableProps {
    styles: any;
    currentUser: any;
  }
  
export default function StylesTable({ styles, currentUser }: StyleTableProps) {

    console.log('styles', styles)
    return(
        <TableContainer component={Paper}>
            <Table sx={{ }} size="small" aria-label="a dense table">
                <TableHead>
            <TableRow>
                <TableCell>Model Number </TableCell>
                <TableCell align="right">Images</TableCell>
                <TableCell align="right">Fabric Composition</TableCell>
                <TableCell align="right">Available Colors</TableCell>
                <TableCell align="right">Minimum Order Quantity</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {styles.map((style) => {
                    return (
                    <TableRow key={style.id} 
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell> {style.model_number}</TableCell>
                        <TableCell> <img style={{width:'50px', height: '50px' }} src={style.images[0].image}/></TableCell>
                    </TableRow>
                    )
                })}
            </TableBody>
            </Table>
        </TableContainer>
    )
}