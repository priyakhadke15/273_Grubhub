import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {
    constructor(props) {
        super(props);
        const { match: { params: { restaurantID: restaurantId } } } = this.props;
        this.state = {
            msg: '',
            // items: {
            //     "dinner": [
            //         {
            //             "address": "N Street,San Jose",
            //             "cuisine": "Bakery",
            //             "iDesc": "Mint Boba Tea",
            //             "iImage": null,
            //             "image": "",
            //             "itemID": "cdf5b752-4b43-4457-adf6-81d83835bf65",
            //             "itemName": "Boba Tea",
            //             "name": "CafeCool",
            //             "ownerId": "80a38bca-e310-4f3d-a48b-48a55688108c",
            //             "price": 3.23,
            //             "restaurantId": "cdf5b752-4b43-4457-adf6-81d83835bf65",
            //             "secName": "dinner",
            //             "zipcode": 95113
            //         }
            //     ]
            // },
            items: {},
            foodImage: "/generic-item.png",
            imageTargetFile: '',
            restaurantId
        }
    }

    async repaintMenu() {
        const sleep = msec => new Promise(r => setTimeout(r, msec));
        try {
            this.props.toggleSpinner("Fetching....");
            const response = await fetch(`/api/v1/restaurant/item${this.state.restaurantId ? `?restaurantId=${this.state.restaurantId}` : ''}`);
            const body = await response.json();
            await sleep(1500);
            this.props.toggleSpinner();
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

    async componentDidMount() {
        this.repaintMenu();
    }

    addItem = (e) => {
        const sleep = msec => new Promise(r => setTimeout(r, msec));
        e.preventDefault();
    }

    changeSectionName = oldname => async e => {
        e.preventDefault();
        const newname = e.target.elements.sectionName.value;
        if (oldname === newname) {
            // do nothing
            return;
        }
        // get all items for this section
        const itemIds = Array.isArray(this.state.items[oldname]) ? this.state.items[oldname].map(i => i.itemID) : [];
        const updatePromises = [];
        try {
            this.props.toggleSpinner("Updating...");
            itemIds.forEach(itemID => {
                updatePromises.push(fetch('/api/v1/item', {
                    method: 'put',
                    mode: "cors",
                    redirect: 'follow',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ itemID, secName: newname })
                }))
            });
            // something can be done with the responses (like check if all were 200ok)
            // but ok to leave it out for now
            await Promise.all(updatePromises);
            this.props.toggleSpinner();
            this.repaintMenu();
        } catch (err) {
            this.props.toggleSpinner();
            this.setState({ msg: err.message || err });
            this.repaintMenu();
        }
    };

    deleteSection = async sectionname => {
        // TODO: delete all items in this section
        alert(`deletesection: ${sectionname}`)
    }

    onImageSelect(event) {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                foodImage: URL.createObjectURL(event.target.files[0]),
                imageTargetFile: event.target.files[0]
            });
        }
    }

    render() {
        return (
            <div>
                {Object.keys(this.state.items).length > 0 && (
                    <div className="container">
                        {Object.keys(this.state.items).map(section => (
                            <div key={section}>
                                {!this.state.restaurantId ? (<div className="contact-form" style={{ width: "80%", display: "flex" }}>
                                    <label>Section:</label>
                                    <form onSubmit={this.changeSectionName(section).bind(this)} style={{ width: "80%", display: "flex" }}>
                                        <input style={{ width: "150vw", marginRight: "3vw" }} name="sectionName" defaultValue={section} type="text" placeholder="Section Name" required />
                                        <input style={{ marginRight: "2vw", height: "58px" }} type="submit" value="Change Name" />
                                    </form>
                                    <input type="button" onClick={() => this.deleteSection(section)} value="Delete Section" />
                                </div>) :
                                    (<div className="contact-form">
                                        <pre style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}>{section}</pre>
                                    </div>)}
                                <div className="recipes-list">
                                    {this.state.items[section].map(item => (
                                        <article className="recipe" key={item.itemID}>
                                            <figure className="recipe-image" style={{ width: "170px", height: "170px" }}><img style={{ width: "170px", height: "170px" }} src={item.iImage && item.iImage !== "undefined" ? item.iImage : "/generic-item.png"} alt={item.itemName} /></figure>
                                            <div className="recipe-detail">
                                                <h2 className="recipe-title"><a href="#">{item.itemName}</a></h2>
                                                <p>{item.iDesc}</p>
                                                <p>{item.secName}</p>
                                                <div className="recipe-meta">
                                                    <span className="time"><img src="/images/dollar.png" />{item.price}</span>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {!this.state.restaurantId && <hr />}
                    </div>)}
                {!this.state.restaurantId && (< div className="contact-form" style={{ width: "60%" }} >
                    <form onSubmit={this.addItem.bind(this)} >
                        <div style={{ width: "20%", height: "auto", margin: "0 auto" }}>
                            <img style={{ imageOrientation: "from-image", width: "13vw", height: "auto", position: "relative" }} src={this.state.foodImage}></img>
                            <input type="file" onChange={this.onImageSelect.bind(this)} style={{ background: "none", border: "none" }} alt="Choose image" />
                        </div>
                        <div style={{ display: "flex" }}>
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
                        </div>
                    </form>
                </div >)}
            </div>
        );
    }
}

export default Menu;