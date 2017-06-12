# jQuery Unobscure Text

Unobscure Text is a tiny jQuery plugin that allows you to apply a different style to text as soon as a target element scrolls into it. This is useful in cases where you have a fixed header with a transparent background, and you want the header text to remain legible when an image with the same color as the text is scrolled underneath the text.

**[Demo &raquo;](https://thdoan.github.io/unobscure-text/demo.html)**

## Getting Started

### Step 1: Link the required files

```
<script src="//code.jquery.com/jquery-2.2.4.min.js"></script>
<script src="/js/jquery.unobscure.js"></script>
```

### Step 2: Call the plugin method

Make sure this comes after the two required JavaScript files from Step 1 are loaded.

```
<script>
$(document).ready(function() {
  $('#menu a').unobscure({
    target: '#promos img',
    textCss: 'color:#fff'
  });
});
</script>
```

In the example above, `#menu a` will be applied the CSS `color:#fff` when `#promos img` scrolls into it.

NOTE: The element the plugin is invoked on (e.g., `#menu a`) should always point to the text's immediate parent.

## Options

Name      | Type   | Default  | Description
----------| ------ | -------- | -----------
`target`  | string | ''       | Selector to the obstruction element.
`textCss` | string | ''       | The style to apply to the text when `target` scrolls into it.

To change the default options, add this line once before making the first call to the plugin method:

```
$.fn.unobscure.defaults.textCss = 'color:#fff';
```

## Installation

Choose from one of the following methods:

- `git clone git@github.com:thdoan/unobscure-text.git`
- `git clone https://github.com/thdoan/unobscure-text.git`
- `bower install unobscure-text`
- `npm install unobscure-text`
- [Download ZIP](https://github.com/thdoan/unobscure-text/archive/master.zip)
