import { Dialog, DialogContent, DialogTitle, Button} from '@mui/material';
import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import {Bar} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import '../../styles/Chart.css'
 
export default function Charts(props) {
  const {openChart, setopenChart, chartdata} = props

  let total_open_amount = chartdata.map((item)=>item.total_open_amount)
  let no_of_customers = chartdata.map((item)=>item.no_of_customers)  

  // const Piestate = {
  //   labels: ['USD','CAD'],
  //   datasets: [
  //     {
  //       label: 'Rainfall',
  //       backgroundColor: [
  //         '#ffb1c1',
  //         '#9ad0f5',
  //       ],
  //       hoverBackgroundColor: [
  //         '#501800',
  //         '#4B5000'
  //       ],
  //       data: [65, 59]
  //       }
  //     ]
  //   }
    
    const Barstate = {
      labels: ['Unilever', 'Johnson and Johnson', 'Bose', "Kellog's", 'Sony', 'Puma'],
      datasets: [
        {
          label: 'No of Customers',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 1,
          data: total_open_amount
        },
        {
          label: 'Total Open Amount',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 1,
          data: no_of_customers
        }
      ]
    }

    return (
        <Dialog 
          open = {openChart} 
          onClose = {() => setopenChart(false)} 
          PaperProps={{
            sx: {
              minWidth: "80%",
              minHeight: "60%",
              backgroundColor: "#fff",
            }
          }}
        >
          <DialogTitle>
            <div className='chart_head'>
            <div className='head'>
              Chart.js Bar Chart
            </div>
            <div className='but'>
              <Button onClick={() => setopenChart(false)} variant="outlined" > X </Button>
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
          <div>
            <Bar
              data={Barstate}
              options={{
                title:{
                  display:true,
                  text:'Chart.js Bar Chart',
                  fontSize:20
                },
                legend:{
                  display:true,
                  position:'right'
                }
              }}
            />
          </div>
          {/* <div>
            <Pie
              data={Piestate}
              options={{
                title:{
                  display:true,
                  text:'Average Rainfall per month',
                  fontSize:20
                },
                legend:{
                  display:true,
                  position:'right'
                }
              }}
            />
          </div> */}
        </DialogContent>
    </Dialog>
  )
};
