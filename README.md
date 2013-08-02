# node-password-generator (pass-gen)

#### A customizable command-line/terminal password generator

_It works programatically in node and in the browser too!_


Generate human-readable<sup>1</sup> passwords quickly and easily and specify what set of characters you want to generate the password from. By default it uses the full Latin-1 charset (execept for some ambiguous characters such as space and iIl etc) to maximize entropy.

It's best understood by looking at the [examples](#examples).

<sup>1</sup> Depends on how "readable" you consider AS$é§0 to be and if your font supports Latin-1 characters.


## Examples

**Default usage**
```bash
$ passgen
cq@öÙ]ØúüÏ-7d3VÀï½:cíÅ¾m-B7Å.ò
```

**WIFI-friendly password**
```bash
$ passgen -wnl 10
xy3zg6k12h
```

**PIN code**
```bash
$ passgen -nl 4
0162
```

**Quick copy to clipboard**
```bash
$ passgen | pbcopy
```

See the tests folder for more examples.


## Installation

`npm install pass-gen -g`


## Usage

### Command-line API

```bash
$ passgen -h

  Usage: passgen [options]

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -n --numbers                 Use 0-9
    -w --ascii                   Use a-z
    -u --ASCII                   Use A-Z
    -s --special                 Use special ASCII characters such as .,_:;@...
    -W --latin                   Use Latin-1 chars such as åöäé...
    -U --Latin                   Use uppercase Latin-1 chars such as ÅÖÄÉ...
    -S --Special                 Use special Latin-1 chars such as £§±©...
    -a --ambiguous               Exclude ambiguous characters such as [space]"oO0...
    -x --extra <custom charset>  Use a custom set
    -l --length <integer>        Set number of characters, Default: 30
```


### Node API

* `require('pass-gen')(options, [length])`
    * options (Array|Object) What charsets to use
        * numbers
        * ascii
        * ASCII
        * special
        * latin
        * LATIN
        * Special
        * ambiguous
        * extra
        * length
    * length (Int) Number of characters in password

See [command-line options](#command-line) for what these options do


#### Node examples
```javascript
var passgen = require('pass-gen');

// Default
passgen();

// Using array
passgen(['ascii', 'ASCII'], 10);

// Using object
passgen({
  ascii: true,
  ASCII: 1,
  numbers: 'what you set here doesn\'t matter',
  extra: '@=/.', // but this does
  length: 15 // and this
});
```

_Note that an options object must be used if you want to specify a custom charset._


### Browser usage

Compile with browserify. See Node examples.


## Contribution

Please create an issue if you find something broken or would like a new feature. Do so even if you want to fix it yourself, so I know. Work of and issue pull-request to the develop branch.


## Tests

Run `make test` to run tests. Any added or changed functionality must be tested.


## License

MIT
