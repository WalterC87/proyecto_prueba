'use strict';

export default function(sequelize, DataTypes) {
    var Generos = sequelize.define('generos', {
        idGenero: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_genero'

        },
        
        nombreGenero: {
            type: DataTypes.STRING,
            field: 'nombre_genero'

        }
    },
        {
            classMethods: {
                associate: function(models) {
                    Generos.hasMany(models.Usuarios, {
                        foreignKey: {
                            name: 'idGenero',
                            field: 'id_genero',
                            allowNull: false
                        }
                    });
                }
            }
        },
        {
            underscored: true
        });
    return Generos;
}
