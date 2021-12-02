import React, { useEffect, useState } from 'react';
import './userlist.css'
import { DataGrid } from '@material-ui/data-grid';
import {rows} from '../../dummy'
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { APIDeleteUsers, APIGetUsers } from '../../apiCall';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


const UserList = () => {

    const dispatch = useDispatch()

    const user = useSelector(state=>state.users.users)
    
    useEffect(()=> {
        APIGetUsers(dispatch)
    },[])
 

    const columns = [
        { field: '_id', headerName: 'ID', width: 240 },
        {
          field: 'user',
          headerName: 'User',
          width: 240,
          renderCell : (params) =>
          (
              <div className="user-info">
                  <img 
                  src={params.row.avatar} 
                  alt="" 
                  className="user-avartar"
                  />
                  <span>
                      {params.row.username}
                  </span>
              </div>
          ),
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 250,
        },
        {
            field: 'fullname',
            headerName: 'Fullname',
            width: 160,
            renderCell : (params)=>(
                <div>{params.row.name + " " +params.row.lastname}</div>
            )
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell : (params) => (
                <div className="userlist-action">
                    <Link to={`/user/${params.row._id}`}>
                        <button className="uselist-button">
                            Edit
                        </button>
                    </Link>
                    <DeleteOutline onClick={()=>handleDelete(params.row._id)} className="userlist-icon-delete"/>
                </div>
            )
        },
      ];
     
    const handleDelete = (id) => {
        APIDeleteUsers(dispatch, id)
    }

    return (
        <div className="userlist-container">
            <h3 className="userlist-title">
                LIST USER
            </h3>
           <DataGrid
            rows={user}
            columns={columns}
            pageSize={9}
            getRowId={row=>row._id}
            checkboxSelection
            disableSelectionOnClick
            />
        </div>
    );
};

export default UserList;