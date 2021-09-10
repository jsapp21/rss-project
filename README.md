# rss-project

Reporting Page

create a custom middleware in front of all the /items post, delete and outofstock routes that looks up the id being edited and throws a access denied error if the item name = “Cheeseburger”. Catch this error in errorHandler and return 403
(edited)


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


