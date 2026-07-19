import {createSPAFileBasedRouter} from 'ziko/router'
// console.log(import.meta.glob("./pages/**/*.js"))

createSPAFileBasedRouter({pages: import.meta.glob("./pages/**/*.js")})