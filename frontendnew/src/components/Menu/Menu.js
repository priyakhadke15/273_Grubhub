import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            items: {}
        }
    }

    async componentDidMount() {
        try {
            const response = await fetch('/api/v1/restaurant/item')
            const body = await response.json();
            if (response.status === 200) {
                this.setState({
                    items: body.reduce((acc, item) => {
                        acc[item.secName] = [...(acc[item.secName] ? acc[item.secName] : []), item]
                        return acc;
                    }, {})
                });
            } else {
                this.setState({ msg: body.message });
            }
        } catch (e) {
            alert(e)
        }
    }

    addItem = (e) => {
        const sleep = msec => new Promise(r => setTimeout(r, msec));
        e.preventDefault();
    }

    changeSectionName = oldName => async e => {
        e.preventDefault();
        // TODO: update all items in this section
        alert(`changesectionname, ${oldName}, ${e.target.elements.sectionName.value}`);
    };

    deleteSection = async sectionname => {
        // TODO: delete all items in this section
        alert(`deletesection: ${sectionname}`)
    }

    render() {
        return (
            <div>
                {Object.keys(this.state.items).length > 0 && (
                    <div className="container">
                        {Object.keys(this.state.items).map(section => (
                            <div key={section}>
                                <div className="contact-form" style={{ width: "80%", display: "flex" }}>
                                    <label>Section:</label>
                                    <form onSubmit={this.changeSectionName(section).bind(this)} style={{ width: "80%", display: "flex" }}>
                                        <input style={{ width: "150vw", marginRight: "3vw" }} name="sectionName" defaultValue={section} type="text" placeholder="Section Name" required />
                                        <input style={{ marginRight: "2vw", height: "58px" }} type="submit" value="Change Name" />
                                    </form>
                                    <input type="button" onClick={() => this.deleteSection(section)} value="Delete Section" />
                                </div>
                                <div className="recipes-list">
                                    {this.state.items[section].map(item => (
                                        <article className="recipe" key={item.itemID}>
                                            <figure className="recipe-image" style={{ width: "10vw", height: "10vw" }}><img style={{ width: "10vw", height: "10vw" }} src={item.iImage && item.iImage !== "undefined" ? item.iImage : "/generic-item.png"} alt={item.itemName} /></figure>
                                            <div className="recipe-detail">
                                                <h2 className="recipe-title"><a href="#">{item.itemName}</a></h2>
                                                <p>{item.iDesc}</p>
                                                <p>{item.secName}</p>
                                                <div className="recipe-meta">
                                                    <span className="time"><img src="images/dollar.png" />{item.price}</span>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>)}
                < div className="contact-form" style={{ width: "60%" }} >
                    <form onSubmit={this.addItem.bind(this)} style={{ display: "flex" }}>
                        <div style={{ width: "25vw", marginRight: "20px" }}>
                            <input type="text" placeholder="Item Name" required />
                            <input type="number" placeholder="Price" required />
                            <input type="text" placeholder="Section" required />
                        </div>
                        <div style={{ flexGrow: "1" }}>
                            <textarea placeholder="Item Description" required />
                            <input type="submit" value="Add New Item" />
                            <pre>{this.state.msg}</pre>
                        </div>
                    </form>
                </div >
            </div>
        );
    }
}

export default Menu;