import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { Button } from '@mui/material';
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

export default function Delete_dialog(props) {

    const classes = useStyles()
    const {openDelete, setOpenDelete, selectedData, getData, setSelected, setisDelDisabled, setisEditDisabled} = props

    const delData = async() => {
        var axios = require('axios');
        for (let i = 0; i < selectedData.length; i++) {
            const sl_no = selectedData[i]
            let response = await axios.get("/HRC_Final/DelServlet", {params: {sl_no}})
            console.log(response);
        }
        getData();//To fetch data again with same page and rowsperpage to show deletion happening dynamicaly on UI 

        //To diable the buttons and clear the selection/checkbox once deletion has been performed
        setSelected([]);
        setisDelDisabled(true);
        setisEditDisabled(true);
    }
    return (
        <Dialog 
            open = {openDelete} 
            onClose = {() => setOpenDelete(false) } 
            PaperProps={{
                sx: {
                    minWidth: "25%",
                    minHeight: "20%",
                    backgroundColor: "#2d4250",
                    color: "#fff"
                }
            }}
        >
            <DialogTitle>
                <div>Delete Records ?</div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText style={{color: "#fff"}}>
                    Are you sure you want to delete these record[s] ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button className={classes.button} onClick = {() => setOpenDelete(false) }>Cancel</Button>
                <Button className={classes.button} autoFocus onClick={()=>{setOpenDelete(false); delData();}}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
};
