import { crapienv } from "../config.js"

const auth0Constant = {
    DOMAIN: crapienv.AUTH0_DOMAIN,
    CLIENT_ID: crapienv.AUTH0_CLIENT_ID,
    SOCPE: crapienv.AUTH0_REQUEST_SOCPES,
    AUDIENCE: crapienv.AUTH0_REQUEST_AUDIENCE
}

export default auth0Constant;