import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Button,
    Card,
    MenuItem
  } from "@material-ui/core";
import {getAllReembolsosEducativos} from "../../redux/actions/ReembolsoEducativoActions";
import shortid from "shortid";
import { useSelector, useDispatch } from 'react-redux';
import { MatxMenu, MatxToolbarMenu, MatxSearchBox } from "matx";

const Home = () => {
    const rembolsos = useSelector(state => state.reembolsosEducativos.rembolsos);
    const dispatch = useDispatch();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    
    
    console.log( "Process.env", `${process.env.REACT_APP_API_URL}`);

    useEffect(() => {
        dispatch(getAllReembolsosEducativos());
        console.log(rembolsos);
    }, []);

    const setRowsPerPage2 = event => {
        console.log("setRowsPerPage", event.target.value ) 
       
    };

    const handleChangePage = (event, newPage) => {
       setPage(newPage);
    };

    return (
        <div className="m-sm-30">
            <Button
                className="mb-16"
                variant="contained"
                color="primary"
                component={Link} to="/RembolsoEducativo/Form"
                >
                <Icon>add</Icon>
                <span>Nuevo</span>
            </Button>
            <Card className="w-100 overflow-auto" elevation={6}>
                <Table className="crud-table" style={{ whiteSpace: "pre", minWidth: "750px" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>REID</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Curso</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Monto a Depositar</TableCell>
                            <TableCell>Fecha de Solicitud</TableCell>
                            <TableCell>Fecha de Depósito</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rembolsos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((rembolso, index)=>(
                            <TableRow key={shortid.generate()}>
                                <TableCell className="px-0" align="left">
                                    {rembolso.id}
                                </TableCell>
                                <TableCell className="px-0" align="left">
                                    {rembolso.categoria}
                                </TableCell>
                                <TableCell className="px-0" align="left">
                                    {rembolso.curso}
                                </TableCell>
                                <TableCell className="px-0" align="left">
                                    {rembolso.estado}
                                </TableCell>
                                <TableCell className="px-0" align="left">
                                    {rembolso.montoAPagar}
                                </TableCell>
                                <TableCell className="px-0" align="left">
                                    {rembolso.fechaSolicitud}
                                </TableCell>
                                <TableCell className="px-0" align="left">
                                    {rembolso.deposito}
                                </TableCell>
                            </TableRow>
                        ))}                   
                   </TableBody> 
                </Table>
                <TablePagination
                className="px-16"
                rowsPerPageOptions={[2, 10, 25]}
                component="div"
                count={rembolsos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  "aria-label": "Previous Page"
                }}
                nextIconButtonProps={{
                  "aria-label": "Next Page"
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={event => setRowsPerPage(event.target.value)}
              />
            </Card>
        </div>
    )
}

export default Home
