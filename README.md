# rss-project

Reporting Page

- update out of stock: 
    - update already ordered items to be out of stock
    - do a transations for updatedOutOfStock and updatedOrdersOutOfStocks
    - if any orders fail to update to out of stock
    - item should be rollbacked 

React
- custom Hook 
    - resuable function w/ logic to return the same thing, must useThisStyle 

- useCallback
    - returns a memoized callback if one of the dpendencies has changed.
    - useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).

- useMemo
    - returns a memoized value, will only recompute the memized vlaue when one of the dependencies has changed.
    Helps avoid expenisve calculations on every render.

- useContext
    - accepts a context object and returns the current context value determined by the vlaue prop of the nearest provider.
