import React from 'react';
import MainApp from './MainApp'
import md5 from 'md5';
import moment from 'moment';
import CollectContrib from './components/CollectContrib';
import AppendHead  from 'react-append-head'

const App = () => {

  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);

  if(isParamsValid(params)){
    return <>
      <AppendHead>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
      </AppendHead>
      <CollectContrib />
    </>
  }


  return (
    <MainApp />
  );
}

export default App;

const isParamsValid = (params) => {
  const coleta = params.get("coleta")
  const code = params.get("cod")
  const accessCode = md5(process.env.REACT_APP_SECRET + moment().format('YYYY-MM-DD')) //02-06 27826d6ea003533d7635b77101a0e59d
  //console.log(accessCode)

  return typeof coleta === 'string' && code === accessCode
}