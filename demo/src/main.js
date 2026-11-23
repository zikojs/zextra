import {createFileBasedRouter} from 'ziko/router'
// console.log(import.meta.glob("./pages/**/*.js"))

createFileBasedRouter({pages: import.meta.glob("./pages/**/*.js")})