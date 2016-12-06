namespace whatinsideusers {

    angular.module('whatinsideusers', ['ui.router', 'ngResource', 'ngMaterial']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: whatinsideusers.Controllers.HomeController,
                controllerAs: 'controller'
            })
            //Register views
            .state('register', {
                url: '/register', 
                templateUrl: 'ngApp/views/register.html',
                controller: whatinsideusers.Controllers.RegisterController,
                controllerAs: "controller"
            })
            //Login views
            .state('login', {
                url: '/login', 
                templateUrl: 'ngApp/views/login.html',
                controller: whatinsideusers.Controllers.LoginController,
                controllerAs: "controller"
            })
            .state('about', {
                url: '/about',
                templateUrl: '/ngApp/views/about.html',
                controller: whatinsideusers.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });

    

}
