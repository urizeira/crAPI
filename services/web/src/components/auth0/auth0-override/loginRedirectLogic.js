import { LOGIN_CALLBACK_URI } from './constants';

/**
 * Redirects the user to a specified website based on the `redirect_uri` query parameter,
 * appending the JWT access token as a query string.
 *
 * @param {object} location - The current location object of the browser, typically provided by the router.
 * @param {string} accessToken - The JWT access token to be appended as a query parameter.
 */
export function redirectToHackedWebsite(location, accessToken) {
    // Parse the location's search string into query parameters.
    const query = new URLSearchParams(location.search);

    // Check if the current location's pathname matches the predefined LOGIN_CALLBACK_URI.
    if (location.pathname === '/'+LOGIN_CALLBACK_URI) {
        // Get the 'redirect_uri' value from the query parameters.
        const redirectUri = query.get('redirect_uri');
        
        
        if (redirectUri!='' && redirectUri!='null' && redirectUri!=null){
            window.location.href  = redirectUri+ "?jwt=" + accessToken;    
        }
        else{
           return;
        }
        // Redirect the user to the specified URI with the JWT token appended.
        
    }    
}
