import React, { useState, useEffect, Fragment } from "react";
import { Link } from 'react-router-dom'
import BackgroundImage from '../../assets/images/bg2.jpg'
import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";
import { DataGrid } from '@mui/x-data-grid';
import { Hidden } from "@mui/material";

const columns = [
  {
    field: 'transactionId',
    headerName: 'Transaction ID',
    hide: true
  },
  {
    field: 'transactionDate',
    headerName: 'Transaction Date',
    type: 'date',
    width: 225,
    editable: false,
  },
  {
    field: 'type',
    headerName: 'Transaction Result',
    width: 175,
    editable: false,
    valueGetter: (params) =>
      params.row.type === 0 ? 'Successful Purchase' : 'Failed Purchase',
  },
  {
    field: 'playerName',
    headerName: 'Player',
    width: 200,
    editable: false,
  },
  {
    field: 'searchPrice',
    headerName: 'Search Price',
    type: 'number',
    width: 110,
    editable: false,
  },
  {
    field: 'sellPrice',
    headerName: 'Sell Price',
    type: 'number',
    width: 110,
    editable: false,
  }
];

export default function Main() {
  const [rows, setRows] = useState([]);

  const getTransactionData = () => {
    const api = "https://autobuyer-api.azurewebsites.net/api/transactions?startDate=05/01/2022&endDate=05/19/2022";
    fetchApi("GET", api, null, false)
        .then(response => {
            if (response.status === 200) {
                setRows(response.data);
            } else {
            }
        })
        .catch(error => {
        });
};

useEffect(() => {
  getTransactionData();
}, []);

    return (
        <header style={ HeaderStyle }>
            <div className="text-center">
                <h1 className="main-title home-page-title">hey you are inside the app now</h1>
                <Link to="/">
                    <button className="primary-button">Log out</button>
                </Link>
            </div>

            <div style={{ height: 400, width: '100%', backgroundColor: 'white' }}>
              <DataGrid
                rows={rows}
                getRowId={row => row.transactionId}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
              />
            </div>
        </header>
    )
}

function fetchApi(
    method,
    url,
    data = {},
    useCache = true,
    accessToken = sessionStorage.getItem("access_token")
      ? `Bearer ${sessionStorage.getItem("access_token")}`
      : null
  ) {
    return new Promise((resolve, reject) => {
      const config = {
        method: method,
        url: url,
        data: data,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          Authorization: accessToken
        },
        useCache: useCache
      };
      http(config)
        .then(response => {
          if (response.status === 200) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  const http = axios.create({
    adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
      enabledByDefault: true,
      cacheFlag: "useCache"
    })
  });

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}
