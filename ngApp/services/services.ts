namespace whatinsideusers.Services {
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
}
