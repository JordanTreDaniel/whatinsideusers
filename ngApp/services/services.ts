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
    export class UserRegisterService {
        private UserResource;
        public register(params) {
            return this.UserResource.save(params).$promise;
        }
        constructor($resource: ng.resource.IResourceService) {
            this.UserResource = $resource('/api/users/register');
        }
    }
    export class UserLoginService {
        private UserResource;
        public login(user) {
            return this.UserResource.save(user).$promise;
        }
        constructor($resource: ng.resource.IResourceService) {
            this.UserResource = $resource('/api/users/login');
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
    export class IngredientService {
        constructor($resource: ng.resource.IResourceService) {
            this.IngredientResource = $resource("/api/ingredients/:name");
        }
        private IngredientResource;
        public search(name) {
            return this.IngredientResource.get(name).$promise;
        }
        public save(ing) {
            return this.IngredientResource.save(ing).$promise;
        }
        public delete(id) {
            return this.IngredientResource.delete(id).$promise;
        }
    }
    export class UserTagService {
        constructor($resource: ng.resource.IResourceService) {
            this.NewTagResource = $resource('/api/usertags/generate/:id');
            this.TagResource = $resource('/api/usertags/:id');
        }
        public NewTagResource;
        public TagResource;
        public generate(id) {
            console.log("Reached the service", id);
            return this.NewTagResource.save(id).$promise;
        }
        public getTag(id) {
            return this.TagResource.get(id).$promise;
        } 
        public update(tag) {
            return this.TagResource.save(tag).$promise;
        }
        public delete(id) {
            return this.TagResource.delete(id).promise;
        }
    }
    angular.module('whatinsideusers').service('userRegisterService', UserRegisterService);
    angular.module('whatinsideusers').service('userLoginService', UserLoginService);    
    angular.module('whatinsideusers').service('productService', ProductService);
    angular.module('whatinsideusers').service('queryService', QueryService);
    angular.module('whatinsideusers').service('masterUserService', MasterUserService);
    angular.module('whatinsideusers').service('ingredientService', IngredientService);
    angular.module('whatinsideusers').service('userTagService', UserTagService);
    
    
    
    
    
}
