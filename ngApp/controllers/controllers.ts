
namespace whatinsideusers.Controllers {

    export class MasterController {
        public currentUser;
        constructor(
            private masterUserService: whatinsideusers.Services.MasterUserService,
            private $state: ng.ui.IStateService,
            private $http: ng.IHttpProvider
        ) {
            masterUserService.getCurrentUser().then((user) => {
                this.currentUser = user.user;
            }).catch((err) => {
                console.log("Error grabbing user", err);
            }); 
        }
        public logout() {
            this.$http.defaults.headers.common.Authorization = null;
            this.$state.go('home', null, {reload: true});
        }
    }

    export class HomeController {
        public message = 'Hello from the home page!';
        public products;
        public searchField;
        public searchQuery;
        public currentUser;
        public masterSecret;

        constructor(
            private productService: whatinsideusers.Services.ProductService,
            private queryService: whatinsideusers.Services.QueryService,
            private masterUserService: whatinsideusers.Services.MasterUserService,
            private $state: ng.ui.IStateService,
            ) {
                this.getProducts();
                masterUserService.getCurrentUser().then((results) => {
                    this.currentUser = results.user;
                }).catch((err) => {
                    console.log("masterservice => Home err getting user", err);
                });
        }
        
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
        constructor(
            private userRegisterService: whatinsideusers.Services.UserRegisterService,
            private userLoginService: whatinsideusers.Services.UserLoginService,
            private $http: ng.IHttpProvider,
            private $state: ng.ui.IStateService
            ) {}
        public user;
        public register() {
            return this.userRegisterService.register({user: this.user})
                .then((results) => {
                    console.log("Registered.", results);
                    this.login(this.user);
                }).catch((err) => {
                    console.log("Not Registered", err);
                });
        }
        public login(user) {
            return this.userLoginService.login({username: user.username, hash: user.hash})
                .then((results) => {
                    console.log("cntrl logged in.", results);
                    this.$http.defaults.headers.common.Authorization = "Bearer " + results.token;
                    this.$state.go('home', null, {reload: true, notify:true});
                }).catch((err) => {
                    console.log("Not logged in", err);
                });
        }
        public page = "Register";
        
    }
    export class LoginController {
        public user;
        public login() {
            return this.userLoginService.login({username: this.user.username, hash: this.user.hash})
                .then((results) => {
                    console.log("cntrl logged in.", results);
                    this.$http.defaults.headers.common.Authorization = "Bearer " + results.token;
                    this.$state.go('home', null, {reload: true, notify:true});
                }).catch((err) => {
                    console.log("Not logged in", err);
                });
        }
        public page = "Login";
        constructor(private userLoginService: whatinsideusers.Services.UserLoginService,
                    private $http: ng.IHttpProvider,
                    private $state: ng.ui.IStateService
                    ) {}
        
    }
    export class DashboardController {
        constructor(
            private masterUserService: whatinsideusers.Services.MasterUserService,
            private $state: ng.ui.IStateService,
            private ingredientService: whatinsideusers.Services.IngredientService)
            {   masterUserService.getCurrentUser().then((user) => {
                    this.currentUser = user.user;
                }).catch((err) => {
                    console.log("Error grabbing user", err);
                });
                
        }
        public currentUser;
        public select;
        public currentIngredient;
        public searchedIngredients;
        public ingSearch;
        public getIngredient() {
            this.ingredientService.getIngredient({name: this.ingSearch}).then((results) => {
                    console.log("Got back", results.results);
                    this.searchedIngredients = results.results;
                }).catch((err) => {
                    console.log("Error grabbing ingredient", err);
                });
        }
        public modifyIngredient() {
            this.ingredientService.saveIngredient({ingredient: this.currentIngredient})
                .then((results) => {
                    console.log("Saved ing", results.results);
                }).catch((err) => {
                    console.log("Error saving ing", err);
                });
        }
        public pickIngredient(ing) {
            this.currentIngredient = ing;
        }
    }
    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
