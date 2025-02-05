const package = require('./package.json');

const microFeName = package.name;
const microfrontend = package.microfrontend;

const args = require('minimist')(process.argv.slice(2));

console.log('Arguments', args);

const mustBundleStyles = args['add-styles'] === 'true';
const mustBundlePolyfills = args['add-polyfills'] === 'true';
const mustBundleScripts = args['add-scripts'] === 'true';

console.log('Generating Micro Manifest for: ' + microFeName);

const fs = require('fs');
const path = require('path');

const PREFIX_MODULE = 'main.';
const PREFIX_NOMODULE = 'main-es5.';
const PREFIX_POLYFILL_MODULE = 'polyfills.';
const PREFIX_POLYFILL_NOMODULE = 'polyfills-es5.';
const EXTENSION_JS = '.js';
const PREFIX_STYLES = 'styles.';
const EXTENSION_CSS = '.css';

const PREFIX_SCRIPTS = 'scripts.';

const id = microfrontend.id;
const tags = microfrontend.tags;

try {
    console.log('MFE ELEMENTS:', tags.join(', '));

    console.log('INITIALIZING:', `dist/${microFeName}`);

    let files = fs.readdirSync(`dist/${microFeName}`);

    const module = getFile(files, PREFIX_MODULE, EXTENSION_JS);
    const nomodule = getFile(files, PREFIX_NOMODULE, EXTENSION_JS);
    const styles = mustBundleStyles ? getFile(files, PREFIX_STYLES, EXTENSION_CSS) : null;
    const scripts = mustBundleScripts ? getFile(files, PREFIX_SCRIPTS, EXTENSION_JS) : null;
    const polyfillsModule = mustBundlePolyfills ? getFile(files, PREFIX_POLYFILL_MODULE, EXTENSION_JS) : null;
    const polyfillsNomodule = mustBundlePolyfills ? getFile(files, PREFIX_POLYFILL_NOMODULE, EXTENSION_JS) : null;

    const manifest = {
        id,
        tags,
        bundles: {
            module,
            nomodule
        }
    };

    if (polyfillsModule && polyfillsNomodule) {
        manifest.polyfills = {
            module: polyfillsModule,
            nomodule: polyfillsNomodule
        };
    }

    if (scripts) {
        manifest.scripts = [scripts];
    }

    if (styles) {
        manifest.styles = styles;
    }

    const manifestPath = path.join(__dirname, `dist/${microFeName}/micro-manifest.json`);

    try {
        fs.writeFileSync(manifestPath, JSON.stringify(manifest));

        console.log('\n\nManifest file has been successfully generated:\n\n', manifest);
    } catch (err) {
        console.log('An error occured while writing JSON Object to File.', err);
    }
} catch (err) {
    // An error occurred
    console.log('An error occured while reading folder.', err);
}

function getFile(files, prefix, extension) {
    var targetFiles = files.filter((file) => {
        return path.basename(file).toLowerCase().startsWith(prefix) && path.extname(file).toLowerCase() === extension.toLowerCase();
    });

    console.log(`PREFIX: ${prefix}, EXTENSION: ${extension} --> FILE: ${targetFiles}`);

    return targetFiles && targetFiles.length > 0 ? targetFiles[0] : null;
}
