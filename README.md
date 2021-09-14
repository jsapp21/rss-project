# rss-project

Rework customRoutes express middleware:
-  to not check for method/url and instead put it infront of the item post/delete routes

- Fix errorHandler to deal with Error that doesn’t have getCode

- custom hook or some Jest tests

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

