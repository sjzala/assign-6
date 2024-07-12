require('dotenv').config();
const Sequelize = require('sequelize');

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);

// Define the Theme model
const Theme = sequelize.define(
  'Theme',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
  },
  {
    timestamps: false,
  }
);

// Define the Set model
const Set = sequelize.define(
  'Set',
  {
    set_num: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    year: Sequelize.INTEGER,
    num_parts: Sequelize.INTEGER,
    theme_id: Sequelize.INTEGER,
    img_url: Sequelize.STRING,
  },
  {
    timestamps: false,
  }
);

// Create associations
Set.belongsTo(Theme, { foreignKey: 'theme_id' });

// Initialize the database
module.exports.initialize = () => {
  return sequelize.sync();
};

// Get all sets
module.exports.getAllSets = () => {
  return Set.findAll({ include: [Theme] });
};

// Get a set by its number
module.exports.getSetByNum = (set_num) => {
  return Set.findOne({ where: { set_num }, include: [Theme] }).then((set) => {
    if (set) {
      return set;
    } else {
      throw new Error('Unable to find requested set');
    }
  });
};

// Get sets by theme
module.exports.getSetsByTheme = (theme) => {
  return Set.findAll({
    include: [
      {
        model: Theme,
        where: { name: { [Sequelize.Op.iLike]: `%${theme}%` } },
      },
    ],
  }).then((sets) => {
    if (sets.length > 0) {
      return sets;
    } else {
      throw new Error('Unable to find requested sets');
    }
  });
};

// Other functions remain unchanged...
