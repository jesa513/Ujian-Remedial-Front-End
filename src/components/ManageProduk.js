import React, {Component} from 'react';
import axios from 'axios';

class ManageProduk extends Component{
    state = {listProduct: [], selectedEditProductId: 0}

    componentDidMount(){
        axios.get('http://localhost:1999/product')
        .then((res)=>{
        this.setState({listProduct:res.data})
        })
    }

    onBtnAddClick = () => {
        axios.post('http://localhost:1999/addproduct', {
            nama: this.refs.AddNama.value,
            harga: this.refs.AddHarga.value,
            deskripsi: this.refs.AddDesc.value,
            image: this.refs.AddImg.value,
            namabrand: this.refs.AddBrand.value
        })
        .then((res) => {
            alert("Add Brand Success")
            this.setState({listProduct:res.data})
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure to delete?')) {
            axios.delete('http://localhost:1999/deleteproduct/' + id)
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
        axios.put('http://localhost:1999/editproduct/' + id, {
            nama: this.refs.EditNama.value,
            harga: this.refs.EditHarga.value,
            deskripsi: this.refs.EditDesc.value,
            image: this.refs.EditImg.value,
            namabrand: this.refs.EditBrand.value
        })
        .then((res) => {
            alert("Edit Brand Success")
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
                        <td><input type="text" ref="EditHarga" defaultValue={item.harga} /></td>
                        <td><input type="text" ref="EditDesc" defaultValue={item.deskripsi} /></td>
                        <td><input type="text" ref="EditImg" defaultValue={item.image} /></td>
                        <td><input type="text" ref="EditBrand" defaultValue={item.namabrand} /></td>
                        <td><input type="button" class="btn btn-primary" value="Cancel" onClick={() => this.setState({ selectedEditProductId: 0 })} /></td>
                        <td><input type="button" class="btn btn-primary" value="Save" onClick={() => this.onBtnSaveClick(item.id)} /></td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.nama}</td>
                    <td>{item.harga}</td>
                    <td>{item.deskripsi}</td>
                    <td>{item.image}</td>
                    <td>{item.namabrand}</td>
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
                <h1>Product List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama Produk</th>
                            <th>Harga</th>
                            <th>Deskripsi</th>
                            <th>Image</th>
                            <th>Brand</th>
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
                            <td><input type="text" ref="AddNama" placeholder="Masukan Nama Product"/></td>
                            <td><input type="text" ref="AddHarga" placeholder="Masukan Harga"/></td>
                            <td><input type="text" ref="AddDesc" placeholder="Masukan Deskripsi"/></td>
                            <td><input type="text" ref="AddImg" placeholder="Masukan Image" /></td>
                            <td><input type="text" ref="AddBrand" placeholder="Masukan Brand" /></td>
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

export default ManageProduk;
