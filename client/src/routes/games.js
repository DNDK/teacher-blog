import { Component } from "react"
import { Link } from 'react-router-dom';

import Pagination from "./pagination";

const axios = require("axios");

class Games extends Component {
    constructor(props) {
        super(props);
        if (!this.props.location.search) {
            this.props.history.push({
                pathname: window.location.pathname,
                search: "?page=1"
            })
        }
        console.log(this.props.location)
        const urlParams = new URLSearchParams(window.location.search);
        const page = parseInt(urlParams.get('page'));
        this.state = {
            games: [],
            page: page || 1,
            numberOfPages: null,
            showLoading: false
        }
        this.handlePageButtonClick = this.handlePageButtonClick.bind(this);
    }
    componentDidMount() {
        axios.get(`/api/games?page=${this.state.page - 1}`).then(res => {
            let games = res.data.games;
            let numberOfPages = res.data.length;
            console.log(res.data)
            this.setState({ games, numberOfPages });
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.setState({ showLoading: true })
            axios.get(`/api/games?page=${this.state.page - 1}`).then(res => {
                let games = res.data.games;
                console.log(games)
                let numberOfPages = res.data.length;
                this.setState({ games, numberOfPages, showLoading: false });
            })
        }
    }
    handlePageButtonClick(i) {
        console.log(i)
        let page = i;
        this.props.history.push({
            pathname: window.location.pathname,
            search: `?page=${page}`
        })
        this.setState({ page });
        window.scrollTo(0, 0);
    }

    renderLink(game) {
        return (
            <div className="article-link">
                <h3><Link to={`/games/${game._id}`}>{game.name}</Link></h3>
            </div>
        )
    }

    render() {
        console.log(this.state.games)
        let prerendered = [];
        if(this.state.numberOfPages){
            for (const i of this.state.games) {
                prerendered.push(this.renderLink(i));
            }
        }
        //pagination
        return (
            <div className="content">
            {
                this.state.numberOfPages ?

                <>
                {
                    this.state.showLoading ?
                        <div>Загрузка...</div>
                        : <>
                            {prerendered}
                            <Pagination
                                currentPage={this.state.page}
                                pages={this.state.numberOfPages}
                                onPageButtonClick={(i) => { this.handlePageButtonClick(i) }}
                            /></>
                }
                </>
                :
                <h4>Здесь пока что ничего нет</h4>
            }
            </div>

        )
    }
}

export default Games