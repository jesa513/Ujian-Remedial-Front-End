import React, {Component} from 'react';
import axios from 'axios';

class CategoryList extends Component{
    state = {listProduct: [], selectedEditProductId: 0}

    componentDidMount(){
        axios.get('http://localhost:1997/categorylist')
        .then((res)=>{
        this.setState({listProduct:res.data})
        })
    }

    onBtnAddClick = () => {
        axios.post('http://localhost:1997/addcategory', {
            nama: this.refs.AddNama.value,
        
        })
        .then((res) => {
            alert("Add Category Success")
            this.setState({listProduct:res.data})
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure to delete?')) {
            axios.delete('http://localhost:1997/deletecategory/' + id)
            .then((res) => {
                alert('Delete Success');
                this.setState({ listProduct: res.data })
            })
            .catch((err) => {
                alert('Error')
                console.log(err);
            })
        }
    }

    onBtnSaveClick = (id) => {
        axios.put('http://localhost:1997/editcategory/' + id, {
            nama: this.refs.EditNama.value
        })
        .then((res) => {
            alert("Edit Category Success")
            this.setState({ listProduct: res.data, selectedEditProductId: 0 })
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    renderProductList = () => {
        var listJSX = this.state.listProduct.map((item) => {
            if(item.id === this.state.selectedEditProductId) {
                return (
                    <tr>
                        <td></td>
                        <td><input type="text" ref="EditNama" defaultValue={item.nama} /></td>
                        <td><input type="button" class="btn btn-primary" value="Cancel" onClick={() => this.setState({ selectedEditProductId: 0 })} /></td>
                        <td><input type="button" class="btn btn-primary" value="Save" onClick={() => this.onBtnSaveClick(item.id)} /></td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.nama}</td>
                    <td><input type="button" class="btn btn-primary" value="Edit" onClick={() => this.setState({selectedEditProductId:item.id})} /></td>
                    <td><input type="button" class="btn btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(item.id)} /></td>
                </tr>
            )
        })
        return listJSX;
    }
    
    render(){
        return(
            <div>
            <center>
                <h1>Category List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nama</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProductList()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td><input type="text" ref="AddNama" placeholder="Masukan Nama Category"/></td>
                            <td></td>
                            <td><input type="button" class="btn btn-success" value="Add" onClick={this.onBtnAddClick} /></td>
                        </tr>
                    </tfoot>
                </table>
            </center>
            </div>
        )
    }
}

export default CategoryList;