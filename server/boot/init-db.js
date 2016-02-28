var csv = require('fast-csv');

module.exports = function(app) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */

   // Only automigrate if option is set to true.
   if (!app.settings['automigrate'])
        return;

   var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];

   app.datasources.postgresdevds.automigrate(lbTables, function(er) {
       if (er) throw er;
       console.log('Loopback tables [' + lbTables + '] created');

       app.models.User.create([
          { email: 'cmoreside720@gmail.com', password: 'Star1234$' },
          { email: 'davidrauch@gmail.com', password: 'Star1234$' },
          { email: 'user@codemovement.com', password: 'p8X2UqLL'},
       ], function(err, users) {
           if (err) throw err;

           console.log('Users created: \n', users);

           app.models.Role.create({
               name: 'admin'
           }, function(err, role) {
              if (err) throw err;

              role.principals.create([
                  { principalType: app.models.RoleMapping.USER, principalId: users[0].id },
                  { principalType: app.models.RoleMapping.USER, principalId: users[1].id }
              ], function(err, roles) {
                  if (err) throw err;

                  console.log('Added users to admin role\n', roles);
              });
           });
       });
   });

   var entries = []

   app.datasources.postgresdevds.automigrate('Photo', function(err) {
       if (err) throw err;

       var csv_path = '/Users/cmoreside/Projects/yeg_archive_scrape/data/yeg_city_archive.csv';

       csv.fromPath(csv_path, { headers: true }).on('data', function(data) {
           app.models.Photo.create({
               imageNumber: data.image_number,
               fondsTitle: data.fonds_title,
               imageTitle: data.image_title,
               dateOfCreationRaw: data.creation_date,
               description: data.description,
               creator: data.creator,
               subjects: data.subjects,
               names: data.names,
               imagePath: data.image_url
           }, function (err, photo) {
              if (err) {
                  console.log(photo);
                  throw err;
              }

              console.log('Added image ', data.image_number);
           });
       })
   });
};
