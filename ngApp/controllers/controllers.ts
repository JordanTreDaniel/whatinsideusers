
namespace whatinsideusers.Controllers {
    export class MasterController {
        public currentUser;
        constructor(
            private masterUserService: whatinsideusers.Services.MasterUserService
        ) {
            masterUserService.getCurrentUser().then((user) => {
                this.currentUser = user;
            }).catch((err) => {
                console.log("Error grabbing user", err);
            }); 
        }
    }

    export class HomeController {
        public message = 'Hello from the home page!';
        public products;
        public searchField;
        public searchQuery;
        public masterSecret;
        public showDetail(id) {
            // console.log("I wanna drift away in the ", this.$state.current.data.blue);
            //remember how to use this syntax
            this.$state.go('product', {id: id});
        }
        public getProducts() {
            this.productService.getProducts().then((products) => {
                    this.products = products;
                }).catch((err) => {
                    console.log("Controller: Err getting products", err);
                });
        }
        public search() {
            //TODO: The search button should return all default products if 
            // you haven't entered any text, but instead it keeps the products
            //that were already on the page
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
            return this.userRegisterService.register({user: this.user})
                .then((results) => {
                    console.log("Registered.", results);
                }).catch((err) => {
                    console.log("Not Registered", err);
                });
        }
        public page = "Register";
        constructor(private userRegisterService: whatinsideusers.Services.UserRegisterService) {}
    }
    export class LoginController {
        public user;
        public login() {
            return this.userLoginService.login({username: this.user.username, hash: this.user.hash})
                .then((results) => {
                    console.log("cntrl logged in.", results);
                    this.$http.defaults.headers.common.Authorization = "Bearer " + results.token;
                }).catch((err) => {
                    console.log("Not logged in", err);
                });
        }
        public page = "Login";
        constructor(private userLoginService: whatinsideusers.Services.UserLoginService,
                    private $http: ng.IHttpProvider
                    ) {}
        
    }

    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
