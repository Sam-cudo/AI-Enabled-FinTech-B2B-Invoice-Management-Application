import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, {useState} from 'react';
import { Button, TextField } from '@mui/material';
import { makeStyles} from '@mui/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import '../../styles/Analytics.css'
import Charts from './Chart'

const useStyles = makeStyles({

    textField: {
        width: '90%',
        backgroundColor: "#ffffff",
        borderRadius: "0.4rem",
        margin: '0.2rem'
    },
    button: {
        width: '50%',
        border: "1px solid #fff" ,  
        color: "#fff"
    }
});

export default function Analytics_dialog(props) {

    const classes = useStyles();
    const {openAnalytics, setOpenAnalytics} = props;
    const [openChart, setopenChart] = useState(false);
    const [CDvalue1, setCDValue1] = useState(null);
    const [CDvalue2, setCDValue2] = useState(null);
    const [DDvalue1, setDDValue1] = useState(null);
    const [DDvalue2, setDDValue2] = useState(null);
    const [BCDvalue1, setBCDValue1] = useState(null);
    const [BCDvalue2, setBCDValue2] = useState(null);
    const [invoice_currency, setInvoice_currency] = useState(null); 
    const [chartdata,setChartdata] = useState([]);

    //Function to fetch searched data
    const ChartData = async() => {
        var axios = require('axios');
        let response = await axios.get("/HRC_Final/ChartServlet", { 
            params: {
                CDvalue1,
                CDvalue2,
                DDvalue1,
                DDvalue2,
                BCDvalue1,
                BCDvalue2,
                invoice_currency,
                }
            })
        console.log("Chart data = ", response);
        setChartdata(response.data);
    }

  return (
    <>
        <Dialog 
            open = {openAnalytics} 
            onClose = {() => setOpenAnalytics(false) } 
            PaperProps={{
                sx: {
                    minWidth: "35%",
                    minHeight: "60%",
                    backgroundColor: "#2d4250",
                    color: "#fff"
                }
            }}
        >
            <DialogTitle>
                <div>Analytics View</div>
            </DialogTitle>
            <DialogContent>
                <div className = 'Outer_Grid'>
                <div className='Inner_Grid'>
                    Clear Date
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker  value={CDvalue1} inputFormat = {'dd/MM/yyyy'} onChange={(newValue) => {setCDValue1(newValue); }}
                            renderInput={(params) => <TextField variant='filled' className={classes.textField}{...params} />}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker  value={CDvalue2} inputFormat = {'dd/MM/yyyy'} onChange={(newValue) => {setCDValue2(newValue); }}
                            renderInput={(params) => <TextField variant='filled' className={classes.textField}{...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <div className='Inner_Grid'>
                    Due Date
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker  value={DDvalue1} inputFormat = {'dd/MM/yyyy'} onChange={(newValue) => {setDDValue1(newValue); }}
                            renderInput={(params) => <TextField variant='filled' className={classes.textField}{...params} />}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker  value={DDvalue2} inputFormat = {'dd/MM/yyyy'} onChange={(newValue) => {setDDValue2(newValue); }}
                            renderInput={(params) => <TextField variant='filled' className={classes.textField}{...params} />}
                        />
                    </LocalizationProvider>
                </div>
                </div>
                <div className = 'Outer_Grid'>
                <div className='Inner_Grid'>
                    Baseline Create Date
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker  value={BCDvalue1} inputFormat = {'dd/MM/yyyy'} onChange={(newValue) => {setBCDValue1(newValue); }}
                            renderInput={(params) => <TextField variant='filled' className={classes.textField}{...params} />}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker  value={BCDvalue2} inputFormat = {'dd/MM/yyyy'} onChange={(newValue) => {setBCDValue2(newValue); }}
                            renderInput={(params) => <TextField variant='filled' className={classes.textField}{...params} />}
                        />
                    </LocalizationProvider>
                </div>

                <div className='Inner_Grid'>
                Invoice Currency
                <TextField id="filled-basic" variant='filled' label='Invoice Currency' className={classes.textField} onChange={(e)=>setInvoice_currency(e.target.value)}></TextField>
                </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button className={classes.button} autoFocus onClick={()=>{setopenChart(true); ChartData(); setOpenAnalytics(false)}}>Submit</Button>
                <Button className={classes.button} onClick = {() => setOpenAnalytics(false) }>Cancel</Button>
            </DialogActions>
        </Dialog>
        <Charts openChart={openChart} setopenChart={setopenChart} chartdata={chartdata} />
    </>    
  )
};
