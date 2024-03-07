export class Router {

    routes = {}

    addRoute(routeName, page){
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()

        window.history.pushState({}, '', event.target.href)

        this.toggleMenu()

        this.changeBgImage()
    
        this.handle()
    }
    
    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]
    
        fetch(route).then(response => response.text()).then(html => {
            document.getElementById('app').innerHTML = html
        })

        this.hideMenu(route)
    }

    toggleMenu() {
        const menuOptions = document.querySelectorAll('#menu a')
        
        menuOptions.forEach((option) => {
            if (option.pathname != window.location.pathname) {
                option.classList.remove('menu-selected')
            } else {
                option.classList.add('menu-selected')
            }
        })
    }

    changeBgImage() {
        if(window.location.pathname == "/exploration") {
            document.body.style.backgroundImage = "url(../assets/mountains-universe-3.png)"
        } else if(window.location.pathname == "/universe") {
            document.body.style.backgroundImage = "url(../assets/mountains-universe02.png)"
        } else {
            document.body.style.backgroundImage = "url(../assets/mountains-universe-1.png)"
        }
    }

    hideMenu(route) {
        if(route == this.routes[404]) {
            document.getElementById('menu').classList.add('hide')
        }else {
            document.getElementById('menu').classList.remove('hide')
        }
    }
}
