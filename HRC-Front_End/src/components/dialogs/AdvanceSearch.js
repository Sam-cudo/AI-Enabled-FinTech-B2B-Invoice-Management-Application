import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, {useState} from 'react';
import { Button, TextField } from '@mui/material';
import { makeStyles} from '@mui/styles';

const useStyles = makeStyles({
    textField: {
        width: '45%',
        backgroundColor: "#ffffff",
        borderRadius: "0.4rem",
        margin: '1rem'
    },
    button: {
        width: '50%',
        border: "1px solid #fff" ,   
        color: "#fff"
    }
});

export default function AdvanceSearch_dialog(props) {

    const classes = useStyles()
    const {openAdvanceSearch, setOpenAdvanceSearch, getSearchInputs} = props

    //States to handle inputs
    const [cust_number, setCust_number] = useState('');
    const [buisness_year, setBuisness_year] = useState('');
    const [doc_id, setDoc_id] = useState('');
    const [invoice_id, setInvoice_id] = useState('');

    // Function to send inputs to DataTable to search data
    const sendInput = () => {
        getSearchInputs(cust_number,buisness_year,doc_id,invoice_id);
        setCust_number('');
        setBuisness_year('');
        setDoc_id('');
        setInvoice_id('');
    }

    return (
        <Dialog 
            open = {openAdvanceSearch} 
            onClose = {() => setOpenAdvanceSearch(false) } 
            PaperProps={{
                sx: {
                minWidth: "45%",
                minHeight: "40%",
                backgroundColor: "#2d4250",
                color: "#fff"
                }
            }}
        >
            <DialogTitle>
                <div>Advance Search</div>
            </DialogTitle>
            <DialogContent>
                <TextField id="filled-basic" variant='filled' label='Document Id' className={classes.textField} onChange={(e) => setDoc_id(e.target.value)}></TextField>
                <TextField id="filled-basic" variant='filled' label='Invoice Id' className={classes.textField} onChange={(e) => setInvoice_id(e.target.value)}></TextField>
                <TextField id="filled-basic" variant='filled' label='Customer Number' className={classes.textField} onChange={(e) => setCust_number(e.target.value)}></TextField>
                <TextField id="filled-basic" variant='filled' label='Buisness Year' className={classes.textField}    onChange={(e) => setBuisness_year(e.target.value)}></TextField>
            </DialogContent>
            <DialogActions>
                <Button className={classes.button} autoFocus onClick={()=>{setOpenAdvanceSearch(false); sendInput();}}>Search</Button>
                <Button className={classes.button} onClick = {() => setOpenAdvanceSearch(false) }>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
};
