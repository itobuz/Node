var mongoose = require('mongoose');

mongoose.connect('mongodb://jack:sagarsneh@ds053808.mongolab.com:53808/flights');

mongoose.export = mongoose;