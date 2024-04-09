import React,{useState} from 'react';
import { Typography,StepLabel,Step ,Stepper } from '@mui/material';

const steps = [
  'Shipping Details',
  'Create an ad group',
  'Create an ad',
];



export default function StepperComp(props) {


  const steps = [
    {
      label:'Shipping Details',
      icon:<ion-icon class= " h-[3.2rem] visible w-[3.2rem]"name="location-outline"></ion-icon>
    },
    {
      label:'Confirm Order',
      icon:<ion-icon class= " h-[3.2rem] visible w-[3.2rem]"name="bag-check-outline"></ion-icon>
    },
    {
      label:'Payment',
      icon:<ion-icon class= " h-[3.2rem] visible w-[3.2rem]"name="wallet-outline"></ion-icon>
    }
  ]

   
  const stepStyles = {
    width:'1500px',
    boxSizing :'border-box',
    fontSize:'1rem'
  }
  return (
    <div>
     <Stepper alternativeLabel activeStep = {props.activeStep} style = {stepStyles}>
       {steps.map((item,index)=>(
         <Step key = {index}>
           <StepLabel icon = {item.icon}>{item.label}</StepLabel> 
          </Step>
       ))}
     </Stepper>
    </div>
  )
}
