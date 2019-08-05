import * as React from "react";

class Playlist extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            playlist:[],
            url:"",
            id:""
        }

    }


    playVideo = (id, url) => {

        this.setState({id: id, url: url})
        this.props.changeVideo(id,url)
    }

    componentDidMount(){
        fetch("http://localhost:53000/playlist?status=1", {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                debugger
                this.setState({playlist: data})
            })
            .catch(e => {
                console.log("error")
            })
    }

    render() {
        const list=this.state.playlist;
        return (
            <div>
                <p className="navbar-brand">Vides - FSD </p>
                <ul className="nav  nav-pills flex-column ">
                    { list.map((item)=>{
                        return <li className="nav-item">
                            <a className="nav-link" href="javascript:void(0)"  onClick={()=>this.playVideo(item.id,item.url)}>
                                <i className="fa fa-play-circle fa-1x text-info">{item.title}</i>
                            </a>
                        </li>
                    })}

                </ul>

            </div>
        );
    }
}

export default Playlist;