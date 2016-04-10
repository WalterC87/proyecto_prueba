'use strict';

export default function(sequelize, DataTypes) {
    var Roles = sequelize.define('roles', {
        idRol: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_rol'
        },
        nombre: DataTypes.STRING
    },
        {
            classMethods: {
                associate: function(models) {

                    Roles.belongsToMany(models.Usuarios,
                        {
                            through: 'usuarios_has_roles',
                            foreignKey: {
                                name: 'idRol',
                                field: 'id_rol',
                                allowNull: false
                            },
                            otherKey: {
                                name: 'idUsuario',
                                field: 'id_usuario',
                                allowNull: false
                            }
                        });
                }
            }
        },
        {
            underscored: true
        });

    return Roles
}
