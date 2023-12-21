'use client'
import React, {useState, useEffect} from "react";
import Table from '../../../components/Table/page'
import {  message } from 'antd';
import { Formik } from 'formik';

// ... rest of your code

import { Modal, Upload } from 'antd';
const App=()=>{
  const [messageApi, contextHolder] = message.useMessage();
    const [orderList, setorderList] = useState([])
    const [ open , setOpen] = useState(false)
    const [editFields, setEditFields ] = useState({})
    const orderFetch = async () => {
        const res = await fetch('http://localhost:4000/order')
        const data = await res.json()
        setorderList(data.orderList)
      }    
     
  const deleteorder = async (id) => {
    const res = await fetch('http://localhost:4000/orders', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    const data = await res.json()
    messageApi.open({
      type: res.status == 200 ? 'success' : 'error',
      content: data.msg,
    });
    console.log(res)
    if (res.status === 200) {
      orderFetch();
    }
  };


  const editorder = async (item) => {
       const res = await fetch('http://localhost:4000/orders', {
      method: 'PUT',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(values)
    })
     const data = await res.json()
     messageApi.open({
     type: res.status == 200 ? 'success' : 'error',
     content: data.msg,
   });
   if (res.status === 200) {
     orderFetch();
   }
  };
    useEffect(() => {
        orderFetch()
      }, [])
    return(
        <div>
          {contextHolder}
          <Modal title="Delete category" open={open} onCancel={()=> setOpen(false)}>
          <Formik
        initialValues={editFields}
        enableReinitialize
        // validationSchema={SignupSchema}
        onSubmit={(values,{ resetForm }) => {
       
        }}
      >
        {({ errors, touched }) => (
          <Form className='editForm'> 
              <Field name="categoryName"/>
            </Form>
        )}
            </Formik>
            </Modal>
            
            <Table
            onDelete={deleteorder}
            onEdit={editorder}
            list={orderList}
            title={['categoryName','productName','productWeight', 'receiverPhoneNumber']} endpoint="/orders" />
        </div>
    )
}
export default App