const mongoose = require('mongoose');
const { User } = require('./models/user');

mongoose.connect('mongodb://localhost:27017/student-mgmt-sys', {
    useNewUrlParser: true
}).then(async () => {
    console.log('Connected to MongoDB Server...');
    const result = await User.updateMany({ request: false }, { $set: { request: true } });
    console.log('Approved users:', result.nModified !== undefined ? result.nModified : result.modifiedCount);
    process.exit(0);
}).catch(err => {
    console.error('Error occurred connecting to MongoDB...', err);
    process.exit(1);
});
