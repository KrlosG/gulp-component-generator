# gulp-component-generator

> A gulp task to automatically generate web components for your site/app

## Setup

### Install

Copy the `component.js` file to your `gulp` directory

This assumes you're using `require('require-dir')` to pull all gulp tasks in from separate files. If not, just copy the contents of `components.js` to your `gulpfile.js`

Copy the `templates` directory into your `gulp` directory.

### Configure templates

You can add any template files you want to the templates directory.

The generator will use your component's name to replace the `_` in the name of each template file and the `<%= componentName %>` variable inside of each file.

e.g.

```
/templates
/-- _.html
```

becomes

```
/templates
/-- MyComponentName.html
```

## Usage

Run

```
gulp component
```

and follow the steps - you can optionally set a different target directory for your component and choose whether or not to create a JS file.

Feel free to configure the defaults to suit your project requirements.
