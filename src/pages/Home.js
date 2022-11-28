import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { Cookies } from 'react-cookie';
import Checklist from '../components/Checklist';

const Home = () => {

    const [list, setList] = useState([]);
    // const token = Cookies("token");
    const [show, setShow] = useState(false);
    const [newList, setNewList] = useState({
        name: ""
    })

    const getList = () => {
        var config = {
            method: 'get',
            url: "http://94.74.86.174:8080/api/checklist",
            headers: {
                'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6W119.i2OVQdxr08dmIqwP7cWOJk5Ye4fySFUqofl-w6FKbm4EwXTStfm0u-sGhDvDVUqNG8Cc7STtUJlawVAP057Jlg'
            }
        };

        axios (config)
        .then(res => {
            setList(res.data.data)
        })
    }

    useEffect(() => {
        getList();
    }, []);

    // handle modal add new checklist

    const toClose = () => setShow(false);
    const toShow = () => setShow(true);

    const handleInput = (e) => {
        setNewList({...newList, [e.target.name]: e.target.value})
    }

    const addList = (e) => {
        e.preventDefault()
        var config = {
            method: 'post',
            url: 'http://94.74.86.174:8080/api/checklist',
            headers: {
                'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6W119.i2OVQdxr08dmIqwP7cWOJk5Ye4fySFUqofl-w6FKbm4EwXTStfm0u-sGhDvDVUqNG8Cc7STtUJlawVAP057Jlg'
            },
            data: newList
        }

        axios(config)
        .then(
            getList(),
            toClose()
        )
    }

    // Delete list

    const handleDelete = (id) => {
        var config = {
            method: 'delete',
            url: `http://94.74.86.174:8080/api/checklist/${id}`,
            headers: {
                'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6W119.i2OVQdxr08dmIqwP7cWOJk5Ye4fySFUqofl-w6FKbm4EwXTStfm0u-sGhDvDVUqNG8Cc7STtUJlawVAP057Jlg'
            }
        }

        axios(config)
        .then(() => {
            getList()
        }
        )
    }

  return (
    <div>
        <Button onClick={toShow}>Add New Checklist</Button>
        {list.map((item, index) => {
            return (
                <Checklist 
                    name={item.name}
                    status={item.checklistCompletionStatus}
                    delete={() => handleDelete(item.id)}
                />
            )
        })}

        <Modal show={show} onHide={toClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Checklist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="string" placeholder="Checklist name" 
                    name='name'
                    onChange={(e) => handleInput(e)}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => addList(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Home