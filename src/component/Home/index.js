import {Component} from "react";

import {TailSpin} from "react-loader-spinner"
import ProductItem from "../ProductItem"
import "./index.css"


const itemsCategoryList = [
    {id:"electronics",category:"Electronics"},
    {id:"men's clothing",category:"Men's Clothing"},
    {id:"women's clothing",category:"Women's clothing"},
    {id:"jewelery",category:"Jewelery"}
]


const optionsList = [
    {id:"userProfile",imageUrl:"https://ik.imagekit.io/Satish108/user-alt.png?updatedAt=1708083414941"},
    {id:"bookmark",imageUrl:"https://ik.imagekit.io/Satish108/Bookmark.png?updatedAt=1708083414906"},
    {id:"cart",imageUrl:"https://ik.imagekit.io/Satish108/shopping-bag%20(1).png?updatedAt=1708083414935"},
    
]

const apiStatusConstants = {
    initial: "INITIAL",
    inProgress: "IN_PROGRESS",
    success: "SUCCESS",
    failure: "FAILURE",
  };


class Home extends Component{
    state={category:"electronics",searchInput:"",productList:[],status:apiStatusConstants.initial}
    componentDidMount(){
        this.getTheData()
    }

    getTheData=async()=>{
        const {category,serachInput}=this.state
        const url = `https://fakestoreapi.com/products/category/${category}?search_q=${serachInput}`
        this.setState({status:apiStatusConstants.inProgress})
    
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json()
            this.setState({productList:data,status:apiStatusConstants.success})
        }

    }

    getTheCategory=event=>{
        const obj = itemsCategoryList.find(each=>each.category===event.target.textContent)
        this.setState({category:obj.id},this.getTheData)
    }

    getTheSearchData=event=>{
        this.setState({searchInput:event.target.value},this.getTheData)
    }

    
        renderTheLoader = () => (
            <div testid="list-loader" className="loader-container">
              <TailSpin type="Oval" color="#F7931E" height={50} width={50} />
            </div>
          )
    


    renderTheSearchBar=()=>{
        const {searchInput}=this.state
        return <li className="search-input-continer">
            <input type="search" value={searchInput} onChange={this.getTheSearchData} placeholder="Search your Products" className="search-input"/>
            <img src="https://ik.imagekit.io/Satish108/search.png?updatedAt=1708083414902" className="image-size" alt="search-icon"/>
        </li>
    }

    renderTheNavbar=()=>{
        const {category}=this.state
        return (
        <nav className="nav-container">
        <h1 className="website-logo">TANN TRIM</h1>
        <ul className="category-list">
         {itemsCategoryList.map(each=>(
            <li key={each.id}>
                <button type="button" className="category-item btn" onClick={this.getTheCategory}>{each.category}</button></li>
         ))}
        </ul>
        <ul className="options-list">
            {this.renderTheSearchBar()}
         {optionsList.map(each=>(
            <li key={each.id} className="category-item">
                <img src={each.imageUrl} alt={each.id} className="option-item-size"/>
            </li>
         ))}
        </ul>

    </nav>
    )}

    renderTheProductList=()=>{
        const {productList} = this.state 
        return (
            <ul className="product-list">
            {productList.map(each=>(
                <ProductItem key={each.id} productDetails={each}/>
            ))}
            </ul>
        )
    }

    renderTheProdctsView = () => {
        const {status} = this.state
        switch (status) {
          case apiStatusConstants.inProgress:
            return this.renderTheLoader()
          case apiStatusConstants.success:
            return this.renderTheProductList()
          default:
            return null
        }
      }




    render(){
        return <div className="home-page-container">
            {this.renderTheNavbar()}
            {this.renderTheProdctsView()}
        </div>
    }
}



export default Home