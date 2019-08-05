import * as React from "react";

var uuid = require('react-native-uuid');

class NewVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: [],
            id:"",
            url:"",
            title:""
        }
    }


    submitForm = (e) => {
        let url='http://localhost:53000/playlist/'

        let id = this.state.id;
        let method="PUT"
        if (typeof id == 'undefined' || id == '') {
            id = uuid.v1();
            method="POST"
        }else{
            url =url+id
        }

        fetch(url, {
            method: method,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                id: id,
                title:this.state.title,
                url:this.state.url,
                status:"0",
                disableStatus:""
            }),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((json) => {
            // alert(JSON.stringify(json));
            this.loadPlaylist()
            this.initState()
        }).catch((error) => {
            console.error(error);
        })
    }

    idChange = (e) => {
        this.setState({
            id: e.target.value
        })
    }

    titleChange = (e) => {
        this.setState({
            title: e.target.value
        })
        console.log("title",e.target.value)
    }

    urlChange = (e) => {
        this.setState({
            url: e.target.value
        })
    }

    edit = (id) => {
        fetch("http://localhost:53000/playlist/"+id, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.setState({
                    id:data.id,
                    url:data.url,
                    title:data.title,
                    status:data.status,
                    disableStatus:data.disableStatus
                })

            })
            .catch(e => {
                console.log("error")
            })


    }

    del = (id) => {
        fetch("http://localhost:53000/playlist/"+id, {method: 'DELETE'})
            .then(response => response.json())
            .then(data => {
                this.loadPlaylist()

            })
            .catch(e => {
                console.log("error")
            })
    }

    approve = (id) => {
        fetch("http://localhost:53000/playlist/"+id, {method: 'GET'})
            .then(response => response.json())
            .then(data => {

                fetch("http://localhost:53000/playlist/"+id, {
                    method: "PUT",
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({
                        id:data.id,
                        url:data.url,
                        title:data.title,
                        status:"1",
                        disableStatus:"disabled"
                    }),
                }).then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                }).then((json) => {
                    // alert(JSON.stringify(json));
                    this.loadPlaylist()
                    this.initState()
                }).catch((error) => {
                    console.error(error);
                })
            })
            .catch(e => {
                console.log("error")
            })

    }


    componentDidMount() {
        this.loadPlaylist()
    }

    loadPlaylist(){
        fetch("http://localhost:53000/playlist", {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.setState({playlist: data})
            })
            .catch(e => {
                console.log("error")
            })
    }
    render() {
        const list = this.state.playlist;
        return (
            <div className="newvideo">
                <form onSubmit={this.submitForm}>

                    <div className="form-group">
                        <label htmlFor="title">title</label>
                        <input type="text" className="form-control"   required value={this.state.title} onChange={this.titleChange}/>

                    </div>

                    <div className="form-group">
                        <label htmlFor="url">url</label>
                        <input type="url" className="form-control"  required value={this.state.url} onChange={this.urlChange}/>

                    </div>
                    <div>
                        <button type="submit" className="btn btn-success" >save</button>
                    </div>

                </form>

                <br/>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>no</th>
                        <th>title</th>
                        <th>url</th>
                        <th>operate</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map((item, index) => {
                        return <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.url}</td>
                            <td>
                                <button type="button" className="btn btn-primary" onClick={this.edit.bind(this,item.id)}>edit</button>
                                &nbsp;
                                <button type="button" className="btn btn-danger" onClick={this.del.bind(this,item.id)}>delete</button>
                                &nbsp;
                                <button type="button" className="btn btn-success" disabled={item.disableStatus} onClick={this.approve.bind(this,item.id)}>approve</button>
                            </td>
                        </tr>

                    })}
                    </tbody>
                </table>
            </div>
        );
    }

    initState() {
        this.setState( {
            id:"",
            url:"",
            title:""
        })
    }
}

export default NewVideo;