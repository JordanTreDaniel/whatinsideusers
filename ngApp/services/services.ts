namespace whatinsideusers.Services {
    export class ProductService {
        private ProductResource;
        public getProducts() {
            return this.ProductResource.query().$promise;
        }
        public getProduct(id) {
            return this.ProductResource.get(id).$promise;
        }
        constructor($resource: ng.resource.IResourceService) {
            this.ProductResource = $resource('/api/products/:id');
        }
    }
    export class UserService {
        private UserResource;
        public register(params) {
            return this.UserResource.save(params).$promise;
        }
        public login(user) {
            return this.UserResource.save(user).$promise;
        }
        constructor($resource: ng.resource.IResourceService) {
            this.UserResource = $resource('/api/users');
        }
    }
    angular.module('whatinsideusers').service('userService', UserService);
    angular.module('whatinsideusers').service('productService', ProductService);
    
}
