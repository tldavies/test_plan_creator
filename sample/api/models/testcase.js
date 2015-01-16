/**
 * Created by Tracy on 1/15/15.
 */
module.exports = {
    attributes: {
        name: 'string',
        number: 'integer',
        wordage: 'string',
        status: {
            collection: 'testcasestatus',
            via: 'owner'
        }
    }
};