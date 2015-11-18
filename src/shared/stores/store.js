import Dispatcher from '../core/dispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import ActionConstants from '../constants/actionConstants';
import _ from 'lodash';

let _immutableStoreData = []; // This is immutable
let _storeData = []; // Adding this to save stores immutability;

function setStore(StoreData) {
    _immutableStoreData = StoreData;
    _storeData = StoreData;
}

// Define the Store.
let Store = assign({}, EventEmitter.prototype, {

    emitChange() {
        this.emit('change');
    },

    addChangeListener(callback) {
        this.on('change', callback);
    },

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    },
    getStore() {
          console.log("GET STORE")

        return {"data" : _storeData};
    }
});

// Store registers with dispatcher to handle actions.
Store.dispatchToken = Dispatcher.register(function(payload) {

    let action = payload.action;
    switch (action.actionType) {
        case "RECEIVE_DATA":
            setStore(action.data);
            break;
        default:
            return true;
            break;
    }
    Store.emitChange();

    return true;
});

export default Store;
