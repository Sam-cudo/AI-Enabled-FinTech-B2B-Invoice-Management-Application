import React, {useState, useEffect} from 'react';
import { Box, Button, ButtonGroup, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Checkbox } from '@mui/material';
import axios from 'axios';
import TableSortLabel from '@mui/material/TableSortLabel';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

//Local imports
import '../../styles/DataTable.css'
import Add from '../dialogs/Add'
import Edit from '../dialogs/Edit'
import Delete from '../dialogs/Delete'
import AdvanceSearch from '../dialogs/AdvanceSearch'
import Analytics from '../dialogs/Analytics'

//Styling Buttons Panel
const useStyles = makeStyles({
  textField: {
      width: '14rem',
      backgroundColor: "#ffffff",
      borderRadius: "1rem",
  },
  button: {
      width: '12rem',
      color: '#fff !important',
      border: "1px solid #1e7bab" ,
      borderRadius: "0.4rem",
      borderRightColor: "#1e7bab !important"   
  }
});

//Column names
const headCells = [
  {
    id: 'sl_no',
    disablePadding: true,
    label: 'Sl no',
  },
  {
    id: 'business_code',
    disablePadding: false,
    label: 'Buisness Code',
  },
  {
    id: 'cust_number',
    disablePadding: false,
    label: 'Customer Number',
  },
  {
    id: 'clear_date',
    disablePadding: false,
    label: 'Clear Date',
  },
  {
    id: 'buisness_year',
    disablePadding: false,
    label: 'Buisness Year',
  },
  {
    id: 'doc_id',
    disablePadding: false,
    label: 'Dcoument Id',
  },
  {
    id: 'posting_date',
    disablePadding: false,
    label: 'Posting Date',
  },
  {
    id: 'document_create_date',
    disablePadding: false,
    label: 'Document Create Date',
  },
  {
    id: 'due_in_date',
    disablePadding: false,
    label: 'Due Date',
  },
  {
    id: 'invoice_currency',
    disablePadding: false,
    label: 'Invoice Currency',
  },
  {
    id: 'document_type',
    disablePadding: false,
    label: 'Document Type',
  },
  {
    id: 'posting_id',
    disablePadding: false,
    label: 'Posting Id',
  },
  {
    id: 'total_open_amount',
    disablePadding: false,
    label: 'Total Open Amount',
  },
  {
    id: 'baseline_create_date',
    disablePadding: false,
    label: 'Baseline Create Date',
  },
  {
    id: 'cust_payment_terms',
    disablePadding: false,
    label: 'Customer Payment Terms',
  },
  {
    id: 'invoice_id',
    disablePadding: false,
    label: 'Invoice Id',
  },
  {
    id: 'aging_bucket',
    disablePadding: false,
    label: 'Aging Bucket',
  },

];

