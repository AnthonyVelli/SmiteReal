# smite

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.7.4.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [SQLite](https://www.sqlite.org/quickstart.html)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

Run `gulp buildcontrol:heroku` to push the dist folder to the git repo linked with heroku.
You still need to create a sessions table manually in the heroku PG.  This can be done using the command `heroku pg:psql -a smite < node_modules/connect-pg-simple/table.sql`.  This should probably be a post in install script in package.json.

## Testing

Running `npm test` will run the unit tests with karma.
