import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';

const DataProvider = ({ children }) => {
 const [loading, setLoading] = useState(true);
 const [data, setData] = useState(null);

 useEffect(() => {
    // Simulación de carga de datos asíncrona
    setTimeout(() => {
      setData('Hello World');
      setLoading(false);
    }, 1000);
 }, []);

 return loading ? null : <>{children(data)}</>;
};

const App = () => {
 return (
    <BrowserRouter>
      <DataProvider>
        {data => (
          <Switch>
            <Route exact path="/" render={() => <ComponentA data={data} />} />
            <Route path="/routeB" render={() => <ComponentB data={data} />} />
            <Redirect to="/" />
          </Switch>
        )}
      </DataProvider>
    </BrowserRouter>
 );
};

export default App;