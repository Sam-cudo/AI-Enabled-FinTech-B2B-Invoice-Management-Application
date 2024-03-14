import React from 'react'
import { Grid } from '@mui/material'
import '../../styles/header.css'
import abcsvg from '../../styles/abclogo.svg'
import hrsvg from '../../styles/highradiuslogo.svg'

export default function MainHeader() {

  return (
    <Grid>
    <header className='main_header'>
        <div className='heading'>
            <div className="logos">
                <div className="left_logo">
                    <img src={abcsvg} alt="abcproducts" />
                </div>
                <div className="right_logo">
                    <img src={hrsvg} alt="highradius" />
                </div>
            </div>
            <h1 className='heading1'>Invoice List</h1>
        </div>
    </header>
    </Grid>
  )
}