//Column names mappping to table
function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount, orderBy, order, onRequestSort} = props;
  const createSortHandler = (property) => (event) => {onRequestSort(event, property);};

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"  sx={{color: '#fff',}}>
          <Checkbox
            sx={{color: '#fff',}}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{'aria-label': 'select all records'}}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            sx={{color: '#fff'}}
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            width={70}
          >
            <TableSortLabel
              sx={{color: '#fff !important',}}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick= {createSortHandler(headCell.id)}
              IconComponent={KeyboardDoubleArrowDownIcon}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default function DataTable() {

  const classes = useStyles();

  //States to handle buttons
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdvanceSearch, setOpenAdvanceSearch] = useState(false);
  const [openAnalytics, setOpenAnalytics] = useState(false);

  //States to handle rows and pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);

  //States to handle selection and selected values
  const [selected, setSelected] = useState([]);
  const [editSelected,seteditSelected] = useState([]);
  const [delSelected,setdelSelected] = useState();
  const [isEditDisabled,setisEditDisabled] = useState([]);
  const [isDelDisabled,setisDelDisabled] = useState([]);
  const [editValue1,setEditValue1] = useState('');
  const [editValue2,setEditValue2] = useState('');

  //States to handle Sorting
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('sl_no');

  //State to handle Search Data
  const [cust_number, setCust_number] = useState('');
  const [cust_numberById, setCust_numberById] = useState('');
  const [buisness_year, setBuisness_year] = useState('');
  const [doc_id, setDoc_id] = useState('');
  const [invoice_id, setInvoice_id] = useState('');

  //Function to recieve Advance Search Inputs from Advance Dialog
  function getSearchInputs(CN,BY,DID,IID)
  {
    setCust_number(CN);
    setBuisness_year(BY);
    setDoc_id(DID);
    setInvoice_id(IID);
  }

  //Function to fetch data including Searching, sorting by column and pagination
  const getData = async() => {
    var start = (page*rowsPerPage);
    var end = (rowsPerPage);
    let response = await axios.get("/HRC_Final/FetchServlet", {
      params: {
        start, 
        end, 
        order,
        orderBy,
        cust_number,
        cust_numberById,
        buisness_year,
        doc_id,
        invoice_id
      }});
    setRows(response.data);
  } 

  //Function to fetch Record counts
  const countData = async() => {
  let response = await axios.get("/HRC_Final/RowCountServlet", {params: {cust_number, cust_numberById, buisness_year, doc_id, invoice_id}});
  setCount(response.data);
  }

  //Function to Predict Data 
  const PredictData = async() => {
    let predictedData = [] 
    for (let i = 0; i < selected.length; i++) {
      const sl_no = selected[i];
      let business_code = '';
      let cust_number = '';
      let name_customer = '';
      let buisness_year = '';
      let clear_date = '';
      let doc_id = '';
      let posting_date = '';
      let due_in_date = '';
      let baseline_create_date = '';
      let cust_payment_terms = '';
      let converted_usd = '';
      for(let j = 0; j < rows.length; j++) {
        if(sl_no===rows[j].sl_no)
        {
          business_code = rows[j].business_code;
          cust_number = rows[j].cust_number;
          name_customer = rows[j].name_customer;
          buisness_year = rows[j].buisness_year;
          buisness_year = buisness_year.slice(0,4)
          clear_date = rows[j].clear_date;
          if(clear_date==='0000-00-00'){clear_date='2019-09-04'}
          doc_id = rows[j].doc_id;
          posting_date = rows[j].posting_date;
          due_in_date = rows[j].due_in_date;
          baseline_create_date = rows[j].baseline_create_date;
          cust_payment_terms = rows[j].cust_payment_terms;
          converted_usd = rows[j].converted_usd; 
        }
      }
      //Axios call to get Data from flask
      let response = await axios.post("http://127.0.0.1:5000/", {
          business_code:business_code,
          cust_number:cust_number,
          name_customer:name_customer,
          buisness_year:buisness_year,
          clear_date:clear_date,
          doc_id:doc_id,
          posting_date:posting_date,
          due_in_date:due_in_date,
          baseline_create_date:baseline_create_date,
          cust_payment_terms:cust_payment_terms,
          converted_usd:converted_usd
      })
      console.log(response);
      predictedData = [...predictedData,response.data]
    }
      SavePredicted(predictedData)
  }
  
  //Function to save predicted data in DB
  const SavePredicted = async(predictedData)=>{
    predictedData = predictedData.flat();
    console.log(predictedData)
    console.log(predictedData.length)
    for(let k = 0;k < predictedData.length; k++)
    {
    const {aging_bucket} = predictedData[k];
    const {doc_id:predicted_doc_id} = predictedData[k];
    console.log(aging_bucket,predicted_doc_id)
    let response = await axios.get("/HRC_Final/PredictServlet", {params: {aging_bucket,predicted_doc_id}});
    console.log(response);
    }
    getData();
  }

  useEffect(()=>{getData(); countData(); },[page,rowsPerPage,order,orderBy,cust_numberById,cust_number,buisness_year,doc_id,invoice_id])

  //Refresh button function
  function Refresh(){
    setSelected([]);
    seteditSelected([]);
    setisEditDisabled(true);
    setdelSelected([]);
    setisDelDisabled(true);
    setCust_number('');
    setCust_numberById('');
    setOrderBy('sl_no');
    setOrder('asc');
    setCust_number('');
    setBuisness_year('');
    setDoc_id('');
    setInvoice_id('');
    setPage(0);
    setRowsPerPage(5);
    getData();
    countData();
  }

  //function to set sorting order states
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  //Main checkbox to select all rows 
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.sl_no);
      setSelected(newSelecteds);
      setdelSelected(newSelecteds);
      if(newSelecteds!==0)
      {setisDelDisabled(false);}
      seteditSelected([]);
      return;
    }
    setisDelDisabled(true);
    setSelected([]);
  };

  //Function to select rows
  const handleClick = (event, sl_no) => {
    const selectedIndex = selected.indexOf(sl_no);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, sl_no);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);

    //Logic to enable/disable edit, delete and predict button
    if(newSelected.length===1)
    {
      setdelSelected(newSelected)
      seteditSelected(newSelected)
      setisEditDisabled(false);
      setisDelDisabled(false);

      //Logic to get Initial Values for Edit input
        var Selectedsl_no = sl_no
        for(let i = 0; i<rows.length; i++)
        {
            const{sl_no} = rows[i]
            if(Selectedsl_no === sl_no)
            {
              var {cust_payment_terms,invoice_currency} = rows[i]
              break;
            }
        }
        setEditValue1(invoice_currency)
        setEditValue2(cust_payment_terms)
    }
    else if(newSelected.length>1)
    {
      setisEditDisabled(true);
      setisDelDisabled(false);
      setdelSelected(newSelected)
      seteditSelected([])
    }
    else
    {
      setisEditDisabled(true);
      setisDelDisabled(true);
      setdelSelected([])
      seteditSelected([])
    }
  };

  //Pagination Functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value,10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Box >
      <div className='functional_part'>
        <div className="buttons_group">
            <ButtonGroup variant="outlined" aria-label="outlined button group" >
                        <Button className={classes.button} sx = {{backgroundColor:"#14aef2"}} disabled = {isDelDisabled} onClick = {PredictData} >PREDICT</Button>
                        <Button className={classes.button} onClick = {() => setOpenAnalytics(true)} >ANALYTICS VIEW</Button>
                        <Button className={classes.button} onClick = {() => setOpenAdvanceSearch(true)} >ADVANCE SEARCH</Button>
            </ButtonGroup>
        </div>
        <div className='refresh_button'>
                    <Button onClick= {() => Refresh()}variant="outlined"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path fill= "#ffff" d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg></Button>
        </div>
        <div className="search_box_container">
                    <TextField id="filled-basic" variant='filled' label='Search customer Id' className={classes.textField} onChange={(e)=>setCust_numberById(e.target.value)}></TextField>
        </div>
        <div className="buttons_group_crud">
                    <ButtonGroup variant="outlined" aria-label="outlined button group" >
                        <Button className={classes.button} onClick = {() => setOpenAdd(true)} >ADD</Button>
                        <Button className={classes.button} onClick = {() => setOpenEdit(true)} disabled = {isEditDisabled} >EDIT</Button>
                        <Button className={classes.button} onClick = {() => setOpenDelete(true)} disabled = {isDelDisabled}>DELETE</Button>
                    </ButtonGroup>
        </div>
      </div>
      <TableContainer>
          <Table
            sx={{ minWidth: 2000, backgroundColor: "#283d4a" }}
            size={'small'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.map((row) => {
                  const isItemSelected = isSelected(row.sl_no);
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.sl_no)}
                      aria-checked={isItemSelected}
                      key={row.sl_no}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox sx={{color: '#fff'}} checked={isItemSelected}/>
                      </TableCell>
                      <TableCell sx={{color: '#fff'}} >{row.sl_no}</TableCell>
                      <TableCell sx={{color: '#fff'}} align='center'>{row.business_code}</TableCell>
                      <TableCell sx={{color: '#fff'}} align='center'>{row.cust_number}</TableCell>
                      <TableCell sx={{color: '#fff'}} align='center'>{row.clear_date}</TableCell>
                      <TableCell sx={{color: '#fff'}} align='center'>{row.buisness_year}</TableCell>
                      <TableCell sx={{color: '#fff'}} align='center'>{row.doc_id}</TableCell>
                      <TableCell sx={{color: '#fff'}} align='center'>{row.posting_date}</TableCell>
                      <TableCell sx={{color: '#fff'}} align='center'>{row.document_create_date}</TableCell>
                      <TableCell sx={{color: '#fff'}} align='center'>{row.due_in_date}</TableCell>
                      <TableCell sx={{color: '#fff'}} align='center'>{row.invoice_currency}</TableCell>
                      <TableCell sx={{color: '#fff'}} align='center'>{row.document_type}</TableCell>
                      <TableCell sx={{color: '#fff'}} align='center'>{row.posting_id}</TableCell>
                      <TableCell sx={{color: '#fff'}} align='center'>{row.total_open_amount}</TableCell>
                      <TableCell sx={{color: '#fff'}} align='center'>{row.baseline_create_date}</TableCell>
                      <TableCell sx={{color: '#fff'}} align='center'>{row.cust_payment_terms}</TableCell>
                      <TableCell sx={{color: '#fff'}} align='center'>{row.invoice_id}</TableCell>
                      <TableCell sx={{color: '#fff'}} align='center'>{row.aging_bucket}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
      </TableContainer>
      <TablePagination
          sx={{color:"#fff",backgroundColor:"#283d4a"}}
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count= {count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Add openAdd = {openAdd} setOpenAdd = {setOpenAdd} />
      <Edit openEdit = {openEdit} setOpenEdit = {setOpenEdit} selectedData = {editSelected} editValue1 = {editValue1} editValue2 = {editValue2} getData={getData} setSelected={setSelected} setisEditDisabled={setisEditDisabled} setisDelDisabled={setisDelDisabled}/>
      <Delete openDelete = {openDelete} setOpenDelete = {setOpenDelete} selectedData = {delSelected} getData={getData} setSelected={setSelected} setisDelDisabled={setisDelDisabled} setisEditDisabled={setisEditDisabled} />
      <AdvanceSearch openAdvanceSearch = {openAdvanceSearch} setOpenAdvanceSearch = {setOpenAdvanceSearch}  getSearchInputs = {getSearchInputs} />
      <Analytics openAnalytics = {openAnalytics} setOpenAnalytics = {setOpenAnalytics} />
    </Box>
  );
}