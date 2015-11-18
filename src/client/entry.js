import Router from 'react-router';
import routes from "../shared/routes";
import { render } from 'react-dom'
import history from './history';

render(<Router routes={routes}/>, document.getElementById('app'));
// render(<Router history={history}>routes</Router>, document.getElementById('app'));
