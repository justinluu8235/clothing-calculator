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
                
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Color Swatch Image</TableCell>
                <TableCell>Model Number </TableCell>
                <TableCell align="right">Fabric Composition</TableCell>
                <TableCell align="right">Available Colors</TableCell>
                <TableCell align="right">Minimum Order Quantity (MOQ)</TableCell>
                <TableCell align="right">Available Sizes</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell align="right">Notes</TableCell>

                
            </TableRow>
            </TableHead>
            <TableBody>
                {styles.map((style) => {
                    return (
                    <TableRow key={style.id} 
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        
                        <TableCell> <img style={{width:'50px', height: '50px' }} src={style.images[0].image}/></TableCell>
                        <TableCell> {style.fabric_information.length > 0 ? <img style={{width:'50px', height: '50px' }} src={style.fabric_information[0].color_swatch_image}/> : null}</TableCell>
                        <TableCell> {style.model_number}</TableCell>
                        <TableCell> {style.fabric_composition}</TableCell>
                        <TableCell> {style.available_colors}</TableCell>
                        <TableCell> {style.minimum_order_quantity}</TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                        <TableCell></TableCell>


                    </TableRow>
                    )
                })}
            </TableBody>
            </Table>
        </TableContainer>
    )
}