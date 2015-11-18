import _ from 'lodash';
import host from '../host';
import Api from '../services/api';
import Dispatcher from '../core/dispatcher';
import ActionConstants from '../constants/actionConstants';

let url = 'http://jsonplaceholder.typicode.com/posts';
// let url = host();

// let path = {
//   centre: '/api/sites',
//   directory: '/api/stores',
//   settings: '/api/settings',
//   sliders: '/api/sliders',
//   pages: '/api/pages',
//   news: '/api/posts',
//   menus: {
//     footer: '/api/menus/footer-menu',
//     main: '/api/menus/main-menu'
//     }
// }

// Define the ActionCreator.
let StoreActionCreator = {
    getData () {
        Api
            .get(url)
            .then(function (data) {
                // Dispatch an action containing the stores.
                Dispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_DATA,
                    data: data
                });
            });
    }
}

export default StoreActionCreator;
