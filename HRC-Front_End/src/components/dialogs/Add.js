import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, {useState} from 'react';
import { Button, TextField } from '@mui/material';
import { makeStyles} from '@mui/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const useStyles = makeStyles({

    textField: {
        width: '22.5%',
        backgroundColor: "#ffffff",
        borderRadius: "0.4rem",
        margin: '1rem'
    },
    button: {
        width: '49%',
        border: "1px solid #fff" ,  
        color: "#fff",
        margin: '0.2rem' 
    }
});

export default function Add(props) {

    const classes = useStyles();
    const {openAdd, setOpenAdd} = props;

    const [buisness_code, setBusiness_code] = useState();
    const [cust_number, setCust_number] = useState();
    const [clear_date, setClear_date] = useState(null);
    const [buisness_year, setBuisness_year] = useState();
    const [doc_id, setDoc_id] = useState();
    const [posting_date, setPosting_date] = useState(null);
    const [document_create_date, setDocument_create_date] = useState(null);
    const [due_in_date, setDue_in_date] = useState(null);
    const [invoice_currency, setInvoice_currency] = useState();
    const [document_type, setDocument_type] = useState();
    const [posting_id, setPosting_id] = useState();
    const [total_open_amount, setTotal_open_amount] = useState();
    const [baseline_create_date, setBaseline_create_date] = useState(null);
    const [cust_payment_terms, setCust_payment_terms] = useState();
    const [invoice_id, setInvoice_id] = useState();
    

    const postData = async() => {
        var axios = require('axios');
        let response = await axios.get("/HRC_Final/AddServlet", { 
            params: {
                buisness_code,
                cust_number,
                clear_date,
                buisness_year,
                doc_id,
                posting_date,
                document_create_date,
                due_in_date,
                invoice_currency,
                document_type,
                posting_id,
                total_open_amount,
                baseline_create_date,
                cust_payment_terms,
                invoice_id,
                }
            })
        console.log(response);
    }

    return (
        <Dialog 
            open = {openAdd} 
            onClose = {() => setOpenAdd(false) } 
            PaperProps={{
                sx: {
                    minWidth: "96%",
                    minHeight: "60%",
                    backgroundColor: "#2d4250",
                    color: "#fff"
                }
            }}
        >
            <DialogTitle>
                <div>Add</div>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={postData}> 
                    <TextField id="filled-basic" variant='filled' label='Buisness Code' className={classes.textField} required onChange={(e) => setBusiness_code(e.target.value)}></TextField>
                    <TextField id="filled-basic" variant='filled' label='Customer Number' className={classes.textField}  required onChange={(e) => setCust_number(e.target.value)}></TextField>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker label="Clear Date" value={clear_date} onChange={(newValue) => {setClear_date(newValue);}}
                            renderInput={(params) => <TextField variant='filled' className={classes.textField} required {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField id="filled-basic" variant='filled' label='Buisness Year' className={classes.textField} required onChange={(e) => setBuisness_year(e.target.value)}></TextField>
                    <TextField id="filled-basic" variant='filled' label='Document Id' className={classes.textField} required onChange={(e) => setDoc_id(e.target.value)}></TextField>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker label="Posting Date" value={posting_date} onChange={(newValue) => {setPosting_date(newValue);}}
                            renderInput={(params) => <TextField variant='filled' className={classes.textField} required {...params} />}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker label="Document Create Date" value={document_create_date} onChange={(newValue) => {setDocument_create_date(newValue);}}
                            renderInput={(params) => <TextField variant='filled' className={classes.textField} required {...params} />}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker label="Due Date" value={due_in_date} onChange={(newValue) => {setDue_in_date(newValue);}}
                            renderInput={(params) => <TextField variant='filled' className={classes.textField} required {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField id="filled-basic" variant='filled' label='Invoice Currency' className={classes.textField} required onChange={(e) => setInvoice_currency(e.target.value)}></TextField>
                    <TextField id="filled-basic" variant='filled' label='Document Type' className={classes.textField} required onChange={(e) => setDocument_type(e.target.value)}></TextField>
                    <TextField id="filled-basic" variant='filled' label='Posting Id' className={classes.textField} required onChange={(e) => setPosting_id(e.target.value)}></TextField>
                    <TextField id="filled-basic" variant='filled' label='Total Open Amount' className={classes.textField} required onChange={(e) => setTotal_open_amount(e.target.value)}></TextField>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker label="Baseline Create Date" value={baseline_create_date} onChange={(newValue) => {setBaseline_create_date(newValue);}}
                            renderInput={(params) => <TextField variant='filled' className={classes.textField} required {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField id="filled-basic" variant='filled' label='Customer Payment Terms' className={classes.textField} required onChange={(e) => setCust_payment_terms(e.target.value)}></TextField>
                    <TextField id="filled-basic" variant='filled' label='Invoice Id' className={classes.textField} required onChange={(e) => setInvoice_id(e.target.value)}></TextField>
                    <Button className={classes.button} autoFocus type='submit'>Add</Button>
                    <Button className={classes.button} onClick = {() => setOpenAdd(false) }>Cancel</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
};
