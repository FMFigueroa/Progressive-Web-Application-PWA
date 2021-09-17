import React, {Component} from 'react';
import './Home.css';
import Item from '../Item/Item';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            day: new Date(),
            index: 0,
        }

        this.goDetail = this.goDetail.bind(this);
    }

    getToday(day) {
        return day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
    }

    getData() {
        let index = this.state.index;
        let day = new Date(this.state.day);
        day.setDate(day.getDate() - 1 * index);
        const dayString = this.getToday(day);
        const url = "https://api.nasa.gov/planetary/apod?api_key=knBWAHTr1Yesapf67dQwxpRKc0bCWpejBOt92Thn&date=" + dayString;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    let items = this.state.items;
                    items.push(result);
                    index += 1;
                    this.setState(
                        {
                            items: items,
                            index: index,
                        }
                    )
                    if (index < 15) {
                        this.getData();
                    } else {
                        localStorage.setItem('nasa_data', JSON.stringify(items));
                        localStorage.setItem('nasa_day', this.getToday(this.state.day));
                    }
                }
            )
    }

    componentDidMount() {
        const LSdata = JSON.parse(localStorage.getItem('nasa_data'));
        const LSday = localStorage.getItem('nasa_day');
        if (!LSdata || LSday !== this.getToday(this.state.day)) {
            this.getData();
        } else {
            this.setState({
                items: LSdata,
            })
        }

    }

    goDetail(item){
        this.props.goDetail(item);
    }

    render(){
        const { items } = this.state;
        const elements = items.map( (item, i) => {
            return <Item data={item} key={i} goDetail={this.goDetail}></Item>
        })
        return (
            <div className="Home" goDetail={this.goDetail}>
                { elements }
            </div>
        );
    }

}

export default Home;

