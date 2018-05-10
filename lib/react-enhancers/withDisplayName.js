import { setDisplayName, wrapDisplayName as _wrapDisplayName, getDisplayName } from 'recompose';


/**
 * Update displayName of React Component with supplied `nameWrapper`
 * E.g origin displayName = "MyComponent" and nameWrapper = "connect" ==> "connect(MyComponent)"
 *
 * @param {React.Component} Component
 * @param {String} nameWrapper
 */
export const wrapDisplayName = (Component, nameWrapper) => setDisplayName(_wrapDisplayName(getDisplayName(Component), nameWrapper));
