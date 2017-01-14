namespace whatinsideusers {

    angular.module('whatinsideusers', ['ui.router', 'ngResource', 'ngMaterial']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider,
        $mdThemingProvider: ng.material.IThemingProvider
    ) => {
        // Define routes
        $stateProvider
            .state('master', {
                abstract: true,
                templateUrl: '/ngApp/views/master.html',
                controller: whatinsideusers.Controllers.MasterController,
                controllerAs: "vm",
                resolve: {
                    secret: () => {
                        return "Aardvark";
                    },
                    ///You cannot access this 'user' from a child controller,
                    //bc the controllers load before this property is defined
                    user: (masterUserService: whatinsideusers.Services.MasterUserService) => {
                        masterUserService.getCurrentUser().then((results) => {
                            return results.user;    
                        }).catch((err) => {
                            console.log("Error grabbing user", err);
                        });
                    }
                }
            })
            .state('home', {
                url: '/browse',
                parent: 'master',
                templateUrl: '/ngApp/views/home.html',
                controller: whatinsideusers.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('product', {
                url: '/products/:id',
                parent: 'master',
                templateUrl: 'ngApp/views/product.html',
                controller: whatinsideusers.Controllers.ProductController,
                controllerAs: 'controller'
            })
            //Register views
            .state('register', {
                url: '/register', 
                parent: 'master',
                templateUrl: 'ngApp/views/register.html',
                controller: whatinsideusers.Controllers.RegisterController,
                controllerAs: "controller"
            })
            //Login views
            .state('login', {
                url: '/login',
                parent: 'master',
                templateUrl: 'ngApp/views/login.html',
                controller: whatinsideusers.Controllers.LoginController,
                controllerAs: "controller"
            })
            .state('about', {
                url: '/about',
                parent: 'master',
                templateUrl: '/ngApp/views/about.html',
                controller: whatinsideusers.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('notFound', {
                url: '/notFound',
                parent: 'master',                
                templateUrl: '/ngApp/views/notFound.html'
            })
            .state('dashboard', {
                parent: 'master',
                url: '/dashboard',
                templateUrl: '/ngApp/views/dashboard.html',
                controller: whatinsideusers.Controllers.DashboardController,
                controllerAs: 'controller'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/browse');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);

        $mdThemingProvider.theme('jordan')
            .primaryPalette('green', {
                "default": "A100",
                "hue-1": "200",
                "hue-2": "300",
                "hue-3": "400"
            })
            .accentPalette('brown', {
                "default": "A100",
                "hue-1": "200",
                "hue-2": "300",
                "hue-3": "400"
            })
            .warnPalette('deep-orange', {
                "default": "A100",
                "hue-1": "200",
                "hue-2": "300",
                "hue-3": "400"
            })
            // .backgroundPalette('deep-orange', {
            //     "default": "A100",
            //     "hue-1": "200",
            //     "hue-2": "300",
            //     "hue-3": "400"
            // });
    });

    

}
