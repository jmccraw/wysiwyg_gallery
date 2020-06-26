const Sequelize = require( 'sequelize' );

export const sequelize = new Sequelize( 'galleries', 'user', 'pass', {
  host: 'localhost',
  dialect: 'postgres'
} );

const Gallery = sequelize.define( 'gallery', {
  hed: {
    type: Sequelize.STRING,
    allowNull: false
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
    allowNull: false
  }
}, {} );
