import React from 'react';
import ReactDOM from 'react-dom/server';
import createLocation            from 'history/lib/createLocation';
import { RouterContext, match } from 'react-router'

import routes from './app';
export default function(req, res) {
  const location = createLocation(req.url);
    match({ routes, location }, (error, redirectLocation, renderProps) => {
        res.render("home.handlebars", {
            content: ReactDOM.renderToString(<RouterContext {...renderProps} />)
        });
    });
}
