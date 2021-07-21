import { Component } from "react"
import { Link } from 'react-router-dom';

import Pagination from "./pagination";

const axios = require("axios");

class Classes extends Component {
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
            articles: [],
            page: page || 1,
            numberOfPages: null,
            showLoading: false
        }
        this.handlePageButtonClick = this.handlePageButtonClick.bind(this);
    }
    componentDidMount() {
        axios.get(`/api/classes?page=${this.state.page - 1}`).then(res => {
            let articles = res.data.articles;
            console.log(articles)
            let numberOfPages = res.data.length;
            this.setState({ articles, numberOfPages });
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.setState({ showLoading: true })
            axios.get(`/api/classes?page=${this.state.page - 1}`).then(res => {
                let articles = res.data.articles;
                console.log(articles)
                let numberOfPages = res.data.length;
                this.setState({ articles, numberOfPages, showLoading: false });
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

    renderLink(article) {

        let date = new Date(Date.parse(article.date));
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = month >= 10 ? month : '0' + month;
        let day = date.getDate();
        day = day >= 10 ? day : '0' + day;
        let formattedDate = `${day}.${month}.${year}`;

        let text = article.body
        const parser = new DOMParser();
        let previewHtml = parser.parseFromString(text, 'text/html');
        let fullText = previewHtml.body.innerText.split(' ');
        fullText = fullText.slice(0, 10);
        let preview = fullText.join(' ') + "...";
        return (
            <div className="article-link">
                <div><h3><Link to={`/classes/${article._id}`}>{article.title}</Link></h3></div>
                <div className="preview">
                    {preview}<br />
                    <Link to={`/classes/${article._id}`} className="read-more">Читать дальше</Link>
                </div>
                <div className="date">{formattedDate}</div>
            </div>
        )
    }

    render() {
        let prerendered = [];
        for (const i of this.state.articles) {
            prerendered.push(this.renderLink(i));
        }
        //pagination
        return (
            <div className="content">
                {this.state.numberOfPages ? <>
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

export default Classes