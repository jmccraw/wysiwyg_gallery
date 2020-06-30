import Sequelize from 'sequelize';

const sequelize = new Sequelize( 'gallery', 'mccrawj', '', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
} );

// sequelize.authenticate()
//   .then( err => {
//     console.log( 'Connection established' );
//   }, err => {
//     console.error( 'Connection unavailable', err );
//   } );

const Gallery = sequelize.define( 'Gallery', {
  hed: {
    type: Sequelize.STRING,
    allowNull: true
  },
  dek: {
    type: Sequelize.STRING,
    allowNull: true
  },
  byline: {
    type: Sequelize.STRING,
    allowNull: true
  },
  openerImages: {
    type: Sequelize.JSON,
    allowNull: true
  }
}, {} );

export function setData( entry ) {
  Gallery.sync( { force: true } ).then( () => {
    return Gallery.create( entry );
  } );
}
