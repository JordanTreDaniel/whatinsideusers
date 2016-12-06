namespace whatinsideusers.Controllers {

    export class HomeController {
        public message = 'Hello from the home page!';
    }

    export class RegisterController {
        public user;
        public register() {
            return this.userService.register({type: "register", user: this.user})
                .then((results) => {
                    console.log("Registered.", results);
                }).catch((err) => {
                    console.log("Not Registered", err);
                });
        }
        public page = "Register";
        constructor(private userService: whatinsideusers.Services.UserService) {}
    }
    export class LoginController {
        public user;
        public login() {
            return this.userService.login(this.user)
                .then((results) => {
                    console.log("logged in.", results);
                }).catch((err) => {
                    console.log("Not logged in", err);
                });
        }
        public page = "Login";
        constructor(private userService: whatinsideusers.Services.UserService) {}
        
    }
    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
