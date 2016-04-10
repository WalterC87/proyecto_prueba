'use strict';

export default function(sequelize, DataTypes) {
    var Usuarios = sequelize.define('usuarios', {
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_usuario'
        },
        nombreUsuario: {
            type: DataTypes.STRING,
            field: 'nombre_usuario'
        }
    },
        {
            classMethods: {
                associate: function(models) {
                   Usuarios.belongsTo(models.Generos,
                        {
                            onDelete: 'CASCADE',
                            foreignKey: {
                                name: 'idGenero',
                                field: 'id_genero',
                                allowNull: false
                            }
                        });

                    Usuarios.belongsToMany(models.Roles,
                        {
                            through: 'usuarios_has_roles',
                            foreignKey: {
                                name: 'idUsuario',
                                field: 'id_usuario',
                                allowNull: false
                            },
                            otherKey: {
                                name: 'idRol',
                                field: 'id_rol',
                                allowNull: false
                            }
                        });
                }
            }
        },
        {
            underscored: true
        });
    return Usuarios;
}
