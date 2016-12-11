namespace whatinsideusers.Controllers {

    export class MasterController {
        // public currentUser;
        // constructor(
        //     private userService: whatinsideusers.Services.UserService
        // ) {
        //     userService.
        // }
        public masterSecret: "Aardvark";
    }

    export class HomeController {
        public message = 'Hello from the home page!';
        public products;
        public searchField;
        public searchQuery;
        public masterSecret;
        public showDetail(id) {
            console.log("I wanna drift away in the ", this.$state.current.data.blue);
            this.$state.go('product', {id: id});
        }
        public getProducts() {
            this.productService.getProducts().then((products) => {
                    this.products = products;
                    console.log(this.products);
                }).catch((err) => {
                    console.log("Controller: Err getting products", err);
                });
        }
        public search() {
            this.queryService.search({query: this.searchQuery})
                .then((results)=> {
                    this.products = results.products;
                }).catch((err) => {
                    console.log("Controller: err searching", err);
                })
        }
        constructor(
            private productService: whatinsideusers.Services.ProductService,
            private queryService: whatinsideusers.Services.QueryService,
            private $state: ng.ui.IStateService,
            secret
            ) {
                this.getProducts();
                this.masterSecret = secret;
        }
    }
    export class ProductController {
        public product;
        public info;
        public getInfo(ingredient) {
            this.$http.get('https://en.wikipedia.org/w/api.php?action=opensearch&namespace=0&format=json&warningsaserror&origin=*&search=' + ingredient)
            // this.$http.get('https://en.wikipedia.org/w/api.php?action=opensearch&search=zyz&limit=1&namespace=0&format=json&origin=*')
                .then((information) => {
                    this.info = information;
                    console.log(this.info);
                }).catch((err) => {
                    console.log("Error fetching info");
                }); 
            
        }
        constructor(
            private productService: whatinsideusers.Services.ProductService,
            private $stateParams: ng.ui.IStateParamsService,
            private $http: ng.IHttpService) {
                this.productService.getProduct({id: $stateParams['id']}).then((product) => {
                    this.product = product;
                }).catch((err) => {
                    console.log("Controller: Err getting product", err);
                });
        }
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
            return this.userService.login({type: 'login', user: this.user, username: this.user.username, password: this.user.hash})
                .then((results) => {
                    console.log("cntrl logged in.", results);
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
