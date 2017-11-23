import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import App from '../containers/app.jsx';
import store from '../utilities/store';

render(<Provider store = {store}>
                <App/>
       </Provider>,
       document.getElementById('app'));