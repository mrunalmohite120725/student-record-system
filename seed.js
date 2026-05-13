const mongoose = require('mongoose');
const { Department } = require('./models/department');

mongoose.connect('mongodb://localhost:27017/student-mgmt-sys', {
    useNewUrlParser: true
}).then(async () => {
    console.log('Connected to MongoDB Server...');
    
    const depts = [
        { dname: 'Computer Science & Engineering' },
        { dname: 'Information Technology' },
        { dname: 'Electronics & Communication' },
        { dname: 'Mechanical Engineering' },
        { dname: 'Civil Engineering' },
        { dname: 'BCA / MCA' },
        { dname: 'BBA / MBA' }
    ];

    let count = 0;
    for (let d of depts) {
        const exists = await Department.findOne({ dname: d.dname });
        if (!exists) {
            await new Department(d).save();
            console.log(`Added Department: ${d.dname}`);
            count++;
        }
    }
    
    console.log(`Done seeding. Added ${count} new departments.`);
    process.exit(0);
}).catch(err => {
    console.error('Error occurred connecting to MongoDB...', err);
    process.exit(1);
});
