// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
var myApp = angular.module('myApp', ['ng-admin']);
// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('YEG Photo Tagger Admin')
        .baseApiUrl('http://localhost:3000/api/')
        .title('YEG Photo Tagger Admin');

    var photo = nga.entity('Photos');

    photo.listView()
        .title('City of Edmonton Archived Photos')
        .listActions(['edit', 'show'])
        .batchActions([])
        .fields([
            nga.field('imageNumber')
                .label('Image Number'),
            nga.field('imageTitle').label('Image Title'),
            nga.field('creationYear').label('Creation Year'),
        ]);

    photo.editionView()
        .title('Edit image "{{ entry.values.imageNumber }}"')
        .actions(['list', 'show'])
        .fields([
            nga.field('imageNumber')
                .label('Image Number')
                .editable(false),
            nga.field('imagePath')
                .editable(false)
                .label('Photo')
                .template('<img src="{{ entry.values.imagePath }}" />'),
            nga.field('imageTitle').label('Image Title'),
            nga.field('fondsTitle').label('Fonds Title'),
            nga.field('creationYear', 'number').label('Creation Year'),
            nga.field('dateOfCreationRaw').label('Date of Creation'),
            nga.field('description', 'text'),
            nga.field('creator'),
            nga.field('subjects'),
            nga.field('names'),
            nga.field('location')
        ]);

    photo.showView()
        .title('View image "{{ entry.values.imageNumber }}"')
        .actions(['list', 'edit'])
        .fields(photo.editionView().fields());

    admin.addEntity(photo);
    // more configuation here later
    // ...
    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);

myApp.config(['RestangularProvider', function (RestangularProvider) {
    function Get(yourUrl) {
        var Httpreq = new XMLHttpRequest();
        Httpreq.open("GET",yourUrl,false);
        Httpreq.send(null);

        return Httpreq.responseText;
    };

    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
        if (operation === 'getList') {
            var Result = JSON.parse(Get(url + '/count'));
            response.totalCount = Result.count;
        }

        return data;
    });

    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
        headers['Authorization'] = '1RUup5HHfTlhEDxXHXDrUbwUlBhnXZGsDCrhG909ekKODChSvMf4kyEsw2hYluhd';

        if (operation == "getList") {
            // custom pagination params
            if (params._page) {
                params['filter[skip]'] = (params._page - 1) * params._perPage;
                params['filter[limit]'] = params._page * params._perPage;
            }

            delete params._page;
            delete params._perPage;

            // custom sort params
            if (params._sortField) {
                params['filter[order]'] = params._sortField + ' ' + params._sortDir;
                //params._order = params._sortDir;
                delete params._sortField;
                delete params._sortDir;
            }
            // custom filters
            if (params._filters) {
                for (var filter in params._filters) {
                    params[filter] = params._filters[filter];
                }
                delete params._filters;
            }
        }
        return { params: params };
    });
}]);
