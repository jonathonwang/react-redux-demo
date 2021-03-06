// Import Polyfills
import '../../polyfills';

// Weird fix for 'cannot find name 'describe', 'expect' ' errors from typescript
import {} from 'jasmine';
import 'jasmine-ajax';
// jasmine.Ajax = Ajax;
// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;
// Prevent Karma from running prematurely.
__karma__.loaded = () => {};
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$|\.spec\.tsx$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();
