# Simple Full Page Scroll 
Create amazing fullpage:
* **<a href="https://mverissimo.github.io/simpleFullPageScroll/", target="_blank">See live example.</a>**

## Installation
###Step 1: Link required files
html
```
<!-- fullPage Javascript file -->
<script src="/js/fullPage.min.js"></script>
```

###Step 2: Create HTML markup
html
```
<div id="main">
	<section class="section"></section>
	<section class="section"></section>
	<section class="section"></section>
	<section class="section"></section>
</div>
```

###Step 3: Call the SimpleFs

Call .SimpleFs() on `<div id="main">`.

```javascript
var fullpage = new SimpleFs("#main");
```

##Configuration options

###General

**section selector**
```
default: '.section'
options: String
```

**easing**
```
default: 'ease'
options: 'ease-in', 'ease-out', 'linear'
```
For more options check: <a href="https://developer.mozilla.org/pt-BR/docs/Web/CSS/animation-timing-function", target="_blank">Mozilla MDN</a>

**transform**
```
default: 'transform'
```

**animation duration**
```
default: 700,
options: int
```
Millesecond(ms) not second(s)

**pagination**
```
default: 'true',
options: boolean (true / false)
```

**keyboard**
```
default: 'true',
options: boolean (true / false)
```

**infinite**
```
default: 'true',
options: boolean (true / false)
```
NOTE: Move to first section case current === last

## Future features
* Touch events
* Callback's
* Responsive fallback

## Contributing

Everyone is welcome to help [contribute](CONTRIBUTING.md) and improve this project. There are several ways you can contribute:

* Reporting issues (please read [issue guidelines](https://github.com/necolas/issue-guidelines))
* Suggesting new features
* Writing or refactoring code
* Fixing [issues](https://github.com/roots/roots/issues)

### GULP
**run**

* gulp default task development
* gulp --prod task production
* Access http://localhost:3000

### Version BETA
**I create this fullpage for study, sorry for any bugs, contribute with this repo. Thank's enjoy! **

### License:

This boilerplate is free and open source software, distributed under the The MIT License. So feel free to use this to create your site without linking back to me or using a disclaimer.
