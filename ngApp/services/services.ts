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
    export class QueryService {
        private QueryResource;
        public search(query) {
            return this.QueryResource.get(query).$promise;
        }
        constructor($resource: ng.resource.IResourceService) {
            this.QueryResource = $resource('/api/products/query/:query');
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
    export class MasterUserService {
        private MasterUserResource;
        public getCurrentUser() {
            return this.MasterUserResource.get().$promise;
        }
        constructor($resource: ng.resource.IResourceService) {
            this.MasterUserResource = $resource('/api/users/master');
        }
    }
    angular.module('whatinsideusers').service('userService', UserService);
    angular.module('whatinsideusers').service('productService', ProductService);
    angular.module('whatinsideusers').service('queryService', QueryService);
    angular.module('whatinsideusers').service('masterUserService', MasterUserService);
    
    
    
}
