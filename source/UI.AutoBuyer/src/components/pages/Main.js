import React, { useState, useEffect, Fragment } from "react";
import { Link } from 'react-router-dom'
import BackgroundImage from '../../assets/images/bg2.jpg'
import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";
import { DataGrid } from '@mui/x-data-grid';
import Moment from "moment";
import clsx from 'clsx';

const columns = [
  {
    field: 'transactionId',
    headerName: 'Transaction ID',
    hide: true
  },
  {
    field: 'transactionDate',
    headerName: 'Transaction Date',
    headerClassName: 'super-app-theme--header',
    type: 'date',
    width: 225,
    editable: false,
    valueGetter: (params) =>
    Moment(params.row.transactionDate).format("LLL"),
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'type',
    headerName: 'Transaction Result',
    headerClassName: 'super-app-theme--header',
    width: 175,
    editable: false,
    valueGetter: (params) =>
      params.row.type === 0 ? 'Successful Purchase' : 'Failed Purchase',
      cellClassName: (params) => {
        if (params.value == null) {
          return '';
        }
  
        return clsx('super-app', {
          negative: params.row.type > 0,
          positive: params.row.type === 0,
        });
      },
  },
  {
    field: 'playerName',
    headerName: 'Player',
    headerClassName: 'super-app-theme--header',
    width: 200,
    editable: false,
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'searchPrice',
    headerName: 'Search Price',
    headerClassName: 'super-app-theme--header',
    type: 'number',
    width: 110,
    editable: false,
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'sellPrice',
    headerName: 'Sell Price',
    headerClassName: 'super-app-theme--header',
    type: 'number',
    width: 110,
    editable: false,
    cellClassName: 'super-app-theme--cell',
  }
];

export default function Main() {
  const [rows, setRows] = useState([]);

  const monthAgo = Moment().add(-30, 'days').format('MM/DD/YYYY');

  const tomorrow = Moment().add(1, 'days').format('MM/DD/YYYY');

  const getTransactionData = () => {
    const api = `https://autobuyer-api.azurewebsites.net/api/transactions?startDate=${monthAgo}&endDate=${tomorrow}`;
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
          <div id="topRight">
            <Link to="/">
                <button className="primary-button">Log out</button>
            </Link>
          </div>
            <div className="text-center">
                <h1 className="main-title home-page-title">Transactions</h1>
                <p className="home-page-title">(last 30 days)</p>
            </div>

            <div style={{width: '950px', margin: 'auto'}}>
              <DataGrid
                rows={rows}
                getRowId={row => row.transactionId}
                columns={columns}
                pageSize={10}
                autoHeight
                sx={{
                  height: 300,
                  width: 1,
                  '& .super-app-theme--cell': {
                    backgroundColor: '#000000',
                    color: '#FFFFFF',
                    fontWeight: '600',
                  },
                  '& .super-app.negative': {
                    backgroundColor: '#FF0000',
                    color: '#FFFFFF',
                    fontWeight: '600',
                  },
                  '& .super-app.positive': {
                    backgroundColor: 'rgba(11, 205, 0, 0.8)',
                    color: '#FFFFFF',
                    fontWeight: '600',
                  },
                  '& .super-app-theme--header': {
                    color: '#FFFFFF',
                    fontWeight: '600',
                  },
                  '& .MuiDataGrid-footerContainer': {
                    backgroundColor: '#D3D3D3',
                    },
                }}
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
