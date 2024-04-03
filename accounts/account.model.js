const { DataTypes } = require('sequalize');

module.exports = model;

function model(sequalize) {
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        passwordHarsh: { type: DataTypes.STRING, allowNull: false },
        title: { type: DataTypes.STRING, allowNull: false },
        firstname: { type: DataTypes.STRING, allowNull: false },
        lastname: { type: DataTypes.STRING, allowNull: false },
        acceptTerms: { type: DataTypes.BOOLEAN },
        role: { type: DataTypes.STRING, allowNull: false },
        verificationToken: { type: DataTypes.STRING },
        verified: { type: DataTypes.DATE },
        resetToken: { type: DataTypes.STRING },
        resetTokenExpires: { type: DataTypes.DATE },
        passwordReset: { type: DataTypes.DATE },
        created: { type: DataTypes.DATE, allowNull: false, dafaultValue: DataTypes.NOW },
        updated: { type: DataTypes.DATE },
        isVerified: {
            type: DataTypes.VIRTUAL,
            get() { return !!(this.verified || this.passwordReset); }
        }
    };

    const options = {

        timestamps: false,
        defaultScope: {
            
            attributes: { exclude: ['passwordHarsh'] }

        },
        scopes: { 
            withHash: { attributes: {}, }

        }
    };
    
    return sequalize.define('account', attributes, options);
}