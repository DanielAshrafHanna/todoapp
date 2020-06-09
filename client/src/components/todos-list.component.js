import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    // componentDidMount() {
    //     axios.get('http://localhost:4000/todos/')
    //         .then(response => {
    //             this.setState({ todos: response.data });
    //         })
    //         .catch(function (error){
    //             console.log(error);
    //         })
    // }

    // componentDidUpdate() {
    //     axios.get('http://localhost:4000/todos/')
    //     .then(response => {
    //         this.setState({ todos: response.data });
    //     })
    //     .catch(function (error){
    //         console.log(error);
    //     })

    // }

    componentDidMount() {
        axios.get('todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('todos/')
        .then(response => {
            this.setState({ todos: response.data });
        })
        .catch(function (error){
            console.log(error);
        })

    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    onSubmit(e) {
        e.preventDefault();
        
       
             axios.post('https://hooks.nabu.casa/gAAAAABezmLvPFgGvLfpzFDGnotIEi38mnzNznyGbylijG1WEZ-0X-mgRvYMi7_aMVzUs1E2CmkKNT_sV_5Qk5GTboaTrTwyOUcKT_s4GAFwA4xWjW8d2l1I-OYPJkJHNK_J5jk8p-OWb51REfKcHn5DLtIfc78D6HPEdLUSyeJFwYU-SXuioOw=') ////
             .then(res => console.log("done"));  
             
             
      
        


       
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Demo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                     
                        </div>
                  

                    <div className="form-group">
                        <input type="submit" value="submit" className="btn btn-primary" />
                        
                    </div>
                </form>
            </div>
        )
    }
}