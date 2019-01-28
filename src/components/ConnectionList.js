import React, {Component} from 'react';
import axios from 'axios';

class ConnectionList extends Component{
    state = {listProduct: [], selectedEditProductId: 0}

    componentDidMount= (nama) => {
        axios.get('http://localhost:1997/connectionlist/' + nama)
        .then((res)=>{
        this.setState({listProduct:res.data})
        })
    }

    onBtnAddClick = () => {
        axios.post('http://localhost:1997/addconnection', {
            namaMovie: this.refs.AddNamaMovie.value,
            namaCategory: this.refs.AddNamaCategory.value
           
        })
        .then((res) => {
            alert("Add Movie Success")
            this.setState({listProduct:res.data})
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure to delete?')) {
            axios.delete('http://localhost:1997/deleteconnection/' + id)
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

   

    renderProductList = () => {
        var listJSX = this.state.listProduct.map((item) => {
            if(item.id === this.state.selectedEditProductId) {
                return (
                    <tr>
                        <td></td>
                        <td><input type="text" ref="EditNamaMovie" defaultValue={item.namamovie} /></td>
                        <td><input type="text" ref="EditNamaCategory" defaultValue={item.namacategory} /></td>

                        <td><input type="button" class="btn btn-primary" value="Cancel" onClick={() => this.setState({ selectedEditProductId: 0 })} /></td>
                        <td><input type="button" class="btn btn-primary" value="Save" onClick={() => this.onBtnSaveClick(item.id)} /></td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td>{item.namamovie}</td>
                    <td>{item.namacategory}</td>                    
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
                <h1>Connection List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Nama Movie</th>
                            <th>Nama Category</th>
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
                            <td><input type="text" ref="AddNamaMovie" placeholder="Masukan Nama Movie"/></td>
                            <td><input type="text" ref="AddNamaCategory" placeholder="Masukan Nama Category"/></td>
                            
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

export default ConnectionList;
