import React, { useState } from "react";
import AddItemForm from "./AddItemForm";
import UpdateItemForm from "./UpdateItemForm";
import DeleteItemForm from "./DeleteForm";
import SpecialCategoryForm from "./SpecialCategoryForm";
import ItemStockForm from "./ItemStock";
import '../styles/Modal.css'; 

function ShowModals(){

    const  [isAddItemVisible, setIsAddItemVisible] = useState(false);
    const  [isUpdateItemVisible, setIsUpdateItemVisible] = useState(false);
    const  [isDeleteItemVisible, setIsDeleteItemVisible] = useState(false);
    const  [isItemStockVisible, setIsItemStockVisible] = useState(false);
    const  [isItemSpecialCategoryVisible, setIsItemSpecialCategoryVisible] = useState(false);

    const handleShowCreateItemForm = () => {
        setIsAddItemVisible(true);
    };

    const handleCloseCreateItemForm = () => {
        setIsAddItemVisible(false);
    };

    const handleShowUpdateItemForm = () => {
        setIsUpdateItemVisible(true);
    };

    const handleCloseUpdateItemForm = () => {
        setIsUpdateItemVisible(false);
    };

    const handleShowDeleteItemForm = () => {
        setIsDeleteItemVisible(true);
    };

    const handleCloseDeleteItemForm = () => {
        setIsDeleteItemVisible(false);
    };

    const handleShowItemStockForm = () => {
        setIsItemStockVisible(true);
    };

    const handleCloseItemStockForm = () => {
        setIsItemStockVisible(false);
    };

    const handleShowItemSpecialCategoryForm = () => {
        setIsItemSpecialCategoryVisible(true);
    };

    const handleCloseItemSpecialCategoryForm = () => {
        setIsItemSpecialCategoryVisible(false);
    };

    return(
        <div className="modals-component">
            <div className="modals-component-content">
                <h1>What would you like to do?</h1>
                <div className="modal-component-btns">
                    <button className="create-item-btn" onClick={handleShowCreateItemForm}>Create Item</button>
                    <button className="update-item-btn" onClick={handleShowUpdateItemForm}>Update Item</button>
                    <button className="delete-item-btn" onClick={handleShowDeleteItemForm}>Delete Item</button>
                    <button className="items-in-stock-btn" onClick={handleShowItemStockForm}>Check Stock</button>
                    <button className="item-to-special-category-btn" onClick={handleShowItemSpecialCategoryForm}>Add/Remove from special category</button>
                </div>
                <div className="forms-modal-display">
                    {isAddItemVisible && <AddItemForm onCreateItemClose={handleCloseCreateItemForm} />}
                    {isUpdateItemVisible && <UpdateItemForm onUpdateItemClose={handleCloseUpdateItemForm} />}
                    {isDeleteItemVisible && <DeleteItemForm onDeleteItemClose={handleCloseDeleteItemForm} />}
                    {isItemStockVisible && <ItemStockForm onItemInStockClose={handleCloseItemStockForm} />}
                    {isItemSpecialCategoryVisible && <SpecialCategoryForm onItemSpecialCategoryClose={handleCloseItemSpecialCategoryForm} />}
                </div>
            </div>
            
        </div>
    );
}

export default ShowModals;