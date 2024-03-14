import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, {useState}from 'react';
import { Button, TextField } from '@mui/material';
import { makeStyles} from '@mui/styles';

const useStyles = makeStyles({

    textField: {
        width: '40%',
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

export default function Edit(props) {

    const classes = useStyles()
    const {selectedData, openEdit, setOpenEdit, editValue1, editValue2, getData, setSelected, setisEditDisabled, setisDelDisabled} = props;
    const sl_no = selectedData[0];

    const [invoice_currency, setInvoice_currency] = useState('');
    const [cust_payment_terms, setCust_payment_terms] = useState('');

    const postData = async() => {
        var axios = require('axios');
        console.log(invoice_currency, cust_payment_terms)
        let response = await axios.get("/HRC_Final/EditServlet", { 
            params: { sl_no, cust_payment_terms, invoice_currency}})
        console.log(response);
        
        getData(); //To fetch data again with same page and rowsperpage to show updation happening dynamicaly on UI 

        //To diable the buttons and clear the selection/checkbox once updation has been performed
        setSelected([]);
        setisEditDisabled(true);
        setisDelDisabled(true);
    }

    return (
        <Dialog 
            open = {openEdit} 
            onClose = {() => setOpenEdit(false) } 
            PaperProps={{
                sx: {
                    minWidth: "40%",
                    minHeight: "20%",
                    backgroundColor: "#2d4250",
                    color: "#fff"
                }
            }}
        >
            <DialogTitle>
                <div>Edit</div>
            </DialogTitle>
            <DialogContent>
                <TextField id="filled-basic" variant='filled' label='Invoice Currency' className={classes.textField} defaultValue={editValue1} onChange={(e) => setInvoice_currency(e.target.value)}></TextField>
                <TextField id="filled-basic" variant='filled' label='Customer Payment Terms' className={classes.textField} defaultValue={editValue2} onChange={(e) => setCust_payment_terms(e.target.value)}></TextField>
            </DialogContent>
            <DialogActions>
                <Button className={classes.button} autoFocus onClick={()=>{setOpenEdit(false); postData();}}>Edit</Button>
                <Button className={classes.button} onClick = {() => setOpenEdit(false) }>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
};
